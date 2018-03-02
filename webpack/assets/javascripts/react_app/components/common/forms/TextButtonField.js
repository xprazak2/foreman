import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormControl, InputGroup, Button, Checkbox } from 'patternfly-react';
import { first } from 'lodash';
import TextField from 'foremanReact/components/common/forms/TextField';


import CommonForm from './CommonForm';

const TextButtonField = ({
  item,
  label,
  name,
  className = '',
  inputClassName = 'col-md-6',
  blank = { label: "Choose one...", value: "" },
  buttonAttrs: { buttonText = "Action", buttonAction },
  fieldSelector
}) => (
  <CommonForm label={label} className={className} inputClassName={inputClassName}>
    <InputGroup>
      <Field name={name} type={fieldSelector(item)} component={fieldType(item, fieldSelector)} blank={blank} item={item}></Field>
      <InputGroup.Button>
        <Button onClick={buttonAction}>{ buttonText }</Button>
      </InputGroup.Button>
    </InputGroup>
  </CommonForm>
);

const fieldType = (item, fieldSelector) => {
  if (!fieldSelector) {
    return InputField;
  }

  switch (fieldSelector(item)) {
    case "text":
      return InputField;
    case "select":
      return SelectField;
    case "checkbox":
      return CheckboxField;
    default:
      throw new Error(`Unknown field type for ${item}`);
  }
}

const InputField = ({ input }) =>
  <FormControl { ...input } type="text"></FormControl>

const SelectField = ({ input, blank, item }) =>
  <FormControl { ...input } componentClass="select">
    { addBlankOption(blank) }
    { item.selection.map((opt) => <option value={opt.value}>{opt.label}</option>) }
  </FormControl>

const CheckboxField = ({ input, item }) => {
  console.log(item)
  return <Checkbox { ...input }></Checkbox>
}

const addBlankOption = (blank) => {
  if (Object.keys(blank).length === 0) {
    return;
  } else {
    return <option value={blank.value}>{blank.label}</option>;
  }
}

export default TextButtonField;
