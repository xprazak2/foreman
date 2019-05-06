export const modelsPageSearchString = state => state.autocomplete.searchBar.searchQuery;

const modelsPageState = state => state.modelsPage;

export const modelsAreLoading = state => modelsPageState(state).isLoading;
export const modelsMessage = state => modelsPageState(state).message;
export const modelsHaveError = state => !!modelsPageState(state).hasError;
export const modelsHaveData = state => modelsPageState(state).hasData;
