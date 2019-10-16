import { testSelectorsSnapshotWithFixtures } from 'react-redux-test-utils';

import {
  selectModels,
  selectPage,
  selectPerPage,
  selectSearch,
  selectSort,
  selectHasData,
  selectHasError,
  selectIsLoading,
  selectSubtotal,
  selectMessage,
} from '../ModelsPageSelectors';

import { propsFactory, models } from './ModelsPage.fixtures';

const state = propsFactory({ models });

const fixtures = {
  'should return models': () => selectModels(state),
  'should return page': () => 
}
