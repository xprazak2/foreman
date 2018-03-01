import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormControl, InputGroup, Button } from 'patternfly-react';
import { first } from 'lodash';


import CommonForm from './CommonForm';

const TextButtonField = ({
  item, label, name, className = '', inputClassName = 'col-md-6', blank = { label: "Choose one...", value: "" },
}) =>
(
  <CommonForm label={label} className={className} inputClassName={inputClassName}>
    <InputGroup>
      <Field name={name} component={fieldType(item)} blank={blank} item={item}></Field>
      <InputGroup.Button>
        <Button>Click me!</Button>
      </InputGroup.Button>
    </InputGroup>
  </CommonForm>
);

const fieldType = (item) => Object.keys(item.selection).length === 0 ? InputField : SelectField;

const InputField = ({ input, item }) =>
  <FormControl { ...input } type="text"></FormControl>

const SelectField = ({ input, blank, item }) =>
  <FormControl { ...input } componentClass="select">
    { addBlankOption(blank) }
    { item.selection.map((opt) => <option value={opt.value}>{opt.label}</option>) }
  </FormControl>

const addBlankOption = (blank) => {
  if (Object.keys(blank).length === 0) {
    return;
  } else {
    return <option value={blank.value}>{blank.label}</option>;
  }
}

export default TextButtonField;
