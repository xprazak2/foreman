import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';
import ModelsPage from '../ModelsPage';
import { propsFactory, models } from './ModelsPage.fixtures';

const props = {
  fetchAndPush: () => {},
  models,
  itemCount: models.length,
};

const fixtures = {
  'should render when loading': propsFactory(props),
  'should render with no data': propsFactory({ ...props, isLoading: false }),
  'should render with error': propsFactory({
    isLoading: false,
    hasError: true,
    message: {
      type: 'error',
      text: 'this is error',
    },
    ...props,
  }),
  'should render with models': propsFactory({ ...props, isLoading: false }),
};

describe('ModelsPage', () => {
  describe('redering', () =>
    testComponentSnapshotsWithFixtures(ModelsPage, fixtures));
});
