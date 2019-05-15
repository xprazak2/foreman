import Immutable from 'seamless-immutable';

import { createTableReducer, generateReducer } from '../common/table';
import { STATUS } from '../../constants';

import { MODELS_TABLE_CONTROLLER } from './ModelsTableConstants';

const indexInitState = Immutable({
  error: null,
  sortBy: '',
  sortOrder: '',
  results: [],
  status: STATUS.RESOLVED,
});

const deleteInitState = Immutable({
  error: null,
  result: '',
  status: STATUS.RESOLVED
});

const reducerStates = [
  {
    reducerName: 'tableData',
    initState: indexInitState,
    controller: MODELS_TABLE_CONTROLLER,
    actionName: 'index',
    onRequest: (action, state) => ({ 'status': STATUS.PENDING }),
    onError: (action, state) => ({
      error: action.payload.error,
      status: STATUS.ERROR,
      results: [],
    }),
    onSuccess: (action, state) => ({
      status: STATUS.RESOLVED,
      results: action.payload.results,
      sortBy: action.payload.sort.by,
      sortOrder: action.payload.sort.order,
    })
  },
  {
    reducerName: 'modelsDelete',
    initState: deleteInitState,
    controller: MODELS_TABLE_CONTROLLER,
    actionName: 'delete',
    onRequest: (action, state) => ({ 'status': STATUS.PENDING }),
    onError: (action, state) => ({
      error: action.payload.error,
      status: STATUS.ERROR,
    }),
    onSuccess: (action, state) => {
      console.log(state);
      return ({
        error: null,
        status: STATUS.RESOLVED
      })
    }
  }
];


export default generateReducer(reducerStates);
// export default createTableReducer(MODELS_TABLE_CONTROLLER);
