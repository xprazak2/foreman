import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';
import ModelsPage from '../ModelsPage';
import { propsFactory, models } from './ModelsPage.fixtures';

const fixtures = {
  'should render when loading': propsFactory(),
  'should render with no data': propsFactory({ isLoading: false }),
  'should render with error': propsFactory({
    isLoading: false,
    hasError: true,
    message: {
      type: 'error',
      text: 'this is error',
    },
  }),
  'should render with models': propsFactory({ isLoading: false, models }),
};

describe('ModelsPage', () => {
  describe('redering', () =>
    testComponentSnapshotsWithFixtures(ModelsPage, fixtures));
});
