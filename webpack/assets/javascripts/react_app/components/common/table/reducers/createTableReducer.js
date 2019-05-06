import Immutable from 'seamless-immutable';
import { STATUS } from '../../../../constants';
import createTableActionTypes from '../actionsHelpers/actionTypeCreator';

const moreSuccState = (action) => ({})

const createTableReducer = (controller, additionalState = moreSuccState, additionalInitialState = {}) => {
  const initState = Immutable({
    error: null,
    sortBy: '',
    sortOrder: '',
    results: [],
    status: STATUS.PENDING,
    ...additionalInitialState,
  });

  return (state = initState, action) => {
    const { REQUEST, FAILURE, SUCCESS } = createTableActionTypes(controller);

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
          ...additionalState(action),
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
  }
}

export default createTableReducer;
