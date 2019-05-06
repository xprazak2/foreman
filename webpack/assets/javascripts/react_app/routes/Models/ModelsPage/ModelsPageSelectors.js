
const modelsPageSelector = state => state.modelsPage;

export const modelsPagePaginationSelector = state => modelsPageSelector(state).pagination;
export const modelsPageSearchString = state => state.autocomplete.searchBar.searchQuery;
