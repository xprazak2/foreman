import Immutable from 'seamless-immutable';

import {
  LOAD_SETTING_RECORDS,
} from './SettingRecordsConstants';

const initialState = Immutable({
  settings: [],
})

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case LOAD_SETTING_RECORDS:
      return state.set('settings', payload);
    default:
      return state;
  }
}

export default reducer;
