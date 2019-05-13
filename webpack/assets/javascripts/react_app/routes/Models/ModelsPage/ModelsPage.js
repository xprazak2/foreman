import React from 'react';

import { Button } from 'patternfly-react';
import PageLayout from '../../common/PageLayout/PageLayout';
import ModelsTable from '../../../components/ModelsTable';

import searchProps from '../consts';

class ModelsPage extends React.Component {
  constructor(props) {
    super(props);
    this.props.loadInitialModels();
  }


  render() {
    console.log(this.props);

    return (
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
    );
  }
}

export default ModelsPage;
