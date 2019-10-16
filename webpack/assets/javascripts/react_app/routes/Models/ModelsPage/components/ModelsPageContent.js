import React from 'react';

import ModelsTable from '../../../../components/ModelsTable';
import Pagination from '../../../../components/Pagination/PaginationWrapper';

import LoadingPage from '../../../common/LoadingPage';
import { withRenderHandler } from '../../../../common/HOC';


const ModelsPageContent = props => {
  console.log(props)
  const models = props.models || [];
  return (
    <React.Fragment>
      <div>&nbsp;</div>
      <ModelsTable
        results={models}
        search={props.search}
        sortBy={props.sort.by}
        sortOrder={props.sort.order}
        getTableItems={props.fetchAndPush}
      />
      <Pagination
        viewType="list"
        itemCount={props.itemCount}
        pagination={{ page: props.page, perPage: props.perPage }}
        onChange={props.fetchAndPush}
        dropdownButtonId="models-page-pagination-dropdown"
      />
    </React.Fragment>
  );
}

export default withRenderHandler({
  Component: ModelsPageContent,
  LoadingComponent: LoadingPage,
});
