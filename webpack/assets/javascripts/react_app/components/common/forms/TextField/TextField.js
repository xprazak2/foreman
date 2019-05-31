import React from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';
import TextFieldInner from './TextFieldInner';
import '../../../../common/reduxFormI18n';

const TextField = ({
  name,
  label,
  type,
  className,
  inputClassName,
  required,
  validate,
}) => (
  <FormikField
    name={name}
    validate={validate}
    render={({ field, form }) => {
      return <TextFieldInner
               input={field}
               meta={{ touched: form.touched[name], error: form.errors[name] }}
               name={name}
               type={type}
               required={required}
               className={className}
               inputClassName={inputClassName}
               label={label}
               />
    }}
  />
);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  validate: PropTypes.func,
};

TextField.defaultProps = {
  label: '',
  type: 'text',
  className: '',
  required: false,
  inputClassName: undefined,
  validate: undefined,
};

export default TextField;
