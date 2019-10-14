import React, { useEffect } from 'react';
import { Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import { Table } from '../common/table';
import { STATUS } from '../../constants';
import MessageBox from '../common/MessageBox';
import { translate as __ } from '../../common/I18n';
import createModelsTableSchema from './ModelsTableSchema';
import { getURIQuery } from '../../common/helpers';

// const ModelsTable = ({
//   getTableItems,
  // sortBy,
  // sortOrder,
//   error,
//   status,
//   results,
//   sort = {},
// }) => {
  // useEffect(() => {
  //   getTableItems(getURIQuery(window.location.href));
  // }, []);

  // if (results.length === 0) {
  //   return <Spinner size="lg" loading />;
  // }

  // if (status === STATUS.ERROR) {
  //   return (
  //     <MessageBox
  //       key="models-table-error"
  //       icontype="error-circle-o"
  //       msg={__(`Could not receive data: ${error && error.message}`)}
  //     />
  //   );
  // }
const ModelsTable = props => {

  console.log(props);

  const sort = props.sort || {};

  console.log(sort);

  return (
    <Table
      key="models-table"
      columns={createModelsTableSchema(props.getTableItems, sort.by, sort.order)}
      rows={props.results}
    />
  );
};

// ModelsTable.propTypes = {
//   results: PropTypes.array.isRequired,
//   getTableItems: PropTypes.func.isRequired,
//   status: PropTypes.oneOf(Object.keys(STATUS)),
//   sortBy: PropTypes.string,
//   sortOrder: PropTypes.string,
//   error: PropTypes.object,
// };

// ModelsTable.defaultProps = {
//   status: STATUS.PENDING,
//   sortBy: '',
//   sortOrder: '',
//   error: null,
// };

export default ModelsTable;
