import history from '../../../history';
import API from '../../../API';

import { deepPropsToCamelCase } from '../../../common/helpers';

import {
  MODELS_PAGE_DATA_RESOLVED,
  MODELS_PAGE_DATA_FAILED,
  MODELS_PAGE_HIDE_LOADING,
  MODELS_PAGE_UPDATE_QUERY,
  MODELS_PAGE_CLEAR_ERROR,
  MODELS_PAGE_SHOW_LOADING,
} from '../constants';

import {
  selectModelsLoading,
  selectModelsError,
} from './ModelsPageSelectors';

import { stringifyParams, getParams } from '../../../common/urlHelpers';

export const initializeModels = () => dispatch => {
  const params = getParams();
  dispatch(fetchModels(params));
  if (!history.action === 'POP') {
    history.replace({
      pathname: '/hw_models',
      search: stringifyParams(params),
    });
  }
}

export const fetchModels = (
  { page, perPage, searchQuery },
  url = '/api/models?include_permissions=true'
) => async (dispatch, getState) => {
  dispatch({ type: MODELS_PAGE_SHOW_LOADING });
  if (selectModelsError(getState())) {
    dispatch({ type: MODELS_PAGE_CLEAR_ERROR });
  }

  const onSuccess = ({ data }) => {
    if (selectModelsLoading(getState())) {
      dispatch({ type: MODELS_PAGE_HIDE_LOADING });
    }

    const transformedResponse = deepPropsToCamelCase(data)
    const itemCount = transformedResponse.subtotal

    dispatch({
      type: MODELS_PAGE_DATA_RESOLVED,
      payload: { ...transformedResponse, hasData: itemCount > 0 }
    });
    dispatch({
      type: MODELS_PAGE_UPDATE_QUERY,
      payload: {
        page,
        perPage,
        searchQuery,
        itemCount,
      }
    });
  }

  const onError = error => {
    if (selectModelsLoading(getState())) {
      dispatch({ type: MODELS_PAGE_HIDE_LOADING });
    }
    console.log(error);

    dispatch({
      type: MODELS_PAGE_DATA_FAILED,
      payload: {
        message: {
          type: 'error',
           text: `${error.response.status} ${__(error.response.statusText)}`,
        }
      }
    })
  }

  try {
    const response = await API.get(
      url,
      {},
      {
        page,
        per_page: perPage,
        search: searchQuery,
      }
    );
    return onSuccess(response);
  } catch(error) {
    return onError(error);
  }
}
