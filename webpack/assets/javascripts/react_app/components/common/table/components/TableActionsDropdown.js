import React from 'react';

import { Button, MessageDialog, Icon } from 'patternfly-react';

import './TableActionsDropdown.scss';

class TableActionsDropdown extends React.Component {
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
    // const icon = <Icon type="pf" name="error-circle-o" />;

    const { tableActions, id, name } = this.props;

    const primaryContent = <p className="lead">{tableActions[0].primaryContent(name, id)}</p>;
    const secondaryContent = <p>{tableActions[0].secondaryContent(name, id)}</p>;

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
          primaryAction={tableActions[0].fn(this.props.id)}
          secondaryAction={this.toggleModal}
          primaryActionButtonContent={tableActions[0].primaryButtonText}
          secondaryActionButtonContent={tableActions[0].secondaryButtonText}
          primaryActionButtonBsStyle={tableActions[0].primaryButtonStyle}
          title={tableActions[0].title(name)}
          primaryContent={primaryContent}
          secondaryContent={secondaryContent}
          accessibleName={tableActions[0].accessibleName}
          accessibleDescription={tableActions[0].accessibleDescription}
        />
      </React.Fragment>
    )
  }
}

export default TableActionsDropdown;
