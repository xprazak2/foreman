import { pickSort, buildQuery } from '../ModelsPageHelpers';

const pickedQuery = { by: 'default_name', order: 'ASC' };

const searchString = 'name=foo';

const stateSearch = { search: searchString };

const querySearch = { searchQuery: searchString };

const querySort = {
  sort: {
    by: 'defaultName',
    order: 'ASC',
  },
};

const pageParams = {
  page: 5,
  perPage: 42,
};

const stateParams = {
  ...pageParams,
  ...stateSearch,
  ...querySort,
};

const resultParams = {
  ...pageParams,
  ...querySearch,
  sort: pickedQuery,
};

const queryParams = {
  ...pageParams,
  ...querySearch,
  ...querySort,
};

const stateFactory = state => ({
  modelsPage: state,
});

describe('pickSort', () => {
  it('should pick sort from query', () => {
    expect(pickSort(querySort, {})).toStrictEqual(pickedQuery);
  });

  it('should pick sort from state', () => {
    const state = stateFactory({ sort: pickedQuery });
    expect(pickSort({}, state)).toStrictEqual(pickedQuery);
  });
});

describe('buildQuery', () => {
  it('should return params from query if present', () => {
    expect(buildQuery(queryParams, {})).toStrictEqual(resultParams);
  });

  it('should return params from state', () => {
    const state = stateFactory(stateParams);
    expect(buildQuery({}, state)).toStrictEqual(resultParams);
  });
});
