import { connect } from 'react-redux';
import { compose, combineReducers, bindActionCreators } from 'redux';

import ModelsPage from './ModelsPage';
import * as actions from './ModelsPageActions';

import { callOnMount, callOnPopState } from '../../../common/HOC';

import withQueryReducer from '../../common/reducerHOC/withQueryReducer';
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
});

export const reducers = {
  modelsPage: withDataReducer('MODELS_PAGE'),
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  callOnMount((props) => {
    props.initializeModels();
  })

)(ModelsPage);
