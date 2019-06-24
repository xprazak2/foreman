import React, { useEffect } from 'react';
import { Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import { Table } from '../common/table';
import { STATUS } from '../../constants';
import MessageBox from '../common/MessageBox';
import { translate as __ } from '../../common/I18n';
import createModelsTableSchema from './ModelsTableSchema';
import { getURIsearch, stringifyParams } from '../../common/urlHelpers';
import { getURIQuery } from '../../common/helpers';

import { propsToSnakeCase } from '../../common/helpers';
import Pagination from '../Pagination/PaginationWrapper';

const ModelsTable = ({
  getTableItems,
  sortBy,
  sortOrder,
  error,
  status,
  results,
  pagination,
  itemCount,
  location,
  history,
}) => {
  useEffect(() => {
    getTableItems(getURIQuery(window.location.href));
  }, []);

  if (results.length === 0) {
    return <Spinner size="lg" loading />;
  }

  if (status === STATUS.ERROR) {
    return (
      <MessageBox
        key="models-table-error"
        icontype="error-circle-o"
        msg={__(`Could not receive data: ${error && error.message}`)}
      />
    );
  }

  const onPageChange = (history) => (paginationArgs) => {
    const search = { searchQuery: getURIsearch(), ...paginationArgs };
    history.push({
      pathname: history.location.pathname,
      search: stringifyParams(search)
    })
    getTableItems(search);
  }

  return (
    <React.Fragment>
      <Table
        key="models-table"
        columns={createModelsTableSchema(getTableItems, sortBy, sortOrder)}
        rows={results}/>
      <div id="pagination">
        <Pagination
          className="col-md-12"
          viewType="table"
          itemCount={itemCount}
          pagination={pagination}
          onChange={onPageChange(history)}
          dropdownButtonId='hw-models-dropdown'
        />
      </div>
    </React.Fragment>
  )
};

ModelsTable.propTypes = {
  results: PropTypes.array.isRequired,
  getTableItems: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.keys(STATUS)),
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
  error: PropTypes.object,
};

ModelsTable.defaultProps = {
  status: STATUS.PENDING,
  sortBy: '',
  sortOrder: '',
  error: null,
};

export default ModelsTable;
