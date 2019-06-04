import Immutable from 'seamless-immutable';
import { combineReducers, compose } from 'redux';
import { STATUS } from '../../../../constants';
import createTableActionTypes from '../actionsHelpers/actionTypeCreator';
import { createTableBulkActionTypes } from '../actionsHelpers/actionTypeCreator';

const initState = Immutable({
  error: null,
  sortBy: '',
  sortOrder: '',
  results: [],
  status: STATUS.PENDING,
});

const createTableReducer = controller => (state = initState, action) => {
  const { REQUEST, FAILURE, SUCCESS } = createTableActionTypes(controller, 'index');

  switch (action.type) {
    case REQUEST:
      return state.set('status', STATUS.PENDING);
    case SUCCESS:
      return Immutable.merge(state, {
        error: null,
        status: STATUS.RESOLVED,
        results: action.payload.results,
        sortBy: action.payload.sort.by,
        sortOrder: action.payload.sort.order,
      });
    case FAILURE:
      return Immutable.merge(state, {
        error: action.payload.error,
        status: STATUS.ERROR,
        results: [],
      });
    default:
      return state;
  }
};

const actionInitState = Immutable({
  error: null,
  result: '',
  status: STATUS.RESOLVED
})

const createTableActionReducer = controller => (state = actionInitState, action) => {
  const { REQUEST, FAILURE, SUCCESS } = createTableActionTypes(controller, 'delete');

  switch (action.type) {
    case REQUEST:
      return state.set('status', STATUS.PENDING);
    case SUCCESS:
      return Immutable.merge(state, {
        error: null,
        status: STATUS.RESOLVED
      });
    case FAILURE:
      return Immutable.merge(state, {
        error: action.payload.error,
        status: STATUS.ERROR,
      });
    default:
      return state;
  }
};

export const generateReducer = (remoteActions) => {
  const reducerCreator = (memo, remoteAction) => {
    const reducer = (state = remoteAction.initState, action) => {
      const { REQUEST, FAILURE, SUCCESS } = createTableActionTypes(remoteAction.controller, remoteAction.actionName);

      switch (action.type) {
        case REQUEST:
          return Immutable.merge(state, remoteAction.onRequest(action, state));
        case SUCCESS:
          return Immutable.merge(state, remoteAction.onSuccess(action, state));
        case FAILURE:
          return Immutable.merge(state, remoteAction.onFailure(action, state));
        default:
          return state;
      }
    }

    memo[remoteAction.reducerName] = reducer;
    return memo;
  }

  return combineReducers(remoteActions.reduce(reducerCreator, {}))
}

const reducer = (model) => combineReducers({ tableData: createTableReducer(model), modelsDelete: createTableActionReducer(model) });
// export default createTableReducer;
export default reducer;
