import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { noop } from '../../../common/helpers';
import Form from '../../common/forms/Form';
import ForemanForm from '../../common/forms/ForemanForm';
import TextField from '../../common/forms/TextField';
import * as FormActions from '../../../redux/actions/common/forms';
import { translate as __ } from '../../../../react_app/common/I18n';
import { errorsToSentence, maxLengthMsg, requiredMsg } from '../../common/forms/validators';

const prepareErrors = errors =>
  Object.keys(errors).reduce((memo, key) => {
    const errorMessages = errors[key]
    memo[key] = errorMessages ? errorMessages.join(', ') : errorMessages;
    return memo;
  },
  {}
)

const bookmarksFormSchema = Yup.object().shape({
  name: Yup.string().max(...maxLengthMsg(254)).required(requiredMsg()),
  query: Yup.string().max(...maxLengthMsg(4096)).required(requiredMsg())
});

const BookmarkForm = ({ url, submitForm, controller, onCancel, initialValues }) => (
  <ForemanForm
    submitValues={(values) => ({url, values: { ...values, controller }, item: 'Bookmark' })}
    submitForm={submitForm}
    initialValues={initialValues}
    validationSchema={bookmarksFormSchema}
    onCancel={onCancel}
  >
    <TextField
      name="name"
      type="text"
      required="true"
      label={__('Name')}
    />
    <TextField
      name="query"
      type="textarea"
      required="true"
      label={__('Query')}
      inputClassName="col-md-8"
    />
    <TextField name="publik" type="checkbox" label={__('Public')} />
  </ForemanForm>
);

BookmarkForm.propTypes = {
  submitting: PropTypes.bool,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

BookmarkForm.defaultProps = {
  submitting: false,
  error: undefined,
  handleSubmit: noop,
  onCancel: noop,
};

export default connect(
  ({ bookmarks }) => ({
    initialValues: { publik: true, query: bookmarks.currentQuery || '', name: '' },
  }),
  FormActions
)(BookmarkForm);
