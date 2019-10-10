import { testComponentSnapshotsWithFixtures } from '@theforeman/test';
import NameCell from './NameCell';

const fixtures = {
  'should render active link': {
    active: true,
    id: 2,
    name: 'KVM',
    controller: 'models',
    children: 'kvm',
  },
  'should render disabled link': {
    id: 2,
    name: 'HyperV',
    controller: 'models',
    children: 'hyperv',
  },
};

describe('NameCell', () =>
  testComponentSnapshotsWithFixtures(NameCell, fixtures));
