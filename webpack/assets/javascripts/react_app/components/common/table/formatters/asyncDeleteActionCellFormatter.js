import React from 'react';
import AsyncDeleteButton from '../components/AsyncDeleteButton';

export const asyncDeleteActionCellFormatter = (controller, tableAction) => (_, { rowData: { can_delete: canDelete, name, id } }) => {
  return (
    <AsyncDeleteButton
      active={canDelete}
      id={id}
      controller={controller}
      tableAction={tableAction}
      name={name}
    />
  );
}
