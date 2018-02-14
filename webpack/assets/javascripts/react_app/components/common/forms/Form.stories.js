import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { connect, Provider } from 'react-redux';

import RadioButtonGroup from './RadioButtonGroup';
import Store from '../../../redux';
import Form from './Form';

const formName = 'storybookForm';

const StoryForm = () => {
  const radios = [
    {
      label: 'Yes', value: 'yes',
    },
    {
      label: 'No', value: 'no',
    },
    {
      label: 'Do Not Know', value: 'dnk',
    },
  ];

  return (
    <Form>
      <RadioButtonGroup name="steak" controlLabel="Would you like a steak?" radios={radios}/>
    </Form>
  );
};

const storyForm = reduxForm({ form: formName })(StoryForm);
const ConnectedForm = connect(null, () => {})(storyForm);

storiesOf('Form', module)
  .addDecorator(getStory => <Provider store={Store}>{getStory()}</Provider>)
  .add('Radio Button Group', () => <ConnectedForm />);
