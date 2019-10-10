import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import RedirectCancelButton from './RedirectCancelButton';

const fixtures = {
  'renders correctly': { cancelPath: '/hosts' },
};

describe('RedirectCancelButton', () =>
  testComponentSnapshotsWithFixtures(RedirectCancelButton, fixtures));
