// API
export const STATUS = {
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  ERROR: 'ERROR',
};

// Documentation
export const FOREMAN_VERSION = '1.23';
export const DOCUMENTATION_URL = `https://theforeman.org/manuals/${FOREMAN_VERSION}/index.html`;

// Pagination
export const PAGE_OPTIONS = [5, 10, 25, 50];

// Search
export const getControllerSearchProps = (
  controller,
  id = 'searchBar',
  canCreate = true
) => ({
  controller,
  autocomplete: {
    id,
    searchQuery: '',
    url: `${controller}/auto_complete_search`,
    useKeyShortcuts: true,
  },
  bookmarks: {
    url: '/api/bookmarks',
    canCreate,
    documentationUrl: `${DOCUMENTATION_URL}#4.1.5Searching`,
  },
});
