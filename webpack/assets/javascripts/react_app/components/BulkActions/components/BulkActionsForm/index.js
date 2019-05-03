import React from 'react';

const submit = (formInputs, dispatch, props) => {
  const { submitForm, url } = props;

  return submitForm({ url, {} });
}