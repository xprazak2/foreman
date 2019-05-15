import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModelsTable from './ModelsTable';
import reducer from './ModelsTableReducer';
import * as actions from './ModelsTableActions';

const mapStateToProps = state => state.modelsTable.tableData;
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const reducers = { modelsTable: reducer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelsTable);
