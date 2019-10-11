export const selectModelsPageData = state => state.modelsPage.data;
export const selectModelsPageQuery = state => state.modelsPage.query;

export const selectModelsLoading = state => selectModelsPageData(state).isLoading;
export const selectModelsError = state => selectModelsPageData(state).hasError;

export const selectModels = state => selectModelsPageData(state).results;
