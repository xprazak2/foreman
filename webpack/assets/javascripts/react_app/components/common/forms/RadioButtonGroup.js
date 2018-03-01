import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Radio } from 'patternfly-react';
import CommonForm from './CommonForm';

const RadioButtonGroup = ({
  controlLabel, radios, name, className = '', inputClassName = 'col-md-6',
}) =>
  <CommonForm label={controlLabel} className={className} inputClassName={inputClassName}>
    {radios.map((item, index) => (
         <Field name={name} component={Button} item={item} />
      ))
    }
  </CommonForm>;

const Button = ({ input, item }) =>
    <Radio { ...input } inline={true} title={item.label} checked={item.checked} value={item.value}>{item.label}</Radio>;

RadioButtonGroup.propTypes = {
  controlLabel: PropTypes.string.isRequired,
  radios: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
  name: PropTypes.string,
};

export default RadioButtonGroup;
