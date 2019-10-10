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

const state = { modelsPage: propsFactory({ results: models }) };

const fixtures = {
  'should return models': () => selectModels(state),
  'should return page': () => selectPage(state),
  'should return perPage': () => selectPerPage(state),
  'should return search': () => selectSearch(state),
  'should return sort': () => selectSort(state),
  'should return hasData': () => selectHasData(state),
  'should return hasError': () => selectHasError(state),
  'should return isLoading': () => selectIsLoading(state),
  'should return subtotal': () => selectSubtotal(state),
  'should return message': () => selectMessage(state),
};

describe('ModelsPage selectors', () =>
  testSelectorsSnapshotWithFixtures(fixtures));
