import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import ModelsTable from './ModelsTable';
import reducer from './ModelsTableReducer';
import { getTableItems } from './ModelsTableActions';

const mapStateToProps = state => state.models;
const mapDispatchToProps = dispatch => bindActionCreators({ getTableItems }, dispatch);

export const reducers = { models: reducer };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModelsTable)
);
