import Immutable from 'seamless-immutable';

import { createTableReducer } from '../common/table';
import { MODELS_TABLE_CONTROLLER } from './ModelsTableConstants';

const initialState = Immutable({
  pagination: {
    page: 1,
    perPage: 20
  }
});

export default createTableReducer(MODELS_TABLE_CONTROLLER);
