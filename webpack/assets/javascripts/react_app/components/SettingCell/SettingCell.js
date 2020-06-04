import React from 'react';
import PropTypes from 'prop-types';

import { sprintf, translate as __ } from '../../common/I18n';
import { deepPropsToCamelCase } from '../../common/helpers';

import { withTooltip, defaultToString } from './SettingCellHelpers';

import SettingCellInner from './SettingCellInner';

const SettingCell = props => {
  const setting = deepPropsToCamelCase(props.setting);

  const fieldProps = { setting: setting, tooltipId: setting.name };

  if (setting.readonly) {
    fieldProps.tooltipText = sprintf(
      __(
        'This setting is defined in the configuration file %s and is read-only.'
      ),
      setting.configFile
    );
  } else {
    fieldProps.tooltipText = `${
      setting.fullName
    } (Default: ${defaultToString(setting)})`;
    fieldProps.className = 'editable';
  }

  fieldProps.onEditClick = props.onEditClick;

  const Component = withTooltip(SettingCellInner);
  return <Component {...fieldProps} />;
};

SettingCell.propTypes = {
  setting: PropTypes.object.isRequired,
  onEditClick: PropTypes.func,
};

SettingCell.defaultProps = {
  onEditClick: () => {},
};

export default SettingCell;