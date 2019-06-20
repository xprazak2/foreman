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

const isInitialValid = ({ validationSchema, initialValues }) => {
  return !validationSchema ? true : validationSchema.isValidSync(initialValues);
}

const ForemanForm = props => {
  return (
    <Formik
      onSubmit={(values, actions) => {
        props.onSubmit(values, actions).catch(exception => {
          actions.setSubmitting(false);
          actions.setErrors(prepareErrors(exception.errors));
        });
      }}
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      isInitialValid={isInitialValid}
    >
    {(formProps) => {
      const disabled = formProps.isSubmitting || (!formProps.isValid && !props.error);

      return (
      <Form
        onSubmit={formProps.handleSubmit}
        onCancel={props.onCancel}
        disabled={disabled}
        error={props.error}
        errorTitle={
          props.error && props.error.severity === 'danger' ? __('Error! ') : __('Warning! ')
        }
        submitting={formProps.isSubmitting}
      >
      { cloneChildren(props.children, { formProps, disabled } ) }
      </Form>
    )}}
    </Formik>
  )
}

const cloneChildren = (children, childProps) => (
  <React.Fragment>
    { children.map((child, idx) => React.cloneElement(child, { ...childProps, key: idx })) }
  </React.Fragment>
);

export default ForemanForm;
