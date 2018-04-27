import {
  DHCP_SUBNET_REQUEST,
  DHCP_SUBNET_SUCCESS,
  DHCP_SUBNET_FAILURE
} from '../../consts';

const dhcpSubnet = (state = {}, action) => {
  const { payload } = action;

  switch(action.type) {
    case DHCP_SUBNET_REQUEST:
      return { ...state, ...{ loading: true } };
    case DHCP_SUBNET_SUCCESS:
      return { ...state, ...{ loading: false, subnets: payload.subnet || [] }};
    case DHCP_SUBNET_FAILURE:
      return { ...state, ...{ loading: false, error: payload.error } };
    default:
      return state;
  }
}

export default dhcpSubnet;
