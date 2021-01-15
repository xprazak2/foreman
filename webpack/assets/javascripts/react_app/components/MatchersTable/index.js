import React from 'react';

import { Popover, OverlayTrigger, Icon } from 'patternfly-react';
import classNames from 'classnames';
import { translate as __ } from '../../common/I18n';

import OmitHelp from './components/OmitHelp';
import AddMatcherBtn from './components/AddMatcherBtn';
// import OmitHelp from './components/OmitHelp';

const WrappedMatchersTable = props => {
  console.log(props);


  const popover = (
    <Popover id={props.lookupKey.id} title={__("Explain matchers")}>
      { __("Matcher is a combination of an attribute and its value, if they match, the value below would be provided.")}
      <br></br>
      { __("You may use any attribute Foreman knows about, such as facts etc for example: ")}
      <code> domain = example.com </code> {__('or')}
      <code> is_virtual = true </code>
    </Popover>
  );

  let headers = null;

  if (props.isParam) {
    headers = (
      <React.Fragment>
        <th className='col-md-4'>{ __('Value')}</th>
        <th className='col-md-2 ca'>{__('Omit')}
          <span className="help-inline"><OmitHelp /></span>
        </th>
      </React.Fragment>
    )
  } else {
    headers = <th className='col-md-6'>{__('Value')}</th>
  }

  return (
    <React.Fragment>
      <table className={classNames('table white-header', { hidden: props.lookupValues.length === 0 })}>
        <thead>
          <tr>
            <th colSpan="2" className="col-md-5">
              {__('Attribute Type ')}
              <span className="help-inline">
                <OverlayTrigger
                  overlay={popover}
                  placement='top'
                  trigger={'click'}
                  rootClose
                >
                <a rel="popover">
                  <Icon type="pf" name="info" />
                </a>
                </OverlayTrigger>
              </span>
            </th>
            {headers}
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default WrappedMatchersTable;
