import { testComponentSnapshotsWithFixtures } from '@theforeman/test';

import RedirectCancelButton from './RedirectCancelButton';

const withReactRoutesMock = Component => props => (
  <div className="component-with-mocked-routes">
    <Component {...props} />
  </div>
);

jest.mock('../../../common/withReactRoutes', withReactRoutesMock);

const fixtures = {
  'renders correctly': { cancelPath: '/hosts' },
};

describe('RedirectCancelButton', () =>
  testComponentSnapshotsWithFixtures(RedirectCancelButton, fixtures));
