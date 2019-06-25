export const modelsPageSearchString = state =>
  state.autocomplete.searchBar.searchQuery;

const modelsPageState = state => state.modelsPage;

const modelsPageDataState = state => modelsPageState(state).data;
const modelsPageQueryState = state => modelsPageState(state).query;

export const modelsAreLoading = state => modelsPageDataState(state).isLoading;
export const modelsMessage = state => modelsPageDataState(state).message;
export const modelsHaveError = state => !!modelsPageDataState(state).hasError;
export const modelsHaveData = state => modelsPageDataState(state).hasData;

export const modelsPagePageNum = state => modelsPageQueryState(state).page;
export const modelsPageItemCount = state => modelsPageQueryState(state).itemCount;
export const modelsPageSearchQuery = state => modelsPageQueryState(state).searchQuery;
