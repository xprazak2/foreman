import React from 'react';
import CommonForm from './CommonForm';
// import { head } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
// import { Field } from 'redux-form';
// import '../../../common/reduxFormI18n';
// onChange, disabled = false, , value = '', checked = false

// class RadioButtonGroup extends React.Component {
//   constructor(props) {
//     super(props)
//     if (!props.radios || !head(props.radios)) {
//       throw new Error('RadioButtonGroup should have non-empty "radios" prop');
//     }
//     this.state = { selectedOptionValue: head(props.radios).value }
//   }

//   handleOptionChange(handleChange) {
//     return (changeEvent) => {
//       handleChange();
//       console.log(this);
//       this.setState({ selectedOptionValue: changeEvent.target.value })
//     }
//   }

//   render() {
//     const { controlLabel, radios, className = '', inputClassName = 'col-md-6' } = this.props;

//     return (<CommonForm label={controlLabel} className={className} inputClassName={inputClassName}>
//               {radios.map((item, index) => (
//                 <label className='radio-inline' key={item.value}>
//                   <input type="radio" value={item.value} disabled={item.disabled} onChange={item.onChange} checked={this.state.selectedOptionValue === item.value}/>
//                   { item.label }
//                 </label>))
//               }
//             </CommonForm>);
//   }
// }
const RadioButtonGroup = ({ controlLabel,  radios, name, className = '', inputClassName = 'col-md-6', checkIdx = -1 }) => {
  const defaultChecked = (idx) => idx === checkIdx;

  return (<CommonForm label={controlLabel} className={className} inputClassName={inputClassName}>
    {radios.map((item, index) => (
      <label className='radio-inline' key={item.value}>
        <Field name={name} component="input" type="radio" value={item.value} onChange={item.onChange} />
        { item.label }
      </label>))
    }
  </CommonForm>)
};

// const RadioButtonGroup = ({
//   controlLabel,
//   radios,
//   name,
//   className = '',
//   inputClassName = 'col-md-6',
//   checkIdx = -1
// }) => (
//   <Field
//     name={name}
//     component={renderRadioButtonGroup}
//     className={className}
//     inputClassName={inputClassName}
//     controlLabel={controlLabel}
//     radios={radios}
//     checkIdx={checkIdx}
//   />
// );

RadioButtonGroup.propTypes = {
  controlLabel: PropTypes.string.isRequired,
  radios: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })),
  name: PropTypes.string
}

export default RadioButtonGroup;
