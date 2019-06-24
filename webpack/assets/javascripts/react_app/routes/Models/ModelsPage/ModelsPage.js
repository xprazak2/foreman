import { compose } from 'redux';

import ModelsTable from '../../../components/ModelsTable';
import { withRenderHandler, withPageLayout } from '../../../common/HOC';
import EmptyModelsPage from './EmptyModelsPage';

import searchProps from '../consts';

const layoutProps = {
  header: __('Hardware Models'),
  searchable: true,
  searchProps,
};

const reorder = WrappedComponent => componentProps =>
  withRenderHandler({
    Component: WrappedComponent,
    EmptyComponent: EmptyModelsPage,
  })(componentProps);

export default compose(
  withPageLayout(layoutProps),
  reorder
)(ModelsTable);
