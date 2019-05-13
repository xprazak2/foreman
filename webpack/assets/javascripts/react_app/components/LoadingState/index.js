import React from 'react';
import { LoadingState as PfLoadingState } from 'patternfly-react';

import './LoadingState.scss'

const LoadingState = props => {
  return (
    <PfLoadingState {...props} additionalClasses="loading-state-tfm"/>
  )
}

export default LoadingState;
