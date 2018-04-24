import {
  DHCP_SUBNETS_REQUEST,
  DHCP_SUBNETS_SUCCESS,
  DHCP_SUBNETS_FAILURE
} from '../../consts';

import { ajaxRequestAction } from '../common';

export const getDhcpSubnets = url => dispatch =>
  ajaxRequestAction({
    dispatch,
    requestAction: DHCP_SUBNETS_REQUEST,
    successAction: DHCP_SUBNETS_SUCCESS,
    failureAction: DHCP_SUBNETS_FAILURE,
    url,
    item: {}
  });
