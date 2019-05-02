import { getURI, changeQuery } from '../Pagination/PaginationHelper';

export const resolveSearchQuery = searchQuery => {
  const uri = getURI();
  const data = { ...uri.query(true), search: searchQuery.trim(), page: 1 };
  changeQuery(uri, data);
};
