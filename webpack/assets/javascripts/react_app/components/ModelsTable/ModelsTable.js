import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '../common/table';
import createModelsTableSchema from './ModelsTableSchema';

const ModelsTable = props => {

  console.log(props);

  const sort = props.sort || {};

  console.log(sort);

  return (
    <Table
      key="models-table"
      columns={createModelsTableSchema(props.getTableItems, props.sortBy, props.sortOrder)}
      rows={props.results}
    />
  );
};

ModelsTable.propTypes = {
  results: PropTypes.array.isRequired,
  getTableItems: PropTypes.func.isRequired,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
};

ModelsTable.defaultProps = {
  sortBy: '',
  sortOrder: '',
};

export default ModelsTable;
