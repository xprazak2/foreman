import React from 'react';
import { Route } from 'react-router-dom';

import DhcpSubnetsWelcome from './DhcpSubnetsWelcome';
import DhcpSubnets from './DhcpSubnets';
import DhcpSubnet from './DhcpSubnet';

const links = [
  {
    title: 'DHCP Subnets Welcome',
    path: 'smart_proxies/:id',
    Component: DhcpSubnetsWelcome
  },
  {
    title: 'DHCP Subnets List',
    path: 'smart_proxies/:id/dhcp',
    Component: DhcpSubnets
  },
  {
    title: 'Dhcp Subnet',
    path: 'smart_proxies/:id/dhcp/:subnet_id',
    Component: DhcpSubnet
  }
]

export default data => {
  return (
    <div>
      {
        links.map(({ path, Component }) => (
          <Route exact key={path} path={`/${path}`} render={(props) => <Component {...props} {...data} /> } />
        ))
      }
    </div>
  )
}