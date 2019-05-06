export default {
  controller: "models",
  autocomplete : {
    searchQuery: null,
    url: "/models/auto_complete_search",
    id: "searchBar",
    useKeyShortcuts: true
  },
  bookmarks: {
    url: "/api/bookmarks",
    canCreate: true,
    documentationUrl: "4.1.5Searching"
  }
}

export const MODELS_PAGE_DATA_RESOLVED = 'MODELS_PAGE_DATA_RESOLVED';
export const MODELS_PAGE_DATA_FAILED = 'MODELS_PAGE_DATA_FAILED';
export const MODELS_PAGE_HIDE_LOADING = 'MODELS_PAGE_HIDE_LOADING';
