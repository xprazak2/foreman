import URI from 'urijs';
import { foremanUrl } from '../../../../foreman_tools';

import API from '../../../API';
import createTableActionTypes from '../../../components/common/table/actionsHelpers/actionTypeCreator';

import {
  MODELS_PAGE_DATA_RESOLVED,
  MODELS_PAGE_DATA_FAILED,
  MODELS_PAGE_HIDE_LOADING,
} from '../consts';

const controller = 'models';

const tableActionTypes = createTableActionTypes(controller);

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
