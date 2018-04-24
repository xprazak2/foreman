import {
  DHCP_SUBNETS_REQUEST,
  DHCP_SUBNETS_SUCCESS,
  DHCP_SUBNETS_FAILURE
} from '../consts';

const dhcpSubnets = (state = {}, action) => {
  const { payload } = action;

  switch(action.type) {
    case DHCP_SUBNETS_REQUEST:
      return { ...state, ...{ loadingDhcpSubnets: true } };
    case DHCP_SUBNETS_SUCCESS:
      return { ...state, ...{ loadingDhcpSubnets: false }};
    case DHCP_SUBNETS_FAILURE:
      return { ...state, ...{ loadingDhcpSubnets: false, error: payload.error } };
    default:
      return state;
  }
}

export default dhcpSubnets;
