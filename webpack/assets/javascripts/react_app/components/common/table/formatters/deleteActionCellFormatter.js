import React from 'react';
import DeleteButton from '../components/DeleteButton';

export const deleteActionCellFormatter = controllerPluralize => (
  _,
  { rowData: { canDelete, name, id } }
) => (
  <DeleteButton
    active={canDelete}
    name={encodeURI(name)}
    id={id}
    controller={controllerPluralize}
  />
);
