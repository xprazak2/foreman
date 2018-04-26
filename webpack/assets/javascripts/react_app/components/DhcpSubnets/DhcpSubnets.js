import React from 'react';
import { connect } from 'react-redux';
import { TabContainer, Nav, NavItem, TabContent, TabPane, Spinner, DropdownButton, MenuItem, Button } from 'patternfly-react';
import { Link } from 'react-router-dom';
import { every } from 'lodash';

import Table from '../common/Table';
import * as DhcpSubnetsActions from '../../redux/actions/DhcpSubnets';
import columns from './DhcpSubnetsColumns';

class DhcpSubnets extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    const { getDhcpSubnets, data: { proxyId, proxySubnetsUrl } } = this.props;
    getDhcpSubnets(proxySubnetsUrl)
  }

  render() {
    console.log(this.props)
    const { dhcpSubnets: { loading, subnets }, history, location } = this.props;

    return (
      <Spinner loading={isLoading(loading)}>
        <TabContainer id='dhcp-subnets-tab-container' defaultActiveKey={0}>
          <div className='col-md-12'>
            <DhcpSubnetsTable subnets={subnets} columns={columns} location={location} history={history}/>
          </div>
        </TabContainer>
      </Spinner>
    )
  }
}

const isLoading = (loading) => loading === undefined || loading;

const propsPresent = (ary) => every(ary, (item) => !!item)

const DhcpSubnetsTable = ({ subnets, columns, location, history }) =>
      <Table rows={addLinkToDetails(location)(history)(subnets)} columns={columns} rowKey={'name'}/>


// const addActionsDropdown = (subnets) =>
//   subnets.map((subnet) => {
//     subnet.actions = (<SubnetActionsDropdown id={subnet.parameterized}/>)
//     return subnet;
//   })
const addLinkToDetails = location => history => subnets => {
  return subnets.map((subnet) => {
    let path = { pathname: `${location.pathname}/${subnet.id}`}
    console.log(path)

    subnet.detailsAction = (
          <a href='#' onClick={(event) => {
            console.log(event);
            history.push(path)
            console.log(event)
          }} >{subnet.label}</a>
      )
    return subnet;
  })
};

const ViewDetailsButton = (props) =>
(
  <Button onClick={redirect(location)(history)}>
    Details
  </Button>
)
// const TabNavs = ({ subnets }) =>
//   (
//     <Nav className='col-md-3 nav nav-tabs nav-tabs-pf nav-stacked'>
//       <NavItem className='stacked-header' eventKey={0}>General</NavItem>
//       { subnets.map((subnet, index) => (<NavItem className='stacked-header' key={index + 1} eventKey={index + 1}>{subnet.network}</NavItem>)) }
//     </Nav>
//   )

// const TabPanes = ({subnets}) =>
// (
//   <TabContent animation className='col-md-9 divided'>
//     <TabPane eventKey={0}>General info</TabPane>
//     { subnets.map((subnet, index) => (<TabPane key={index + 1} eventKey={index + 1}>{subnet.to_label}</TabPane>)) }
//   </TabContent>
// )

const mapStateToProps = ({ proxyDhcpSubnets: { dhcpSubnets } }, ownProps) => ({ dhcpSubnets });

export default connect(mapStateToProps, DhcpSubnetsActions)(DhcpSubnets);
