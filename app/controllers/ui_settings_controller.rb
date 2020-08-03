class UiSettingsController < ::Api::V2::BaseController
  include Foreman::Controller::SettingUpdateCommon

  before_action :find_resource, :only => %w{update}

  def resource_class
    @resource_class = Setting
  end

  def resource_name
    "setting"
  end
end
