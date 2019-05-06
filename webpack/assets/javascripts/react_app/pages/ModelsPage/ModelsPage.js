import React from 'react';
import PageLayout from '../common/PageLayout/PageLayout';

const ModelsPage = props => {
  const { searchProps, pagination, searchable } = props;

  return (
    <PageLayout
      header={__('Hardware Models')}
      searchable={searchable}
      searchProps={searchProps}
      toolbarButtons={
        <div>Button!</div>
      }
    >
      Tada!
    </PageLayout>
  );
}

export default ModelsPage;
