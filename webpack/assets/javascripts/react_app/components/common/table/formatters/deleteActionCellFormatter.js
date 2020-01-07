import React from 'react';
import DeleteButton from '../components/DeleteButton';

// export const deleteActionCellFormatter = controllerPluralize => (
//   _,
//   { rowData: { canDelete, name, id } }
// ) => (
//   <DeleteButton
//     active={canDelete}
//     name={encodeURI(name)}
//     id={id}
//     controller={controllerPluralize}
//   />
// );

export const deleteActionCellFormatter = (controllerPluralize, toDelete, setToDelete, onClick) => (
  _,
  { rowData }
) => {
  const { canDelete, name, id } = rowData;

  return (
    <DeleteButton
      active={canDelete}
      name={encodeURI(name)}
      id={id}
      controller={controllerPluralize}
      onClick={() => onClick(rowData)}
      toDelete={toDelete}
      setToDelete={setToDelete}
    />
  )
};
