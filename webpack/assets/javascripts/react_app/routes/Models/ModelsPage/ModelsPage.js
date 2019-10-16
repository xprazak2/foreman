import React from 'react';

import PageLayout from '../../common/PageLayout/PageLayout';
import ModelsPageContent from './components/ModelsPageContent';
import { MODELS_SEARCH_PROPS } from '../constants';

const ModelsPage = props => {
  console.log(props);
  const handleSearch = search => props.fetchAndPush({ searchQuery: search, page: 1 })

  return (
    <PageLayout
      header={__('Hardware Models')}
      searchable
      searchProps={MODELS_SEARCH_PROPS}
      searchQuery={props.search}
      isLoading={props.isLoading && props.hasData}
      onSearch={handleSearch}
      onBookmarkClick={handleSearch}
    >
      <ModelsPageContent
        models={props.models}
        page={props.page}
        perPage={props.perPage}
        search={props.search}
        sort={props.sort}
        hasData={props.hasData}
        hasError={props.hasError}
        isLoading={props.isLoading}
        itemCount={props.itemCount}
        fetchAndPush={props.fetchAndPush}
        message={props.message}
      />
    </PageLayout>
  );
}

export default ModelsPage;
