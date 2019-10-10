import React from 'react';
import PropTypes from 'prop-types';

import ModelsTable from '../../../../components/ModelsTable';
import Pagination from '../../../../components/Pagination/PaginationWrapper';

import LoadingPage from '../../../common/LoadingPage';
import { withRenderHandler } from '../../../../common/HOC';

const ModelsPageContent = ({
  models,
  search,
  sort,
  fetchAndPush,
  itemCount,
  page,
  perPage,
}) => (
  <React.Fragment>
    <div>&nbsp;</div>
    <ModelsTable
      results={models}
      search={search}
      sortBy={sort.by}
      sortOrder={sort.order}
      getTableItems={fetchAndPush}
    />
    <Pagination
      viewType="list"
      itemCount={itemCount}
      pagination={{ page, perPage }}
      onChange={fetchAndPush}
      dropdownButtonId="models-page-pagination-dropdown"
    />
  </React.Fragment>
);

ModelsPageContent.propTypes = {
  models: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  sort: PropTypes.object.isRequired,
  fetchAndPush: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default withRenderHandler({
  Component: ModelsPageContent,
  LoadingComponent: LoadingPage,
});
