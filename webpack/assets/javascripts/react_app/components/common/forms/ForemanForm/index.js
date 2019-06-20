import React from 'react';
import { Formik } from 'formik';
import Form from '../Form';

const prepareErrors = errors =>
  Object.keys(errors).reduce((memo, key) => {
    const errorMessages = errors[key]
    memo[key] = errorMessages ? errorMessages.join(', ') : errorMessages;
    return memo;
  },
  {}
)

const ForemanForm = props => {
  return (
    <Formik
      onSubmit={(values, actions) => {
        try {
          props.submitForm(props.submitValues(values));
        } catch(exception) {
          actions.setSubmitting(false);
          actions.setErrors(prepareErrors(exception.errors));
        };
      }}
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
    >
    {(formProps) => {
      return (
      <Form
        onSubmit={formProps.handleSubmit}
        onCancel={props.onCancel}
        disabled={formProps.isSubmitting}
        submitting={formProps.isSubmitting}
      >
      { cloneChildren(props.children, formProps) }
      </Form>
    )}}
    </Formik>
  )
}

const cloneChildren = (children, formProps) => (
  <React.Fragment>
    { children.map(child => React.cloneElement(child, formProps)) }
  </React.Fragment>
);

export default ForemanForm;
