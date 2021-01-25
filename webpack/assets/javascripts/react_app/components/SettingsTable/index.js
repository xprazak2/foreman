import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { selectSettingsByCategory } from '../SettingRecords/SettingRecordsSelectors';
import { selectSettingsTable } from './SettingsTableSelectors';

import { setSettingEditing } from '../SettingRecords/SettingRecordsActions';

import SettingsTable from './SettingsTable';

import useSettingModal from '../SettingUpdateModal/useSettingModal';

import reducer from './SettingsTableReducer';
export const reducers = { settingsTable: reducer };

const WrappedSettingsTable = props => {
  const settings = useSelector(state =>
    selectSettingsByCategory(props.category)(state)
  );

  const updatedSettings = useSelector(state => selectSettingsTable(state));

  const processedSettings = settings.map(setting => {
    if (updatedSettings[setting.name]) {
      return setting.set('value', updatedSettings[setting.name].value);
    }
    return setting;
  });

  const dispatch = useDispatch();
  const { setModalOpen } = useSettingModal();

  const onEditClick = async setting => {
    await dispatch(setSettingEditing(setting));
    setModalOpen();
  };

  return <SettingsTable settings={processedSettings} onEditClick={onEditClick} />;
};

WrappedSettingsTable.propTypes = {
  category: PropTypes.string.isRequired,
};

export default WrappedSettingsTable;
