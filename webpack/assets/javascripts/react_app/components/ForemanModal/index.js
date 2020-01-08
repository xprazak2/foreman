import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsModalOpen,
  selectIsModalSubmitting,
  selectModalStateById,
} from './ForemanModalSelectors';
import { setModalClosed, addModal, setModalStartSubmitting, setModalStopSubmitting } from './ForemanModalActions';
import ForemanModal from './ForemanModal';
import ForemanModalHeader from './subcomponents/ForemanModalHeader';
import ForemanModalFooter from './subcomponents/ForemanModalFooter';
import reducer from './ForemanModalReducer';

export const reducers = { foremanModals: reducer };

const ConnectedForemanModal = props => {
  const { id, title } = props;
  const isOpen = useSelector(state => selectIsModalOpen(state, id));
  const isSubmitting = useSelector(state => selectIsModalSubmitting(state, id));
  const dispatch = useDispatch();
  const onClose = () => dispatch(setModalClosed({ id }));
  const onSubmitStart = () => dispatch(setModalStartSubmitting({ id }));
  const onSubmitStop = () => dispatch(setModalStopSubmitting({ id }));
  const modalAlreadyExists = useSelector(state =>
    selectModalStateById(state, id)
  );

  useEffect(() => {
    if (modalAlreadyExists) return; // don't add modal if it already exists
    dispatch(addModal({ id, open: false, submitting: false }));
  }, [modalAlreadyExists, id]);

  return (
    <ForemanModal
      {...props}
      id={id}
      title={title}
      isOpen={isOpen}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmitStart={onSubmitStart}
      onSubmitStop={onSubmitStop}
    />
  );
};

ConnectedForemanModal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
};

ConnectedForemanModal.defaultProps = {
  title: '',
};

// Header and Footer use the provided children, or default markup if none provided

ConnectedForemanModal.Header = ForemanModalHeader;
ConnectedForemanModal.Footer = ForemanModalFooter;

export default ConnectedForemanModal;
