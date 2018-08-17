import React from 'react';
import { EmptyState as PfEmptyState } from 'patternfly-react';
import { emptyStatePatternPropTypes } from './EmptyStatePropTypes';
import PrimaryActionButton from './EmptyStatePrimaryActionButton';
import SecondaryActionButtons from './EmptyStateSecondaryActionButtons';

const EmptyStatePattern = (props) => {
  const { documentation, action, secondaryActions } = props;
  return (
    <PfEmptyState>
      <PfEmptyState.Icon type={props.iconType} name={props.icon} />
      <PfEmptyState.Title>{props.header}</PfEmptyState.Title>
      <PfEmptyState.Info>{props.description}</PfEmptyState.Info>
      {documentation && <PfEmptyState.Help>{documentation}</PfEmptyState.Help>}
      {action && <PrimaryActionButton action={action} />}
      {secondaryActions && <SecondaryActionButtons actions={secondaryActions} />}
    </PfEmptyState>
  );
};

EmptyStatePattern.propTypes = emptyStatePatternPropTypes;

export default EmptyStatePattern;
