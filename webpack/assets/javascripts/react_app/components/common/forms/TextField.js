import React from 'react';
import { Field } from 'redux-form';
import { FormControl, Checkbox } from 'patternfly-react';

import CommonForm from './CommonForm';
import '../../../common/reduxFormI18n';

const selectFieldType = (type, input, ...opts) => {
  switch(type) {
    case "checkbox":
      return <Checkbox { ...input }></Checkbox>
    default:
      return textDefault(input, type);
  }
}

const textDefault = (input, type) => <FormControl { ...input } type={type}></FormControl>;

const renderField = ({
  input,
  label,
  type,
  required,
  className,
  inputClassName,
  meta: { touched, error },
}) => (
  <CommonForm
    label={label}
    className={className}
    inputClassName={inputClassName}
    touched={touched}
    required={required}
    error={error}
  >
    { selectFieldType(type, input) }
  </CommonForm>
);

const TextField = ({
  name,
  label,
  type = 'text',
  className = '',
  inputClassName,
  required,
  validate,
}) => (
  <Field
    name={name}
    type={type}
    component={renderField}
    required={required}
    className={className}
    inputClassName={inputClassName}
    label={label}
    validate={validate}
  />
);

export default TextField;
