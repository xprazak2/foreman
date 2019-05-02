import API from '../../../../API';

import { testActionSnapshotWithFixtures } from '../../../../common/testHelpers';
import {
  fetchAudits,
  fetchAndPush,
  initializeAudits,
  auditSearch,
  changePage,
  changePerPage,
  displayMessage,
  fetchingNext,
  fetchingPrev,
  resolvedNext,
  resolvedPrev,
  clearCache,
} from '../AuditsPageActions';
import { AUDITS_NEXT, AUDITS_PREV } from '../../constants';
import {
  getMock,
  responseMock,
  emptyResponseMock,
} from '../AuditsPage.fixtures';

jest.mock('../../../../API');

const runWithGetState = (state, action, ...params) => dispatch => {
  const getState = () => ({
    auditsPage: state,
  });
  action(...params)(dispatch, getState);
};

const runFetchAuditsAPI = (state, resourceMock, serverMock) => {
  API.get.mockImplementation(serverMock);

  return runWithGetState(state, fetchAudits, resourceMock);
};

const fixtures = {
  'should fetch Audits': () =>
    runFetchAuditsAPI(
      { showMessage: false },
      getMock,
      async () => responseMock
    ),

  'should fetch nextAudits': () =>
    runFetchAuditsAPI(
      { showMessage: false },
      {
        ...getMock,
        view: AUDITS_NEXT,
      },
      async () => responseMock
    ),

  'should fetch prevAudits': () =>
    runFetchAuditsAPI(
      { showMessage: false },
      {
        ...getMock,
        view: AUDITS_PREV,
      },
      async () => responseMock
    ),

  'should fetch empty Audits': () =>
    runFetchAuditsAPI(
      { showMessage: false },
      { ...getMock, searchQuery: 'no-such-audit' },
      async () => emptyResponseMock
    ),

  'should fetch Audits and remove emptyState': () =>
    runFetchAuditsAPI({ showMessage: true }, getMock, async () => responseMock),

  'should fetch Audits and fail': () =>
    runFetchAuditsAPI({ showMessage: true }, getMock, async () => {
      throw new Error('some-error');
    }),

  'should changePage': () =>
    runWithGetState(
      {
        perPage: 20,
        searchQuery: 'search',
      },
      changePage,
      5
    ),

  'should changePage and fetchNext': () =>
    runWithGetState(
      {
        page: 3,
        perPage: 20,
        searchQuery: 'search',
        nextAudits: [1, 2],
      },
      changePage,
      4
    ),

  'should changePage and fetchPrev': () =>
    runWithGetState(
      {
        page: 3,
        perPage: 20,
        searchQuery: 'search',
        prevAudits: [1, 2],
      },
      changePage,
      2
    ),

  'should changePerPage': () =>
    runWithGetState(
      {
        perPage: 5,
        itemCount: 20,
        searchQuery: 'search',
      },
      changePerPage,
      25
    ),

  'should changePerPage without API': () =>
    runWithGetState(
      {
        audits: [1, 2, 3, 4, 5, 6, 7],
        searchQuery: 'search',
        perPage: 25,
      },
      changePerPage,
      5
    ),

  'should auditSearch': () =>
    runWithGetState(
      {
        perPage: 5,
      },
      auditSearch,
      'search'
    ),

  'should fetchAndPush': () => fetchAndPush(getMock),

  'should initializeAudits w/replace': () =>
    runWithGetState(
      { searchQuery: 'search' },
      initializeAudits,
      { page: 2, perPage: 20, searchQuery: 'search' },
      true
    ),
  'should initializeAudits': () =>
    runWithGetState({ searchQuery: 'search' }, initializeAudits, {
      page: 2,
      perPage: 20,
      searchQuery: 'search',
    }),
  'should displayMessage': () => displayMessage('text', 'error'),
  'should fetchingNext': () => fetchingNext(),
  'should fetchingPrev': () => fetchingPrev(),
  'should resolvedNext': () => resolvedNext(),
  'should resolvedPrev': () => resolvedPrev(),
  'should clearCache': () => clearCache(),
};

describe('AuditsPage actions', () => testActionSnapshotWithFixtures(fixtures));
