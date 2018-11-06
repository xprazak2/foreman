import { testComponentSnapshotsWithFixtures } from '../../../common/testHelpers';

import PaginationRow from '../PaginationRow';

describe('PaginationRow component', () => {
  const getBaseProps = () => ({
    pagination: {
      page: 2,
      perPage: 5,
      perPageOptions: [5, 10, 25],
    },
    itemCount: 52,
    viewType: 'list',
  });

  describe('rendering', () => {
    testComponentSnapshotsWithFixtures(PaginationRow, { 'renders correctly': getBaseProps() });
  });
});
