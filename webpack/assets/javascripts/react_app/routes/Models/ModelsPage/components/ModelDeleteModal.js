import React from 'react';

import ForemanModal from '../../../../components/ForemanModal';
import ModelModalDeleteForm from './ModelModalDeleteForm';
import { connect } from 'react-redux';
import { submitModal } from '../../../../redux/actions/common/forms';


const ModelDeleteModal = props => {
  console.log(props);
  const id = props.toDelete && props.toDelete.id
  return (
    <ForemanModal
      id="model-delete-modal"
      title="Confirm modal deletion"
      enforceFocus
      onEnter={() => {}}
      submitProps={{ url: `/api/v2/models/${id}`,
                     message: 'Hw Model was successfully deleted' }}
    >
      { `You are about to delete ${props.toDelete && props.toDelete.name}. Are you sure?`}
      <ForemanModal.Footer/>
    </ForemanModal>
  )
}

// const mapStateToProps = () => ({});

// const mapDispatchToProps = { submitModal }

export default ModelDeleteModal;
// export default connect(mapStateToProps, mapDispatchToProps)(ModelDeleteModal);

