import React from 'react';
import PropTypes from 'prop-types';
import { EmptyState as PfEmptyState, Button } from 'patternfly-react';
import { actionButtonPropTypes } from './EmptyStatePropTypes';

const PrimaryActionButton = ({ action }) => (
  <PfEmptyState.Action>
    {action.url && (
      <Button href={action.url} bsStyle="primary" bsSize="large">
        {action.title}
      </Button>
    )}
    {action.onClick && (
      <Button onClick={action.onClick} bsStyle="primary" bsSize="large">
        {action.title}
      </Button>
    )}
  </PfEmptyState.Action>
);

PrimaryActionButton.propTypes = {
  action: PropTypes.shape(actionButtonPropTypes),
};

export default PrimaryActionButton;
