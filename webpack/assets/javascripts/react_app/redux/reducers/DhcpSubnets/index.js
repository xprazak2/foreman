import { combineReducers } from 'redux';

import dhcpSubnets from './DhcpSubnets';
import dhcpSubnet from './DhcpSubnet';

export default combineReducers({ dhcpSubnets, dhcpSubnet });
