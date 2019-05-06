import Immutable from 'seamless-immutable';

import {
  MODELS_PAGE_LOAD_REQUEST,
  MODELS_PAGE_LOAD_ERROR,
  MODELS_PAGE_LOAD_SUCCESS,
} from '../consts';

const initialState = Immutable({
  loading: false,
  loadingError: ''
});

const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch(action.type) {
    case MODELS_PAGE_LOAD_REQUEST:
      return state.set('loading', true);
    case MODELS_PAGE_LOAD_ERROR:
      state.merge({ loadingError: payload, loading: false });
    case MODELS_PAGE_LOAD_SUCCESS:
      return state.set('loading', false);
    default:
      return state;
  }
}

export default reducer;
