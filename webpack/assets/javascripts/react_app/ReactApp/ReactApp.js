import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import history from '../history';

import Layout from '../components/Layout';
import AppSwitcher from '../routes';

const ReactApp = ({ data: { layout, currentPath } }) => {

  useEffect(() => {
    if (history.location.pathname !== currentPath.path && history.location.search !== currentPath.search) {
      const newHistory = {
        pathname: currentPath.path,
        ...(currentPath.search ? { search: `?${currentPath.search}` } : {})
      }
      history.replace(newHistory);
    }
  });

return (
  <Router history={history}>
    <Layout data={layout}>
      <AppSwitcher />
    </Layout>
  </Router>
);
}

ReactApp.propTypes = {
  data: PropTypes.shape({
    layout: Layout.propTypes.data,
    metadata: PropTypes.object,
  }).isRequired,
};

export default ReactApp;
