import { connect } from 'react-redux';
import { compose, combineReducers, bindActionCreators } from 'redux';

import ModelsPage from './ModelsPage';
import * as actions from './ModelsPageActions';

import { callOnMount, callOnPopState } from '../../../common/HOC';

import withQueryReducer from '../../common/reducerHOC/withQueryReducer';
import withDataReducer from '../../common/reducerHOC/withDataReducer';

import {
  selectModels
} from './ModelsPageSelectors';

const mapStateToProps = state => ({
  models: selectModels(state),
});

export const reducers = {
  modelsPage: combineReducers({
    data: withDataReducer('MODELS_PAGE'),
    query: withQueryReducer('MODELS_PAGE'),
  })
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
