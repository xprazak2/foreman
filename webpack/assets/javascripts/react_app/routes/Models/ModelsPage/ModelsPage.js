import React from 'react';

import PageLayout from '../../common/PageLayout/PageLayout';
import ModelsPageContent from './components/ModelsPageContent';
import { MODELS_SEARCH_PROPS } from '../constants';

const ModelsPage = ({
  fetchAndPush,
  search,
  isLoading,
  hasData,
  models,
  page,
  perPage,
  sort,
  hasError,
  itemCount,
  message
}) => {
  const handleSearch = query => fetchAndPush({ searchQuery: query, page: 1 })

  return (
    <PageLayout
      header={__('Hardware Models')}
      searchable
      searchProps={MODELS_SEARCH_PROPS}
      searchQuery={search}
      isLoading={isLoading && hasData}
      onSearch={handleSearch}
      onBookmarkClick={handleSearch}
    >
      <ModelsPageContent
        models={models}
        page={page}
        perPage={perPage}
        search={search}
        sort={sort}
        hasData={hasData}
        hasError={hasError}
        isLoading={isLoading}
        itemCount={itemCount}
        fetchAndPush={fetchAndPush}
        message={message}
      />
    </PageLayout>
  );
}

export default ModelsPage;
