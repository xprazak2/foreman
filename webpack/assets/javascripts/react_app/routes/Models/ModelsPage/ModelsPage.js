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
      <ModelsPageContent models={props.models} />
    </PageLayout>
  );
}

export default ModelsPage;
