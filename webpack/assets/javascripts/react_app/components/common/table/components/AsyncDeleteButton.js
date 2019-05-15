import React from 'react';

import { Button, MessageDialog, Icon } from 'patternfly-react';

import './AsyncDeleteButton.scss';

class AsyncDeleteButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const icon = <Icon type="pf" name="error-circle-o" />;

    const { tableAction, id, name } = this.props;

    const primaryContent = <p className="lead">{tableAction.primaryContent(name, id)}</p>;
    const secondaryContent = <p>{tableAction.secondaryContent(name, id)}</p>;

    return (
      <React.Fragment>
        <Button
          bs-style="default"
          onClick={this.toggleModal}
        >
          Custom delete
        </Button>
        <MessageDialog
          show={this.state.showModal}
          onHide={this.toggleModal}
          primaryAction={tableAction.fn(this.props.id)}
          secondaryAction={this.toggleModal}
          primaryActionButtonContent={tableAction.primaryButtonText}
          secondaryActionButtonContent={tableAction.secondaryButtonText}
          primaryActionButtonBsStyle={tableAction.primaryButtonStyle}
          title={tableAction.title(name)}
          icon={icon}
          primaryContent={primaryContent}
          secondaryContent={secondaryContent}
          accessibleName="deleteConfirmationDialog"
          accessibleDescription="deleteConfirmationDialogContent"
        />
      </React.Fragment>
    )
  }
}

export default AsyncDeleteButton;
