import React from 'react';

import SubmitBtn from './SubmitBtn';
import CancelBtn from './CancelBtn';

const SubmitOrCancel = ({ submitting, disabled, onCancel }) => (
  <React.Fragment>
    <SubmitBtn disabled={disabled} submitting={submitting} />
    {' ' /* adds whitespace between the buttons */}
    <CancelBtn onCancel={onCancel} disabled={submitting} />
  </React.Fragment>
);

export default SubmitOrCancel;
