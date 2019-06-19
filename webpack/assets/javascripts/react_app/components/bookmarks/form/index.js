import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';

import { noop } from '../../../common/helpers';
import Form from '../../common/forms/Form';
import TextField from '../../common/forms/TextField';
import * as FormActions from '../../../redux/actions/common/forms';
import { translate as __ } from '../../../../react_app/common/I18n';
import { required, maxLength, errorsToSentence } from '../../common/forms/validators';

const prepareErrors = errors =>
  Object.keys(errors).reduce((memo, key) => {
    const errorMessages = errors[key]
    memo[key] = errorMessages ? errorMessages.join(', ') : errorMessages;
    return memo;
  },
  {}
)

const BookmarkForm = ({ url, submitForm, controller, onCancel, initialValues }) => (
  <Formik
    onSubmit={(values, actions) => {
      try {
        submitForm({ url, values: { ...values, controller }, item: 'Bookmark' })
      } catch(exception) {
        actions.setSubmitting(false);
        actions.setErrors(prepareErrors(exception.errors));
      };
    }}
    initialValues={initialValues}
  >
    {({ handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          onCancel={onCancel}
          disabled={isSubmitting}
          submitting={isSubmitting}
        >
          <TextField
            name="name"
            type="text"
            required="true"
            label={__('Name')}
            validate={errorsToSentence(required, maxLength(254))}
          />
          <TextField
            name="query"
            type="textarea"
            required="true"
            label={__('Query')}
            inputClassName="col-md-8"
            validate={errorsToSentence(required, maxLength(4096))}
          />
          <TextField name="publik" type="checkbox" label={__('Public')} />
        </Form>
      )
    }
  </Formik>
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
