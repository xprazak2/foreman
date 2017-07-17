import { combineReducers } from 'redux';
import statistics from './statistics';
import hosts from './hosts';
import notifications from './notifications/';
import toasts from './toasts';

export const createRootReducer = (pluginReducers) => {
  return combineReducers({
    statistics,
    hosts,
    notifications,
    toasts,
    ...pluginReducers
  });
};

export default createRootReducer();
