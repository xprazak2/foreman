import URI from 'urijs';
import { foremanUrl } from '../../../../foreman_tools';

import API from '../../../API';
import createTableActionTypes from '../../../components/common/table/actionsHelpers/actionTypeCreator';

import { stringifyParams, getParams } from '../../../common/urlHelpers';

import {
  modelsTablePagination,
  modelsTableItemCount,
} from '../../../components/ModelsTable/ModelsTableSelectors';

import {
  modelsPageSearchQuery,
} from './ModelsPageSelectors';

import {
  MODELS_PAGE_DATA_RESOLVED,
  MODELS_PAGE_DATA_FAILED,
  MODELS_PAGE_HIDE_LOADING,
} from '../consts';

const controller = 'models';

const tableActionTypes = createTableActionTypes(controller);

export const initializeModels = () => dispatch => {

}

export const loadInitialModels = (query = {}) => async dispatch => {
  const url = foremanUrl(
    new URI(`/api/${controller}`).addSearch({
      ...query,
      include_permissions: true,
    })
  );

  const hideLoading = {
    type: MODELS_PAGE_HIDE_LOADING,
  };

  const onSuccess = response => {
    dispatch(hideLoading);
    dispatch({
      type: MODELS_PAGE_DATA_RESOLVED,
      payload: {
        hasData: response.data.total !== 0,
      },
    });
    return dispatch({
      type: tableActionTypes.SUCCESS,
      payload: response.data,
    });
  };

  const onError = response => {
    dispatch(hideLoading);
    return dispatch({
      type: MODELS_PAGE_DATA_FAILED,
      payload: {
        message: {
          type: 'error',
          text: response.message,
        },
      },
    });
  };

  try {
    const response = await API.get(url);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

const buildQuery = (query, state) => ({
  page: query.page || modelsTablePagination(state).page,
  perPage: query.perPage || modelsTablePagination(state).perPage,
  searchQuery: query.search === undefined ? modelsPageSearchQuery(state) : query.searchQuery
});

export const fetchAndPush = params => (dispatch, getState) => {
  const query = buildQuery(params, getState());

  dispatch()
}

