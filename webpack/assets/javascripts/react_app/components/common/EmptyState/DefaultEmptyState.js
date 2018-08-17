import React from 'react';
import EmptyStatePattern from './EmptyStatePattern';
import { defaultEmptyStatePropTypes } from './EmptyStatePropTypes';
import { DocumentLinkContent } from '../DocumentationLink';

const documentationBlock = ({
  url,
  label = __('For more information please see'),
  buttonLabel = __('Documentation'),
}) =>
  url && (
    <React.Fragment>
      {label}{' '}
      <a href={url} target="_blank">
        <DocumentLinkContent>{buttonLabel}</DocumentLinkContent>
      </a>
    </React.Fragment>
  );

const DefaultEmptyState = (props) => {
  const {
    icon,
    iconType,
    header,
    description,
    documentation,
    action,
    secondaryActions,
  } = props;

  return (
    <EmptyStatePattern
      icon={icon}
      iconType={iconType || 'pf'}
      header={header}
      description={description}
      documentation={documentation ? documentationBlock(documentation) : null}
      action={action}
      secondaryActions={secondaryActions}
    />
  );
};

DefaultEmptyState.propTypes = defaultEmptyStatePropTypes;

DefaultEmptyState.defaultProps = {
  icon: 'add-circle-o',
  secondaryActions: [],
};

export default DefaultEmptyState;
