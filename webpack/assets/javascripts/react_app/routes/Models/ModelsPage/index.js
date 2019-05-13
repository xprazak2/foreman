import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ModelsPage from './ModelsPage';
import * as ModelsPageActions from './ModelsPageActions';
import reducer from './ModelsPageReducer';

export const reducers = { modelsPage: reducer };

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModelsPageActions, dispatch);

const mapStateToProps = state => {
  return {
    pagination: state.modelsPage.pagination
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelsPage);
