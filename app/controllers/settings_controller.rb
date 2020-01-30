class SettingsController < Api::V2::BaseController
  include Foreman::Controller::AutoCompleteSearch

  # This can happen in development when removing a plugin
  rescue_from ActionView::Template::Error do |e|
    type = (e.to_s =~ /\'(Setting::.*)\'\./) ? Regexp.last_match(1) : 'STI-Type'
    render :json => { :type => "Run \"Setting.where(:category=>'#{type}').delete_all\" to recover.", :text => e.to_s }, :status => :internal_server_error
  end

  def all_settings
    @settings = resource_scope().live_descendants.search_for(*search_options)
    render :all_settings, :layout => 'api/v2/layouts/index_layout'
  end
end
