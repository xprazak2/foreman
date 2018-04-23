import React from 'react';

import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';

class DhcpSubnets extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ul className={"nav nav-tabs nav-tabs-pf nav-stacked col-md-3"}>
          <li className={"active stacked-header"}>
          </li>

        </ul>
      </div>
    )
  }
}

export default DhcpSubnets;
