import React from 'react';

import SubmitBtn from './SubmitBtn';
import CancelBtn from './CancelBtn';

import { connect } from 'react-redux';
import { submitModal } from '../../../redux/actions/common/forms';


const SubmitOrCancel = ({ submitting, disabled, onCancel, submitProps, submitModal, onSubmitStart, onSubmitStop }) => {
  const onSubmit = () =>
    submitModal({
      ...submitProps,
      closeFn: onCancel,
      onSubmitStart,
      onSubmitStop,
    });

  return (
    <React.Fragment>
        <SubmitBtn disabled={disabled} submitting={submitting} onSubmit={onSubmit} />
        {' ' /* adds whitespace between the buttons */}
        <CancelBtn onCancel={onCancel} disabled={submitting} />
    </React.Fragment>
  )
};


// export default SubmitOrCancel;
export default connect(null, { submitModal })(SubmitOrCancel);
