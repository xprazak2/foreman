import { connect } from 'react-redux';
import { bindActionCreators, compose, combineReducers } from 'redux';

import ModelsPage from './ModelsPage';
import * as ModelsPageActions from './ModelsPageActions';

import { getParams } from '../../../common/urlHelpers';
import { callOnMount } from '../../../common/HOC';
import withDataReducer from '../../common/reducerHOC/withDataReducer';
import withQueryReducer from '../../common/reducerHOC/withQueryReducer';

import {
  modelsAreLoading,
  modelsMessage,
  modelsHaveError,
  modelsHaveData,
  modelsPageNum,
  modelsItemCount,
  modelsSearchQuery,
} from './ModelsPageSelectors';

// import {
//   modelsTable
// }

import { selectReactAppMetadata } from '../../../ReactApp/ReactAppSelectors';

export const reducers = {
  modelsPage: combineReducers({
    data: withDataReducer('MODELS_PAGE'),
    query: withQueryReducer('MODELS_PAGE'),
  })
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModelsPageActions, dispatch);

const mapStateToProps = state => ({
  isLoading: modelsAreLoading(state),
  modelsMessage: modelsMessage(state),
  hasError: modelsHaveError(state),
  hasData: modelsHaveData(state),
  metadata: selectReactAppMetadata(state),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  callOnMount(({ loadInitialModels, metadata }) =>
    loadInitialModels(getParams({ defaultPerPage: metadata.entriesPerPage }))
  )
)(ModelsPage);
