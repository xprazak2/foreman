import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import history from '../history';
import { getForemanContext } from '../Root/Context/ForemanContext';
import Layout, { propTypes as LayoutPropTypes } from '../components/Layout';
import AppSwitcher from '../routes';

const ReactApp = ({ layout, metadata, toasts }) => {
  const ForemanContext = getForemanContext(metadata);

  return (
    <ForemanContext.Provider value={metadata}>
      <Router history={history}>
        <Layout data={layout}>
          <AppSwitcher toasts={toasts} />
        </Layout>
      </Router>
    </ForemanContext.Provider>
  );
};

ReactApp.propTypes = {
  layout: LayoutPropTypes.data.isRequired,
  metadata: PropTypes.object.isRequired,
  toasts: PropTypes.array,
};

ReactApp.defaultProps = {
  toasts: [],
};

export default ReactApp;
