
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
    documentationUrl: "https://theforeman.org/manuals/1.23/index.html#4.1.5Searching"
  }
}

export const MODELS_PAGE_LOAD_REQUEST = 'MODELS_PAGE_LOAD_REQUEST';
export const MODELS_PAGE_LOAD_ERROR = 'MODELS_PAGE_LOAD_ERROR';
export const MODELS_PAGE_LOAD_SUCCESS = 'MODELS_PAGE_LOAD_SUCCESS';
