import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadSettingRecords } from './SettingRecordsActions';
import reducer from './SettingRecordsReducer';

export const reducers = {
  settingRecords: reducer
};

const SettingRecords = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSettingRecords(props.settings));
  })

  return (
    <React.Fragment />
  )
}

export default SettingRecords;
