import { snakeCase } from 'lodash';

import history from '../../../history';
import { API } from '../../../redux/API';
import { translate as __ } from '../../../common/I18n';

import { deepPropsToCamelCase } from '../../../common/helpers';

import {
  MODELS_PAGE_DATA_RESOLVED,
  MODELS_PAGE_DATA_FAILED,
  MODELS_PAGE_HIDE_LOADING,
  MODELS_PAGE_CLEAR_ERROR,
  MODELS_PAGE_SHOW_LOADING,
  MODELS_API_PATH,
  MODELS_PATH,
} from '../constants';

import {
  selectIsLoading,
  selectHasError,
  selectSearch,
  selectPage,
  selectPerPage,
  selectSort,
} from './ModelsPageSelectors';

import { stringifyParams, getParams } from '../../../common/urlHelpers';

export const initializeModels = () => dispatch => {
  const params = getParams();
  dispatch(fetchModels(params));
  if (!history.action === 'POP') {
    history.replace({
      pathname: MODELS_PATH,
      search: stringifyParams(params),
    });
  }
};

export const fetchModels = (
  { page, perPage, searchQuery, sort },
  url = MODELS_API_PATH
) => async (dispatch, getState) => {
  dispatch({ type: MODELS_PAGE_SHOW_LOADING });
  if (selectHasError(getState())) {
    dispatch({ type: MODELS_PAGE_CLEAR_ERROR });
  }

  const onSuccess = ({ data }) => {
    const transformedResponse = deepPropsToCamelCase(data);

    dispatch({
      type: MODELS_PAGE_DATA_RESOLVED,
      payload: {
        ...transformedResponse,
        hasData: transformedResponse.subtotal > 0,
      },
    });

    if (selectIsLoading(getState())) {
      dispatch({ type: MODELS_PAGE_HIDE_LOADING });
    }
  };

  const onError = error => {
    dispatch({
      type: MODELS_PAGE_DATA_FAILED,
      payload: {
        message: {
          type: 'error',
          text: `${error.response.status} ${__(error.response.statusText)}`,
        },
      },
    });

    if (selectIsLoading(getState())) {
      dispatch({ type: MODELS_PAGE_HIDE_LOADING });
    }
  };

  try {
    const sortString =
      sort && Object.keys(sort).length > 0 ? `${sort.by} ${sort.order}` : '';

    const response = await API.get(
      url,
      {},
      {
        page,
        per_page: perPage,
        search: searchQuery,
        order: sortString,
      }
    );
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export const fetchAndPush = params => (dispatch, getState) => {
  const query = buildQuery(params, getState());
  dispatch(fetchModels(query));
  history.push({
    pathname: MODELS_PATH,
    search: stringifyParams(query),
  });
};

const buildQuery = (query, state) => {
  const querySort = pickSort(query, state);

  return {
    page: query.page || selectPage(state),
    perPage: query.perPage || selectPerPage(state),
    searchQuery:
      query.searchQuery === undefined ? selectSearch(state) : query.searchQuery,
    ...(querySort && { sort: querySort }),
  };
};

const pickSort = (query, state) =>
  checkSort(query.sort)
    ? transformSort(query.sort)
    : checkSort(selectSort(state));

const checkSort = sort => (sort && sort.by && sort.order ? sort : undefined);

const transformSort = sort => ({ ...sort, by: snakeCase(sort.by) });
