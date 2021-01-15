import React from 'react';

import { Popover, OverlayTrigger, Icon } from 'patternfly-react';
import { translate as __ } from '../../../common/I18n';

const OmitHelp = props => {
  const popover = (
    <Popover id='omit-help-popover' title={__("Omit parameter from classification")}>
      {__("Foreman will not send this parameter in classification output.")}
    </Popover>
  );

  return (
    <OverlayTrigger
      overlay={popover}
      placement='top'
      trigger='click'
      rootClose
    >
      <a rel="popover">
        <Icon type="pf" name="info" />
      </a>
    </OverlayTrigger>
  )
}

export default OmitHelp;
