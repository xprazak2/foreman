import Immutable from 'seamless-immutable';
import { initialState } from '../index';
import { initialState as dataInitialState } from '../../../common/reducerHOC/withDataReducer';

export const propsFactory = (state = {}) => {
  return ({ ...Immutable.asMutable(initialState.merge(dataInitialState), { deep: true }), ...state });
}

export const models = [
  { id: 1, name: 'my-hw-model', canEdit: true, canDelete: true, hostsCount: 5, vendorClass: 'custom' },
  { id: 2, name: 'your-hw-model', canEdit: false, canDelete: false, hostsCount: 4, vendorClass: 'B+' }
];
