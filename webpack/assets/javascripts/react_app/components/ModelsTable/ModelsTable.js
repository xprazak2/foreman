import React from 'react';
import { Spinner, LoadingState } from 'patternfly-react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Table } from '../common/table';
import { STATUS } from '../../constants';
import MessageBox from '../common/MessageBox';
import { translate as __ } from '../../common/I18n';
import createModelsTableSchema from './ModelsTableSchema';
import { getURIQuery } from '../../common/helpers';

import { propsToSnakeCase } from '../../common/helpers';
import Pagination from '../Pagination/PaginationWrapper';

// import './ModelsTable.scss';

class ModelsTable extends React.Component {
  componentDidMount() {
    // this.props.getTableItems(getURIQuery(window.location.href));
  }

  render() {
    const {
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
    } = this.props;

    console.log(this.props)

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
      const search = { ...queryString.parse(history.location.search), ...propsToSnakeCase(paginationArgs) };
      console.log(search)
      history.push({
        pathname: history.location.pathname,
        search: `?${queryString.stringify(search)}`
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
  }
}

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
