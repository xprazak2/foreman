import { getTableItemsAction, deleteTableItemAction } from '../common/table';
import { MODELS_TABLE_CONTROLLER } from './ModelsTableConstants';

export const getTableItems = query =>
  getTableItemsAction(MODELS_TABLE_CONTROLLER, query);

export const deleteTableItem = id =>
  deleteTableItemAction(MODELS_TABLE_CONTROLLER, { id });
