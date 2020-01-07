import React from 'react';
import { Button } from 'patternfly-react';
import { translate as __ } from '../../../../react_app/common/I18n';

const CancelBtn = ({ onCancel, submitting }) => (
  <Button bsStyle="default" onClick={onCancel} disabled={submitting}>
    {__('Cancel')}
  </Button>
);

export default CancelBtn;
