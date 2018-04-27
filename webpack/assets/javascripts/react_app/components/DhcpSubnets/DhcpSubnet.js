import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'patternfly-react';

import { getDhcpSubnet } from '../../redux/actions/DhcpSubnets';

class DhcpSubnet extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
  }

  componentDidMount() {
    const { getDhcpSubnet, data: { proxyId }, match: { params: { subnetId } } } = this.props;
    console.log(this.props)
    getDhcpSubnet(`smart_proxies/${proxyId}/proxy_subnets/${subnetId}`)
  }

  render() {
    const { dhcpSubnet: { loading, subnet }} = this.props;
    return (
      <Spinner loading={isLoading(loading)}>
        <div>I ah dhcp subnet</div>
      </Spinner>
    )
  }
}

const isLoading = (loading) => loading === undefined || loading;

const mapStateToProps = ({ proxyDhcpSubnets: { dhcpSubnet } }, ownProps) => ({ dhcpSubnet });

export default connect(mapStateToProps, { getDhcpSubnet })(DhcpSubnet);
