import { createTableReducer } from '../common/table';
import { MODELS_TABLE_CONTROLLER } from './ModelsTableConstants';

export default createTableReducer(
  MODELS_TABLE_CONTROLLER,
  action => ({
    itemCount: action.payload.subtotal,
    pagination: {
      page: action.payload.page,
      perPage: action.payload.per_page,
    },
  }),
  {
    itemCount: 0,
    pagination: {
      page: 1,
      perPage: 10,
    },
  }
);
