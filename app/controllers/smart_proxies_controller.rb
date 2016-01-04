class SmartProxiesController < ApplicationController
  include Foreman::Controller::AutoCompleteSearch

  before_filter :find_resource, :only => [:show, :edit, :update, :refresh, :ping, :version, :plugin_version, :tftp_server, :destroy]

  def index
    @smart_proxies = resource_base.includes(:features).search_for(params[:search], :order => params[:order]).paginate(:page => params[:page])
  end

  def show
  end

  def new
    @smart_proxy = SmartProxy.new
  end

  def create
    @smart_proxy = SmartProxy.new(params[:smart_proxy])
    if @smart_proxy.save
      process_success :object => @smart_proxy
    else
      process_error :object => @smart_proxy
    end
  end

  def edit
    @proxy = @smart_proxy
  end

  # def show
  #   render_extensible
  # end

  def ping
    @proxy = @smart_proxy
    respond_to do |format|
      format.json {render :json => errors_hash(@smart_proxy.refresh)}
    end
  end

  def refresh
    old_features = @smart_proxy.features
    if @smart_proxy.refresh.blank? && @smart_proxy.save
      delete_cached_versions
      msg = @smart_proxy.features == old_features ? _("No changes found when refreshing features from %s.") : _("Successfully refreshed features from %s.")
      process_success :object => @smart_proxy, :success_msg => msg % @smart_proxy.name
    else
      process_error :object => @smart_proxy
    end
  end

  def version
    Rails.cache.fetch("proxy_#{@smart_proxy.id}/version", :expires_in => 3.minutes) do
      requested_data(:version)
    end
  end

  def plugin_version
    plugin_name = params[:plugin]
    render :json => {:success => false, :message => _('Plugin name cannot be blank')} and return if plugin_name.blank?
    Rails.cache.fetch("proxy_#{@smart_proxy.id}/#{plugin_name}/version", :expires_in => 3.minutes) do
      requested_data(:plugin_version, plugin_name)
    end
  end

  def tftp_server
    requested_data(:tftp_server)
  end

  def update
    if @smart_proxy.update_attributes(params[:smart_proxy])
      process_success :object => @smart_proxy
    else
      process_error :object => @smart_proxy
    end
  end

  def destroy
    if @smart_proxy.destroy
      process_success :object => @smart_proxy
    else
      process_error :object => @smart_proxy
    end
  end

  private

  def requested_data(data_name, param = nil)
    data = param.nil? ? @smart_proxy.public_send(data_name) : @smart_proxy.public_send(data_name, param)
    render :json => {:success => true, :message => data}
  rescue Foreman::Exception => exception
    render :json => {:success => false, :message => exception.message} and return
  end

  def delete_cached_versions
    return true if Rails.env.test?
    # As memcached does not support delete_matched, we need to delete each
    Rails.cache.delete("proxy_#{@smart_proxy.id}/version")
    @smart_proxy.features.pluck('LOWER(name)').each do |feature|
      Rails.cache.delete("proxy_#{@smart_proxy.id}/#{feature}/version")
    end
  end

  def action_permission
    case params[:action]
      when 'refresh'
        :edit
      when 'ping', 'version', 'plugin_version', 'tftp_server'
        :view
      else
        super
    end
  end
end
