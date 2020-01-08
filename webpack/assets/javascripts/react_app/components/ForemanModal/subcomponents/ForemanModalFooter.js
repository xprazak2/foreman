import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'patternfly-react';
import { useModalContext } from '../ForemanModalHooks';

import SubmitBtn from '../../common/forms/SubmitBtn';
import CancelBtn from '../../common/forms/CancelBtn';
import SubmitOrCancel from '../../common/forms/SubmitOrCancel';

const ForemanModalFooter = props => {
  const childCount = React.Children.count(props.children);
  console.log(useModalContext())
  const { onClose, isSubmitting, onSubmitStart, onSubmitStop, submitProps } = useModalContext();

  // Render the provided children, or default markup if none given
  const closeButton = childCount === 0 && (
    <Button bsStyle="default" onClick={onClose}>
      Close
    </Button>
  );

  const submitOrCancel = childCount === 0 && submitProps && (
    <SubmitOrCancel
      submitting={isSubmitting}
      disabled={props.disabled}
      onCancel={onClose}
      submitProps={submitProps}
      />
  )

  return (
    <Modal.Footer {...props}>
      {props.children}
      {submitOrCancel || closeButton}
    </Modal.Footer>
  );
};

ForemanModalFooter.propTypes = {
  children: PropTypes.node,
};

ForemanModalFooter.defaultProps = {
  children: null,
};

export default ForemanModalFooter;
