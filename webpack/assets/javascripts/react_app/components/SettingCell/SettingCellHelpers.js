import React from 'react';

import { Tooltip, OverlayTrigger } from 'patternfly-react';

import { translate as __ } from '../../common/I18n';

export const withTooltip = Component => props => {
  const { tooltipId, tooltipText, ...rest } = props;

  return (
    <OverlayTrigger
      overlay={<Tooltip id={tooltipId}>{tooltipText}</Tooltip>}
      trigger={['hover', 'focus']}
      placement="top"
      rootClose={false}
    >
      <span>
        <Component {...rest} />
      </span>
    </OverlayTrigger>
  );
};

const formatBoolean = attr => setting => {
  if (setting.settingsType === 'boolean') {
    if (setting[attr]) {
      return __('Yes');
    }
    return __('No');
  }
  return null;
};

const formatArray = attr => setting => {
  if (setting.settingsType === 'array') {
    return `[ ${setting[attr] ? setting[attr].join(', ') : ''} ]`;
  }
  return null;
};

const formatText = attr => setting => setting[attr];

const formatEmptyValue = attr => setting => {
  if (!setting[attr]) {
    return __('Empty');
  }
  return null;
};

const reduceFormats = formatters => setting =>
  formatters.reduce((memo, formatter) => {
    if (memo) {
      return memo;
    }
    return formatter.call(this, setting);
  }, null);

export const valueToString = reduceFormats([
  formatBoolean('value'),
  formatArray('value'),
  formatEmptyValue('value'),
  formatText('value'),
]);

export const defaultToString = reduceFormats([
  formatBoolean('default'),
  formatArray('default'),
  formatEmptyValue('default'),
  formatText('default'),
]);

export const hasDefault = setting => {
  switch (setting.settingsType) {
    case 'boolean':
    case 'integer': {
      return true;
    }
    case 'array':
    case 'hash':
    case 'string': {
      return !!setting.default && setting.default.length !== 0;
    }
    default: {
      return !!setting.default;
    }
  }
};

export const inStrong = markup => <strong>{markup}</strong>;
