import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from '../common/table';
import createModelsTableSchema from './ModelsTableSchema';

const ModelsTable = ({ getTableItems, sortBy, sortOrder, results, toDelete, setToDelete }) => {

  return (
    <Table
      key="models-table"
      columns={createModelsTableSchema(getTableItems, sortBy, sortOrder, toDelete, setToDelete)}
      rows={results}
    />
  )
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
