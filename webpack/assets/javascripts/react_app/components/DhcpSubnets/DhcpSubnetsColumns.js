import React from 'react';
import { Table as PfTable } from 'patternfly-react';
import { Link } from 'react-router-dom';

const headerFormat = value => <PfTable.Heading>{value}</PfTable.Heading>;
const cellFormat = value => <PfTable.Cell>{value}</PfTable.Cell>;
const actionsFormat = value =>
  <PfTable.Cell>{value}</PfTable.Cell>

// (
//   <PfTable.Cell>
//     <DropdownButton {...props} title='Actions'>
//         <MenuItem eventKey="1">Action</MenuItem>
//         <MenuItem eventKey="2">Another action</MenuItem>
//         <MenuItem eventKey="3" active>
//           Active Item
//         </MenuItem>
//         <MenuItem divider />
//         <MenuItem eventKey="4">Separated link</MenuItem>
//       </DropdownButton>
//   </PfTable.Cell>
// )


const columns = [
  {
    header: {
      label: 'Label',
      formatters: [headerFormat]
    },
    cell: {
      formatters: [cellFormat]
    },
    property: 'to_label'
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
      formatters: [actionsFormat]
    },
    property: 'tableActions'
  }
];

export default columns;