import React from 'react';
import PropTypes from 'prop-types';

import { sprintf, translate as __ } from '../../../../common/I18n';
import ForemanModal from '../../../../components/ForemanModal';
import { MODEL_DELETE_MODAL_ID } from '../../constants';

const ModelDeleteModal = props => {
  const id = props.toDelete && props.toDelete.id;
  const name = props.toDelete && props.toDelete.name;

  return (
    <ForemanModal
      id={MODEL_DELETE_MODAL_ID}
      title={__('Confirm Hardware Model Deletion')}
      enforceFocus
      submitProps={{
        url: `/api/v2/models/${id}`,
        message: sprintf(
          __('Hardware Model %s was successfully deleted'),
          name
        ),
        onSucc: props.fetchAndPush,
      }}
    >
      {sprintf(__('You are about to delete %s. Are you sure?'), name)}
      <ForemanModal.Footer />
    </ForemanModal>
  );
};

ModelDeleteModal.propTypes = {
  toDelete: PropTypes.object,
  fetchAndPush: PropTypes.func.isRequired,
};

ModelDeleteModal.defaultProps = {
  toDelete: null,
};

export default ModelDeleteModal;
