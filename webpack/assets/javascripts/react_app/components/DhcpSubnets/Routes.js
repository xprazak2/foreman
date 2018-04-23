import React from 'react';
import { Route } from 'react-router-dom';

import DhcpSubnets from './DhcpSubnets';

const links = [
  {
    title: 'DHCP Subnets',
    path: 'smart_proxies/:id',
    Component: DhcpSubnets
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