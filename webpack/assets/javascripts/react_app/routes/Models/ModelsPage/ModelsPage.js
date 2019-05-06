import React from 'react';
import queryString from 'query-string';
import { Button } from 'patternfly-react';

import PageLayout from '../../../pages/common/PageLayout/PageLayout';
import LoadingState from '../../../components/LoadingState';
import ModelsTable from '../../../components/ModelsTable';

import searchProps from '../consts';

class ModelsPage extends React.Component {
  componentDidMount() {
    this.props.loadInitialModels(queryString.parse(this.props.location.search));
  }

  render() {
    const { loading, loadingError } = this.props;

    return (
      <LoadingState loading={loading}>
        <PageLayout
          header={__('Hardware Models')}
          searchable={true}
          searchProps={searchProps}
        >
          <ModelsTable />
        </PageLayout>
      </LoadingState>
    );
  }
}

export default ModelsPage;
