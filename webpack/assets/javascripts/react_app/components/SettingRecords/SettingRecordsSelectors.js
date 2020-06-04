import { deepPropsToCamelCase } from '../../common/helpers';

const selectSettingRecords = state => state.settingRecords;
export const selectSettings = state => selectSettingRecords(state).settings;
export const selectSettingById = (state, id, category) =>
  deepPropsToCamelCase(selectSettings(state)[category]).find(setting => setting.id === id);
