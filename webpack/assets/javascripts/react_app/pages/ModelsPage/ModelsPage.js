import React from 'react';
import PageLayout from '../common/PageLayout/PageLayout';
import ModelsTable from '../../components/ModelsTable';

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
      <ModelsTable />
    </PageLayout>
  );
}

export default ModelsPage;
