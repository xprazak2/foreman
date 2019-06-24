import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import history from '../history';
import Layout from '../components/Layout';
import AppSwitcher from '../routes';

const ReactApp = ({ data: { layout, metadata } }) => (
  <Router history={history}>
    <Layout data={layout}>
      <AppSwitcher metadata={metadata} />
    </Layout>
  </Router>
);

ReactApp.propTypes = {
  data: PropTypes.shape({
    layout: Layout.propTypes.data,
    metadata: PropTypes.object,
  }).isRequired,
};

export default ReactApp;
