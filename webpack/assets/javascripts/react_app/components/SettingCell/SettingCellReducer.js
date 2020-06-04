import Immutable from 'seamless-immutable';

import {
  SET_CURRENT_SETTING,
} from './SettingCellConstants';

export const initialState = Immutable({
  setting: null,
});

const reducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_CURRENT_SETTING:
      return state.set({ setting: payload.setting })
    default:
      return state;
  }
};

export default reducer;
