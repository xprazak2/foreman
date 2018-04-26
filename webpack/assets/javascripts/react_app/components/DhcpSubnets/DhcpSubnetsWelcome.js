import React from 'react';
import { Link } from 'react-router-dom';

import { EmptyState, Button, Spinner } from 'patternfly-react';

const DhcpSubnetsWelcome = ({ location, history }) => {
  console.log(location.pathname)
  console.log(history)
  const redirect = location => history => () => history.push({ pathname: `${location.pathname}/dhcp` })

  const primaryButton = () => (
    <Button bsStyle="primary" bsSize="large" onClick={redirect(location)(history)}>
      Proceed
    </Button>
  )

  return (
    <Spinner loading={!location || !history}>
      <EmptyState>
        <EmptyState.Icon type="pf" name="network"/>
        <EmptyState.Title>DHCP Subnets</EmptyState.Title>
        <EmptyState.Info>
          This page will provide you with view of DHCP subnets managed by Foreman through this proxy.
          All information will be fetched on-demand from proxy.
        </EmptyState.Info>
        <EmptyState.Action>
          { primaryButton() }
        </EmptyState.Action>
      </EmptyState>
    </Spinner>
  )
}

export default DhcpSubnetsWelcome;
