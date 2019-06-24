import React from 'react';
import ModelsPage from './ModelsPage';

export default [
  {
    path: '/models',
    exact: true,
    render: props => <ModelsPage {...props} />,
  },
];
