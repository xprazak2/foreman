import React from 'react';

export default (props) => {
  const taggedComponents = props.componentRegistry.namesByTag('HostParameters');
  return (<div>
    {
      taggedComponents.map((name) => {
        return (<div key={name}>{ props.componentRegistry.markup(name, props.data, props.store) }</div>);
      })
    }
  </div>);
};
