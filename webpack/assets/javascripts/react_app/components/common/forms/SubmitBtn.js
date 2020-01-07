import React from 'react';
import { Button } from 'patternfly-react';
import { translate as __ } from '../../../../react_app/common/I18n';
import { simpleLoader } from '../Loader';

const SubmitBtn = ({ disabled, submitting }) => (
  <Button bsStyle="primary" type="submit" disabled={disabled || submitting}>
    &nbsp;
    {__('Submit')}
    {submitting && <span className="fr">{simpleLoader('sm')}</span>}
  </Button>
);

export default SubmitBtn;
