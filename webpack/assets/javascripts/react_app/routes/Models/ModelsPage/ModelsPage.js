import React from 'react';
import { compose } from 'redux';
import { Button } from 'patternfly-react';

import { getParams } from '../../../common/urlHelpers';
import PageLayout from '../../../pages/common/PageLayout/PageLayout';
import ModelsTable from '../../../components/ModelsTable';
import { withRenderHandler, withPageLayout } from '../../../common/HOC';
import EmptyModelsPage from './EmptyModelsPage';

import searchProps from '../consts';

const layoutProps = {
  header: __('Hardware Models'),
  searchable: true,
  searchProps: searchProps
};

const reorder = WrappedComponent => componentProps =>
  withRenderHandler({
    Component: WrappedComponent,
    EmptyComponent: EmptyModelsPage
  })(componentProps);

export default compose(
  withPageLayout(layoutProps),
  reorder
)(ModelsTable);
