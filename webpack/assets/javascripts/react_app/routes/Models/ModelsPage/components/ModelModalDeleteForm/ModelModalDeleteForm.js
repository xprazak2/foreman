import React from 'react';

import ForemanForm from '../../../../../components/common/forms/ForemanForm';

const ModelModalDeleteForm = props => {

  return (
    <React.Fragment>
      <div>{ `You are about to delete ${props.toDelete && props.toDelete.name}. Are you sure?`}</div>
      <ForemanForm
        onSubmit={() =>
          props.submitForm({
            url: props.url,
            values: {},
            item: 'Model',
            message: 'Hardware model was successfully created',
            method: 'delete'
          })
        }
      >
      </ForemanForm>
      </React.Fragment>
  )
}

export default ModelModalDeleteForm;
