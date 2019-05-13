import URI from 'urijs';

import { ajaxRequestAction } from '../../../redux/actions/common';
import createTableActionTypes from '../../../components/common/table/actionsHelpers/actionTypeCreator';

const controller = 'models'

const tableActionTypes = createTableActionTypes(controller);

import {
  MODELS_PAGE_LOAD_REQUEST,
  MODELS_PAGE_LOAD_ERROR,
  MODELS_PAGE_LOAD_SUCCESS,
} from '../consts';

export const loadInitialModels = (query = {}) => dispatch => {
  const url = new URI(`/api/${controller}`);
  url.addSearch({ ...query, include_permissions: true });

  return ajaxRequestAction({
    dispatch,
    requestAction: MODELS_PAGE_LOAD_REQUEST,
    successAction: MODELS_PAGE_LOAD_SUCCESS,
    failedAction: MODELS_PAGE_LOAD_ERROR,
    url: url.toString(),
    item: {}
  }).then(response => {
    if (response.type === MODELS_PAGE_LOAD_SUCCESS) {
      return dispatch({ type: tableActionTypes.SUCCESS, payload: response.payload });
    }
    return response;
  })
}
