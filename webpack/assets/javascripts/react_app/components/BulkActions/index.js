import React from 'react';
import { Dropdown, MenuItem, Modal } from 'patternfly-react';

import BulkActionsForm from './components/BulkActionsForm';

const BulkActionItem = props => {
  return (
    <MenuItem
      onClick={props.onClick}
    >
      { props.action.name }
    </MenuItem>
  );
}

export const withBulkActions = (dropdownId, actions, WrappedComponent) => {
  class BulkActions extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        currentAction: null
      }
    }

    onHide = () => {
      this.setState({ showModal: false, currentAction: null });
    }

    onActionClick = (action) => (event, data) => {
      console.log(action)
      console.log(event)
      console.log(data)
      this.setState({ showModal: true, currentAction: action });
    }

    render() {
      console.log(this.props);
      const bulkActionsMenu = (
        <Dropdown id={dropdownId}>
          <Dropdown.Toggle title='Bulk Actions'>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            { actions.map(action => <BulkActionItem onClick={this.onActionClick(action)} action={action} key={action.label} />) }
          </Dropdown.Menu>
        </Dropdown>
      );

      return (
        <React.Fragment>
          <Modal show={this.state.showModal} enforceFocus onHide={this.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>You are about to do something en-masse:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>You are about to do the bulk actions for xxx records:</div>
              <BulkActionsForm />
            </Modal.Body>
          </Modal>
          <WrappedComponent bulkActionsMenu={bulkActionsMenu} {...this.props}/>
        </React.Fragment>
      );
    }
  }

  return BulkActions;
}
