import React from 'react';

// import { LoadingState } from 'patternfly-react';
import queryString from 'query-string';

import { Button } from 'patternfly-react';

import PageLayout from '../../common/PageLayout/PageLayout';
import LoadingState from '../../../components/LoadingState';
import ModelsTable from '../../../components/ModelsTable';

import searchProps from '../consts';

class ModelsPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.loadInitialModels(queryString.parse(this.props.location.search));
  }


  render() {
    console.log(this.props);
    const { loading, loadingError } = this.props;

    return (
      <LoadingState loading={loading}>
        <PageLayout
          header={__('Hardware Models')}
          searchable={true}
          searchProps={searchProps}
          toolbarButtons={
            <Button>Button!</Button>
          }
        >
          <ModelsTable />
        </PageLayout>
      </LoadingState>
    );
  }
}

export default ModelsPage;
