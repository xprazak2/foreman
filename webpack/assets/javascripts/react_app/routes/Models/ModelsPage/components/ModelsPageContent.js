import React from 'react';

import ModelsTable from '../../../../components/ModelsTable'

const ModelsPageContent = props => {
  return (
    <ModelsTable results={props.models} />
  );
}

export default ModelsPageContent;
