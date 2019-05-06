import React from 'react';
import PropTypes from 'prop-types';
import { Table as PfTable } from 'patternfly-react';
import TableBody from './TableBody';

import selectionCellFormatter from '../formatters/selectionCellFormatter';
import selectionHeaderCellFormatter from '../formatters/selectionHeaderCellFormatter';

const selectionController = {
  allRowsSelected: () => console.log('All rows selected'),
  selectAllRows: () => console.log('select all rows'),
  selectRow: () => {},
  isSelected: () => {}
};

const headerFormatter = selectionController => (label, data) => {
  console.log(data);
  return selectionHeaderCellFormatter(selectionController, label);
}

const cellFormatter = selectionController => (value, data) => {
   data.disabled = data.rowData.available === -1;
   return selectionCellFormatter(selectionController, data);
}

const processColumns = (selectable, columns, rows, selectionController) => {
  if (selectable) {
    return [
      {
        property: 'select',
        header: {
          label: 'Select all rows',
          formatters: [headerFormatter(selectionController)]
        },
        cell: {
          formatters: [cellFormatter(selectionController)]
        }
      }
    ].concat(columns);
  }
  return columns;
}

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRows: []
    }
  }

  getSelectionController = () => {
    const rows = this.props.rows;

    const allRowsSelected = () =>
      rows.length === this.state.selectedRows.length;

    const selectAllRows = () => {
      if (allRowsSelected()) {
        this.setState({ selectedRows: [] })
      } else {
        this.setState({ selectedRows: rows.map(row => row.id) })
      }
    }

    const selectRow = (arg) => {
      console.log(arg);
      let { selectedRows } = this.state;
      if (selectedRows.includes(arg.rowData.id)) {
        selectedRows = selectedRows.filter(id => id !== arg.rowData.id)
      } else {
        selectedRows.push(rowData.id);
      }

      this.setState({ selectedRows });
    }

    const isSelected = (arg) => this.state.selectedRows.includes(arg.rowData.id);

    return ({
      allRowsSelected,
      selectAllRows,
      selectRow,
      isSelected
    });
  }

  render() {
    const { columns, rows, bodyMessage, children, selectable, ...rest } = this.props;

    const processedColumns = processColumns(selectable, columns, rows, this.getSelectionController());

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
          {...rest}
        >
          {body}
        </PfTable.PfProvider>
      </div>
    );
  }
}

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
