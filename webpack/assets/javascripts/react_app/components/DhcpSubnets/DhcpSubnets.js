import React from 'react';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';

class DhcpSubnets extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // <div>
      //   <ul className={"nav nav-tabs nav-tabs-pf nav-stacked col-md-3"}>
      //     <li className={"active stacked-header"}>
      //     </li>

      //   </ul>
      // </div>
      <TabContainer id='dhcp-subnets-tab-container' defaultActiveKey={0}>
        <div>
          <Nav bsClass='nav nav-tabs nav-tabs-pf nav-stacked col-md3'>
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

export default DhcpSubnets;
