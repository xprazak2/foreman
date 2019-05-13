import Immutable from 'seamless-immutable';

import {
  MODELS_PAGE_LOAD_REQUEST,
  MODELS_PAGE_LOAD_ERROR,
  MODELS_PAGE_LOAD_SUCCESS,
} from '../consts';

const initialState = Immutable({
  pagination: {
    page: 1,
    perPage: 10
  },
  loadingInitial: false,
  loadingError: ''
});


const reducer = (state = initialState, action) => {
  const { payload } = action;

  switch(action.type) {
    case MODELS_PAGE_LOAD_REQUEST:
      return state.set('loadingInitial', true);
    case MODELS_PAGE_LOAD_ERROR:
      state.merge({ loadingError: payload, loadingInitial: false });
    case MODELS_PAGE_LOAD_SUCCESS:
      return state.set('loadingInitial', false);
    default:
      return state;
  }
}

export default reducer;
