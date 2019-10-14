import { translate as __ } from '../../common/I18n';
import {
  // sortControllerFactory,
  column,
  sortableColumn,
  headerFormatterWithProps,
  cellFormatterWithProps,
  nameCellFormatter,
  hostsCountCellFormatter,
  deleteActionCellFormatter,
  cellFormatter,
} from '../common/table';

/**
 * Generate a table schema to the Hardware Models page.
 * @param  {Function} apiCall a Redux async action that fetches and stores table data in Redux.
 *                            See ModelsTableActions.
 * @param  {String}   by      by which column the table is sorted.
 *                            If none then set it to undefined/null.
 * @param  {String}   order   in what order to sort a column. If none then set it to undefined/null.
 *                            Otherwise, 'ASC' for ascending and 'DESC' for descending
 * @return {Array}
 */
const sortControllerFactory = (apiCall, by, order) => ({
  apply: (by, order) => {
    console.log('applying sort')
  },
  property: by,
  order: order,
});

const createModelsTableSchema = (apiCall, by, order) => {
  const sortController = sortControllerFactory(apiCall, by, order);

  return [
    sortableColumn('name', __('Name'), 4, sortController, [
      nameCellFormatter('models'),
    ]),
    sortableColumn('vendorClass', __('Vendor Class'), 3, sortController),
    sortableColumn('hardwareModel', __('Hardware Model'), 3, sortController),
    column(
      'hostsCount',
      __('Hosts'),
      [headerFormatterWithProps],
      [hostsCountCellFormatter('model'), cellFormatterWithProps],
      { className: 'col-md-1' },
      { align: 'right' }
    ),
    column(
      'actions',
      __('Actions'),
      [headerFormatterWithProps],
      [deleteActionCellFormatter('models'), cellFormatter]
    ),
  ];
};

export default createModelsTableSchema;
