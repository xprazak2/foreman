import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import ModelsPage from './ModelsPage';
import * as ModelsPageActions from './ModelsPageActions';

import { getParams } from '../../../common/urlHelpers';
import { callOnMount } from '../../../common/HOC';
import withDataReducer from '../../common/reducerHOC/withDataReducer';

import {
  modelsAreLoading,
  modelsMessage,
  modelsHaveError,
  modelsHaveData
} from './ModelsPageSelectors';

export const reducers = { modelsPage: withDataReducer('MODELS_PAGE') };

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModelsPageActions, dispatch);

const mapStateToProps = state => {
  return {
    isLoading: modelsAreLoading(state),
    modelsMessage: modelsMessage(state),
    hasError: modelsHaveError(state),
    hasData: modelsHaveData(state),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  callOnMount(({ loadInitialModels, metadata }) =>
    loadInitialModels(getParams({ defaultPerPage: metadata.entriesPerPage }))),
  )(ModelsPage);
