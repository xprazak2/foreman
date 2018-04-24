import {
  DHCP_SUBNETS_REQUEST,
  DHCP_SUBNETS_SUCCESS,
  DHCP_SUBNETS_FAILURE
} from '../../consts';

const dhcpSubnets = (state = {}, action) => {
  const { payload } = action;
  console.log(action)

  switch(action.type) {
    case DHCP_SUBNETS_REQUEST:
      return { ...state, ...{ loading: true } };
    case DHCP_SUBNETS_SUCCESS:
      return { ...state, ...{ loading: false, subnets: payload.subnets || [] }};
    case DHCP_SUBNETS_FAILURE:
      return { ...state, ...{ loading: false, error: payload.error } };
    default:
      return state;
  }
}

export default dhcpSubnets;
