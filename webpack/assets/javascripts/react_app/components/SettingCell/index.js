import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SettingCell from './SettingCell';

import { selectSettingById } from '../SettingRecords/SettingRecordsSelectors';

export { default as reducer } from './SettingCellReducer';

const WrappedSettingCell = props => {

  const setting = useSelector(state => selectSettingById(state, props.settingId, props.category));
  console.log(setting)

  return (
    <SettingCell {...props} setting={setting} />
  );
}

export default WrappedSettingCell;
