import React from 'react';
import PropTypes from 'prop-types';
import { Table as PfTable } from 'patternfly-react';
import TableBody from './TableBody';

import selectionCellFormatter from '../formatters/selectionCellFormatter';
import selectionHeaderCellFormatter from '../formatters/selectionHeaderCellFormatter';

const selectionController ={
  allRowsSelected: () => console.log('All rows selected'),
  selectAllRows: () => console.log('select all rows'),
  selectRow: () => {},
  isSelected: () => {}
};

const headerFormatter = (label, data) => {
  console.log(data);
  return selectionHeaderCellFormatter(selectionController, label);
}

const cellFormatter = (value, data) => {
   data.disabled = data.rowData.available === -1;
   return selectionCellFormatter(selectionController, data);
}

const processColumns = (selectable, columns, rows) => {
  if (selectable) {
    return [
      {
        property: 'select',
        header: {
          label: 'Select all rows',
          formatters: [headerFormatter]
        },
        cell: {
          formatters: [cellFormatter]
        }
      }
    ].concat(columns);
  }
  return columns;
}

const Table = ({ columns, rows, bodyMessage, children, selectable, ...props }) => {
  const processedColumns = processColumns(selectable, columns, rows);
  const body = children || [
    <PfTable.Header key="header" />,
    <TableBody
      key="body"
      columns={processedColumns}
      rows={rows}
      message={bodyMessage}
      rowKey="id"
    />,
  ];

  return (
    <div>
      <PfTable.PfProvider
        columns={processedColumns}
        className="table-fixed"
        striped
        bordered
        hover
        {...props}
      >
        {body}
      </PfTable.PfProvider>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  bodyMessage: PropTypes.node,
  children: PropTypes.node,
};

Table.defaultProps = {
  bodyMessage: undefined,
  children: undefined,
};

export default Table;
