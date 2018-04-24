import React from 'react';
import { connect } from 'react-redux';
import { TabContainer, Nav, NavItem, TabContent, TabPane, Spinner } from 'patternfly-react';

import * as DhcpSubnetsActions from '../../redux/actions/DhcpSubnets';

class DhcpSubnets extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log(this.props);
    const { getDhcpSubnets } = this.props
    // getDhcpSubnets()
  }

  render() {
    return (
      <TabContainer id='dhcp-subnets-tab-container' defaultActiveKey={0}>
        <div className='col-md-12'>
          <Nav className='col-md-3 nav nav-tabs nav-tabs-pf nav-stacked'>
            <NavItem className='stacked-header' eventKey={0}>General</NavItem>
            <NavItem className='stacked-header' eventKey={1}>Dummy</NavItem>
          </Nav>
          <TabContent animation className='col-md-9 divided'>
            <TabPane eventKey={0}>General info</TabPane>
            <TabPane eventKey={1}>Dummy tab pane</TabPane>
          </TabContent>
        </div>
      </TabContainer>
    )
  }
}

const mapStateToProps = ({ dhcpSubnets }, ownProps) => dhcpSubnets;

export default connect(mapStateToProps, DhcpSubnetsActions)(DhcpSubnets);
