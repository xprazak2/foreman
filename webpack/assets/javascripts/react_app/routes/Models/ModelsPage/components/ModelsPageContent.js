import React from 'react';

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
  perPage
}) => {
  return (
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
        pagination={{ page: page, perPage: perPage }}
        onChange={fetchAndPush}
        dropdownButtonId="models-page-pagination-dropdown"
      />
    </React.Fragment>
  );
}

export default withRenderHandler({
  Component: ModelsPageContent,
  LoadingComponent: LoadingPage,
});
