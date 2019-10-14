export const selectModelsPageData = state => state.modelsPage.data;
export const selectModelsPageQuery = state => state.modelsPage.query;

export const selectIsLoading = state => selectModelsPageData(state).isLoading;
export const selectHasError = state => selectModelsPageData(state).hasError;
export const selectHasData = state => selectModelsPageData(state).hasData;

export const selectModels = state => selectModelsPageData(state).results;
export const selectPage = state => selectModelsPageData(state).page;
export const selectPerPage = state => selectModelsPageData(state).perPage;
export const selectSearch = state => selectModelsPageData(state).search;
export const selectSort = state => selectModelsPageData(state).sort;
export const selectSubtotal = state => selectModelsPageData(state).subtotal;
