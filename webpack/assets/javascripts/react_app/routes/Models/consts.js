
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