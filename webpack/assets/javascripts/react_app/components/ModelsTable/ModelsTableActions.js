import { getURIsearch, stringifyParams } from '../../common/urlHelpers';

import { getTableItemsAction } from '../common/table';
import { MODELS_TABLE_CONTROLLER } from './ModelsTableConstants';

export const getTableItems = query =>
  getTableItemsAction(MODELS_TABLE_CONTROLLER, query);

export const onPageChange = (boundGetTableItems, history) => paginationArgs => {
  const search = { searchQuery: getURIsearch(), ...paginationArgs };
  history.push({
    pathname: history.location.pathname,
    search: stringifyParams(search),
  });
  boundGetTableItems(search);
};
