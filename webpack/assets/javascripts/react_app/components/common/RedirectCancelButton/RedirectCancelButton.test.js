import { testComponentSnapshotsWithFixtures } from 'react-redux-test-utils';

import RedirectCancelButton from './RedirectCancelButton';

const fixtures = {
  'renders correctly': { cancelPath: '/hosts' },
};

describe('RedirectCancelButton', () =>
  testComponentSnapshotsWithFixtures(RedirectCancelButton, fixtures));
