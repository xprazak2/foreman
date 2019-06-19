import React from 'react';

import DefaultEmptyState from '../../../components/common/EmptyState';
import { foremanUrl } from '../../../../foreman_tools';

const EmptyModelsPage = props => {
  return (
    <DefaultEmptyState
      icon='server'
      iconType='fa'
      header={__('Hardware Models')}
      description={__('Hardware models describe the hardware types of your hosts, including CPU class, vendor class and other notes.')}
      action={{ onClick: () => window.location.href = foremanUrl('/models/new'), title: __('Create Hardware Model') }}
    />
  );
}

export default EmptyModelsPage;
