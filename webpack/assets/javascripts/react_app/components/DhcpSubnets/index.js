import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

export default (props) => {
  console.log(props)
  return (
    <Router>
      <Routes data={props.data} />
    </Router>
  );
}