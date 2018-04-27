import React from 'react';
import { Table as PfTable } from 'patternfly-react';
import { Link } from 'react-router-dom';

const headerFormat = value => <PfTable.Heading>{value}</PfTable.Heading>;
const cellFormat = value => <PfTable.Cell>{value}</PfTable.Cell>;
const actionsFormat = value => {
  return <PfTable.Cell>{value}</PfTable.Cell>
}


const labelFormat = value =>
<PfTable.Cell>{value}</PfTable.Cell>

const columns = [
  {
    header: {
      label: 'Label',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [labelFormat]
    },
    property: 'label'
  },
  {
    header: {
      label: 'Network',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'network'
  },
  {
    header: {
      label: 'Netmask',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'mask'
  },
  {
    header: {
      label: 'Actions',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'detailsAction'
  },
];

export default columns;