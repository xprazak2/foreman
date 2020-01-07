import React from 'react';

import ForemanModal from '../../../../components/ForemanModal';

const ModelDeleteModal = props => {
  return (
    <ForemanModal
      id="model-delete-modal"
      title="Confirm modal deletion"
      enforceFocus
      onEnter={() => {}}
    >
      <div>{ props.toDelete && props.toDelete.name }</div>
    </ForemanModal>
  )
}

export default ModelDeleteModal;
