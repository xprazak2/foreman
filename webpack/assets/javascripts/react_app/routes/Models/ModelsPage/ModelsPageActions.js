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
  selectIsLoading,
  selectHasError,
  selectSearch,
  selectPage,
  selectPerPage
} from './ModelsPageSelectors';

const pathname = '/hw_models';

import { stringifyParams, getParams } from '../../../common/urlHelpers';

export const initializeModels = () => dispatch => {
  const params = getParams();
  dispatch(fetchModels(params));
  if (!history.action === 'POP') {
    history.replace({
      pathname: pathname,
      search: stringifyParams(params),
    });
  }
}

export const fetchModels = (
  { page, perPage, searchQuery },
  url = '/api/models?include_permissions=true'
) => async (dispatch, getState) => {
  dispatch({ type: MODELS_PAGE_SHOW_LOADING });
  if (selectHasError(getState())) {
    dispatch({ type: MODELS_PAGE_CLEAR_ERROR });
  }

  const onSuccess = ({ data }) => {
     if (selectIsLoading(getState())) {
      dispatch({ type: MODELS_PAGE_HIDE_LOADING });
    }

    const transformedResponse = deepPropsToCamelCase(data)
    const itemCount = transformedResponse.subtotal

    dispatch({
      type: MODELS_PAGE_DATA_RESOLVED,
      payload: { ...transformedResponse, hasData: itemCount > 0 }
    });
  }

  const onError = error => {
    if (selectIsLoading(getState())) {
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

export const fetchAndPush = params => (dispatch, getState) => {
  console.log(params)
  const query = buildQuery(params, getState());
  dispatch(fetchModels(query));
  history.push({
    pathname: pathname,
    search: stringifyParams(query)
  });
}

const buildQuery = (query, state) => ({
  page: query.page || selectPage(state),
  perPage: query.perPage || selectPerPage(state),
  searchQuery: query.searchQuery === undefined
    ? selectSearch(state)
    : query.searchQuery
});
