import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as actions from './AuditsPageActions';
import reducer from './AuditsPageReducer';
import AuditsPage from './AuditsPage';
import {
  selectAudits,
  selectAuditsCount,
  selectAuditsIsFetchingNext,
  selectAuditsIsFetchingPrev,
  selectAuditsMessage,
  selectAuditsPerPage,
  selectAuditsSearch,
  selectAuditsSelectedPage,
  selectAuditsShowMessage,
} from './AuditsPageSelector';

const mapStateToProps = state => ({
  audits: selectAudits(state),
  isFetchingNext: selectAuditsIsFetchingNext(state),
  isFetchingPrev: selectAuditsIsFetchingPrev(state),
  itemCount: selectAuditsCount(state),
  message: selectAuditsMessage(state),
  page: selectAuditsSelectedPage(state),
  perPage: selectAuditsPerPage(state),
  searchQuery: selectAuditsSearch(state),
  showMessage: selectAuditsShowMessage(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const reducers = { auditsPage: reducer };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuditsPage)
);
