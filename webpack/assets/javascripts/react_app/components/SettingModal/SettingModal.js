import React from 'react';
import PropTypes from 'prop-types';

import { sprintf, translate as __ } from '../../../../common/I18n';

import ForemanModal from '../../../../components/ForemanModal';
import SettingForm from './SettingForm';

import { SETTING_MODAL } from './SettingModalConstants';

const SettingModal = ({ setting, setModalClosed }) => (
  <ForemanModal
    id={SETTING_MODAL}
    title={sprintf(__('Update value for %s setting'), setting.fullName)}
    enforceFocus
  >
    <div>
      <SettingForm setting={setting} setModalClosed={setModalClosed} />
    </div>
  </ForemanModal>
);

SettingModal.propTypes = {
  setting: PropTypes.object.isRequired,
  setModalClosed: PropTypes.func.isRequired,
};

export default SettingModal;