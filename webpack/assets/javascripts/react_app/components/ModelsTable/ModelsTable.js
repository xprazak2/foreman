import React from 'react';
import { Spinner, LoadingState } from 'patternfly-react';
import PropTypes from 'prop-types';
import { Table } from '../common/table';
import { STATUS } from '../../constants';
import MessageBox from '../common/MessageBox';
import { translate as __ } from '../../common/I18n';
import createModelsTableSchema from './ModelsTableSchema';
import { getURIQuery } from '../../common/helpers';

import Pagination from '../Pagination/PaginationWrapper';

import './ModelsTable.scss';

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
      results
    } = this.props;

    if (status === STATUS.ERROR) {
      return (
        <MessageBox
          key="models-table-error"
          icontype="error-circle-o"
          msg={__(`Could not receive data: ${error && error.message}`)}
        />
      );
    }

    return (
      <LoadingState loading={status === STATUS.PENDING}>
        <Table
          key="models-table"
          columns={createModelsTableSchema(getTableItems, sortBy, sortOrder)}
          rows={results}/>
        <div id="pagination">
          <Pagination
            className="col-md-12"
            viewType="table"
            itemCount={results.length}
            pagination={{ page: 1, perPage: 10 }}
            onChange={() => {}}
            dropdownButtonId='hw-models-dropdown'
          />
        </div>
      </LoadingState>
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
