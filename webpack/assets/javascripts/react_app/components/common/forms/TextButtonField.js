import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormControl, InputGroup, Button } from 'patternfly-react';
import { first } from 'lodash';

import CommonForm from './CommonForm';

const TextButtonField = ({
  item, label, name, className = '', inputClassName = 'col-md-6', blank = { "": "Choose one..." },
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
    { Object.entries(item.selection).map(([key, value]) => <option value={key}>{value}</option>) }
  </FormControl>

const addBlankOption = (blank) => {
  if (Object.keys(blank).length === 0) {
    return;
  } else {
    const key = first(Object.keys(blank))
    return <option value={key}>{blank[key]}</option>;
  }
}

export default TextButtonField;
