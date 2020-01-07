import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import SubmitBtn from './SubmitBtn';
import CancelBtn from './CancelBtn';

import { noop } from '../../../common/helpers';
import { simpleLoader } from '../Loader';
import { translate as __ } from '../../../../react_app/common/I18n';

const FormActions = ({ onCancel, disabled, submitting }) => (
  <div className="clearfix">
    <div className="form-actions">
      <SubmitBtn disabled={disabled} submitting={submitting} />
      {' ' /* adds whitespace between the buttons */}
      <CancelBtn onCancel={onCancel} disabled={submitting} />
    </div>
  </div>
);

FormActions.propTypes = {
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
  onCancel: PropTypes.func,
};

FormActions.defaultProps = {
  disabled: false,
  submitting: false,
  onCancel: noop,
};

export default FormActions;
