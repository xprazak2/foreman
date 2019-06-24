import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';

import ModelsPage from '../ModelsPage';

const fixtures = {
  'should render': {
    isLoading: false,
    modelsMessage: { type: "empty", text: '' },
    hasData: true,
  },
  'should render without data': {
    isLoading: false,
    modelsMessage: { type: "empty", text: '' },
    hasData: false,
  },
  'should render with message': {
    isLoading: false,
    modelsMessage: { type: "error", text: 'This is Error!!' },
    hasData: false,
  }
}

describe('ModelsPage', () =>
  testComponentSnapshotsWithFixtures(ModelsPage, fixtures));
