module Foreman::Controller::SettingUpdateCommon
  extend ActiveSupport::Concern

  def update
    value = params[:setting][:value]
    type = value.class.to_s.downcase
    if type == "trueclass" || type == "falseclass"
      type = "boolean"
    end
    case type
    when "nilclass"
      render_error :custom_error, :status => :unprocessable_entity, :locals => { :message => _("No setting value provided.") }
    when "string"
      process_response (@setting.parse_string_value(value) && @setting.save)
    when @setting.settings_type
      @setting.value = value
      process_response @setting.save
    else
      render_error :custom_error, :status => :unprocessable_entity, :locals => { :message => _("expected a value of type %s") % @setting.settings_type}
    end
  end
end
