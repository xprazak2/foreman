import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Immutable from 'seamless-immutable';

import ModelsPage from './ModelsPage';
import * as actions from './ModelsPageActions';

import { callOnMount, callOnPopState } from '../../../common/HOC';

import withDataReducer from '../../common/reducerHOC/withDataReducer';

import {
  selectModels,
  selectPage,
  selectPerPage,
  selectSearch,
  selectSort,
  selectHasData,
  selectHasError,
  selectIsLoading,
  selectSubtotal,
  selectMessage,
} from './ModelsPageSelectors';

const mapStateToProps = state => ({
  models: selectModels(state),
  page: selectPage(state),
  perPage: selectPerPage(state),
  search: selectSearch(state),
  sort: selectSort(state),
  isLoading: selectIsLoading(state),
  hasData: selectHasData(state),
  hasError: selectHasError(state),
  itemCount: selectSubtotal(state),
  message: selectMessage(state),
});

export const initialState = Immutable({
  total: 0,
  subtotal: 0,
  page: null,
  perPage: null,
  search: '',
  canCreate: false,
  sort: {
    by: null,
    order: null,
  },
  results: [],
});

export const reducers = {
  modelsPage: withDataReducer('MODELS_PAGE', initialState),
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  callOnMount(({ initializeModels }) => initializeModels()),
  callOnPopState(({ initializeModels }) => initializeModels())
)(ModelsPage);
