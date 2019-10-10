import { testActionSnapshotWithFixtures } from 'react-redux-test-utils';

import { API } from '../../../../redux/API';

import {
  fetchModels,
  fetchAndPush,
  initializeModels,
} from '../ModelsPageActions';

import { propsFactory, models } from './ModelsPage.fixtures';

const fetchActionParams = {
  page: 1,
  perPage: 20,
  searchQuery: '',
  sort: { by: '', order: '' },
};

const response = propsFactory({
  results: models,
  total: 2,
  subtotal: 2,
  page: 1,
  perPage: 20,
});

const responseMock = { data: response };

jest.mock('../../../../redux/API');

const runWithGetState = (state, action, ...params) => dispatch => {
  const getState = () => ({
    modelsPage: state,
  });

  action(...params)(dispatch, getState);
};

const runApiFetch = (state, actionParams, serverMock) => {
  API.get.mockImplementation(serverMock);

  return runWithGetState(state, fetchModels, actionParams);
};

const fixtures = {
  'should fetch models': () =>
    runApiFetch(propsFactory(), fetchActionParams, async () => responseMock),

  'should fetch and fail': () =>
    runApiFetch(propsFactory(), fetchActionParams, async () => {
      throw new Error('random-error');
    }),

  'should initialize models': () =>
    runWithGetState(propsFactory(), initializeModels, responseMock),

  'should fetch and push': () =>
    runWithGetState(propsFactory(), fetchAndPush, response),
};

describe('ModelsPage actions', () => testActionSnapshotWithFixtures(fixtures));
