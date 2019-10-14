import React from 'react';

import PageLayout from '../../common/PageLayout/PageLayout';
import ModelsPageContent from './components/ModelsPageContent';
import { MODELS_SEARCH_PROPS } from '../constants';

const ModelsPage = props => {
  console.log(props);
  return (
    <PageLayout
      header={__('Hardware Models')}
      searchable
      searchProps={MODELS_SEARCH_PROPS}
      searchQuery={''}
      isLoading={false}
      onSearch={() => {}}
      onBookmarkClick={() => {}}
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
      />
    </PageLayout>
  );
}

export default ModelsPage;
