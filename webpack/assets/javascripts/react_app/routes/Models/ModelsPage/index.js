import { connect } from 'react-redux';
import { compose, combineReducers } from 'redux';

import ModelsPage from './ModelsPage';
import * as actions from './ModelsPageActions';

const mapStateToProps = state => ({

});

export const reducers = {
  modelsPage: combineReducers({
    data: withDataReducer('MODELS_PAGE'),
    query: withQueryReducer('MODELS_PAGE'),
  })
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModelsPage);