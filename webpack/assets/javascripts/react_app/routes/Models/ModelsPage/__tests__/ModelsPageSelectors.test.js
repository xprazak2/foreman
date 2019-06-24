import { testSelectorsSnapshotWithFixtures } from 'react-redux-test-utils';

import {
  modelsAreLoading,
  modelsMessage,
  modelsHaveError,
  modelsHaveData,
} from '../ModelsPageSelectors';

const stateFactory = (obj) => ({ modelsPage: obj })

const fixtures = {
  'should return loading state': () =>
    modelsAreLoading(stateFactory({ isLoading: true })),
  'should return message': () =>
    modelsMessage(stateFactory({ message: { type: 'text', text: 'msg' }})),
  'should return whether page has error': () =>
    modelsHaveError(stateFactory({ hasError: true })),
  'should return whether page has data': () =>
    modelsHaveData(stateFactory({ hasData: true }))
}

describe('ModelsPageSelectors', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
