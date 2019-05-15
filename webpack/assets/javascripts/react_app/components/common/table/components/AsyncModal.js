import React from 'react';
import classNames from 'classnames';

// import { Modal } from '../Modal';
// import { Button } from '../Button';
// import { Spinner } from '../Spinner';

import { Modal, Button, Spinner } from 'patternfly-react';
import './AsyncModal.scss';

const AsyncModal = ({
  show,
  onHide,
  primaryAction,
  secondaryAction,
  title,
  icon,
  primaryContent,
  secondaryContent,
  primaryActionButtonBsStyle,
  secondaryActionButtonBsStyle,
  primaryActionButtonContent,
  secondaryActionButtonContent,
  className,
  footer,
  enforceFocus,
  accessibleName,
  accessibleDescription,
  primaryButtonDisabled,
  secondaryButtonDisabled,
  asyncInProgress,
  ...props
}) => {
  const bodyContent = (secondaryContent, asyncInProgress) => {
    if (asyncInProgress) {
      return <Spinner size="sm" loading />
    }

    return secondaryContent && secondaryContent;
  }

  const spinner = <Spinner size="sm" loading />

  return (
    <Modal
      className={classNames('message-dialog-pf', className)}
      show={show}
      onHide={onHide}
      enforceFocus={enforceFocus}
      aria-modal
      aria-labelledby={accessibleName}
      aria-describedby={accessibleDescription}
      {...props}
    >
      <Modal.Header>
        <Modal.CloseButton onClick={onHide} />
        <Modal.Title id={accessibleName}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {icon && icon}
        <div id={accessibleDescription}>
          {primaryContent && primaryContent}
          {secondaryContent && secondaryContent}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {!footer ? (
          <React.Fragment>
            { asyncInProgress && spinner }
            {secondaryActionButtonContent && (
              <Button bsStyle={secondaryActionButtonBsStyle} onClick={secondaryAction} disabled={secondaryButtonDisabled}>
                {secondaryActionButtonContent}
              </Button>
            )}
            <Button autoFocus bsStyle={primaryActionButtonBsStyle} onClick={primaryAction} disabled={primaryButtonDisabled}>
              {primaryActionButtonContent}
            </Button>
          </React.Fragment>
        ) : (
          footer
        )}
      </Modal.Footer>
    </Modal>
  )
};

export default AsyncModal;