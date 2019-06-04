import React from 'react';
import TableActionsDropdown from '../components/TableActionsDropdown';

export const tableActionsCellFormatter = (controller, tableActions) => (_, { rowData: { can_delete: canDelete, name, id } }) => {
  return (
    <TableActionsDropdown
      active={canDelete}
      id={id}
      controller={controller}
      tableActions={tableActions}
      name={name}
    />
  );
}
