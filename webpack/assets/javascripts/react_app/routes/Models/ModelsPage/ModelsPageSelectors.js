import { camelCase } from 'lodash';

export const selectModelsPageData = state => state.modelsPage;

export const selectIsLoading = state => selectModelsPageData(state).isLoading;
export const selectHasError = state => selectModelsPageData(state).hasError;
export const selectHasData = state => selectModelsPageData(state).hasData;

export const selectModels = state => selectModelsPageData(state).results;
export const selectPage = state => selectModelsPageData(state).page;
export const selectPerPage = state => selectModelsPageData(state).perPage;
export const selectSearch = state => selectModelsPageData(state).search;
export const selectSort = state => {
  const { sort } = selectModelsPageData(state);
  if (sort.by && sort.order) {
    return { ...sort, by: camelCase(sort.by) };
  }
  return sort;
};

export const selectSubtotal = state => selectModelsPageData(state).subtotal;
export const selectMessage = state => selectModelsPageData(state).message;
