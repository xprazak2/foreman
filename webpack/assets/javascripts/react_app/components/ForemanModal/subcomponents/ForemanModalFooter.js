import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'patternfly-react';
import { useModalContext } from '../ForemanModalHooks';

import SubmitBtn from '../../common/forms/SubmitBtn';
import CancelBtn from '../../common/forms/CancelBtn';
import SubmitOrCancel from '../../common/forms/SubmitOrCancel';

const ForemanModalFooter = props => {
  const childCount = React.Children.count(props.children);
  const { onClose } = useModalContext();
  // Render the provided children, or default markup if none given
  const closeButton = childCount === 0 && (
    <Button bsStyle="default" onClick={onClose}>
      Close
    </Button>
  );

  const submitOrCancel = childCount === 0 && props.question && (
    <SubmitOrCancel submitting={submitting} disabled={disabled} onCancel={onClose} />
  )


  return (
    <Modal.Footer {...props}>
      {props.children}
      {closeButton || submitOrCancel}
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
