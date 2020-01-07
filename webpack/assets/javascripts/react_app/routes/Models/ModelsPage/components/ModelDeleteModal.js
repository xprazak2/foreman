import React from 'react';

import ForemanModal from '../../../../components/ForemanModal';
import ModelModalDeleteForm from './ModelModalDeleteForm';

const ModelDeleteModal = props => {
  return (
    <ForemanModal
      id="model-delete-modal"
      title="Confirm modal deletion"
      enforceFocus
      onEnter={() => {}}
    >
      <ModelModalDeleteForm toDelete={props.toDelete} />
    </ForemanModal>
  )
}

export default ModelDeleteModal;
