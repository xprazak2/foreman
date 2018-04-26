import React from 'react';
import { connect } from 'react-redux';
import { TabContainer, Nav, NavItem, TabContent, TabPane, Spinner } from 'patternfly-react';

import Table from '../common/Table';
import * as DhcpSubnetsActions from '../../redux/actions/DhcpSubnets';
import columns from './DhcpSubnetsColumns';

class DhcpSubnets extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(this.props);
    const { getDhcpSubnets, data: { proxyId, proxySubnetsUrl } } = this.props;
    getDhcpSubnets(proxySubnetsUrl)
  }

  render() {
    console.log(this.props)
    const { dhcpSubnets: { loading, subnets } } = this.props;
    return (
      <Spinner loading={loading === undefined || loading}>
        <TabContainer id='dhcp-subnets-tab-container' defaultActiveKey={0}>
          <div className='col-md-12'>
            <DhcpSubnetsTable subnets={subnets} columns={columns} />
          </div>
        </TabContainer>
      </Spinner>
    )
  }
}

const DhcpSubnetsTable = ({ subnets, columns }) =>
  <Table rows={subnets} columns={columns} rowKey={'name'}/>

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
