import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import DeleteButton from './DeleteButton';

const fixtures = {
  'should render delete button on active': {
    active: true,
    onClick: () => {},
  },
  'should render nothing on non-active': {
    onClick: () => {},
  },
};

describe('DeleteButton', () =>
  testComponentSnapshotsWithFixtures(DeleteButton, fixtures));
