class ProxySubnetsController < ApplicationController
  before_action :find_proxy, :only => [:index, :show, :destroy]

  def index
    subnets = dhcp_status.subnets
    # binding.pry
    # render :partial => 'smart_proxies/plugins/dhcp_subnets', :locals => { :subnets => @subnets }
    @subnets = Subnet.all
    # @subnets = subnets.map { |subnet| Subnet.find_by(:network => subnet.network, :mask => subnet.netmask, :dhcp_id => @smart_proxy.id) }.compact
    # render :json => { :subnets => foreman_subnets }.to_json
  rescue Foreman::Exception => e
    render :json => { :error => e.message }.to_json
    # process_ajax_error e
  end

  def show
    @details = dhcp_status.subnet params[:dhcp_subnet].to_unsafe_h
    binding.pry
    # render :partial => 'smart_proxies/plugins/dhcp_subnet_show'
    render :json => { :mesage => 'I am here' }.to_json
  rescue Foreman::Exception => e
    process_ajax_error e
  end

  def destroy
    if find_record.destroy
      dhcp_status.revoke_cache! 'details'
      @details = dhcp_status.subnet params[:dhcp_subnet]
      render :partial => 'smart_proxies/plugins/dhcp_subnet_show'
    else
      render :json => { :message => (_("Failed to delete Subnet %{subnet} from %{proxy}") % { :subnet => @record.network, :proxy => @smart_proxy })}, :status => 422
    end
  rescue => e
    render :json => { :message => e.message }, :status => 422
  end

  private

  def find_proxy
    @smart_proxy = SmartProxy.find params[:smart_proxy_id]
  end

  def find_record
    @record = Net::DHCP::Record.new params[:record].merge!(:proxy => @smart_proxy.dhcp_api)
  end

  def dhcp_status
    @smart_proxy.statuses[:dhcp]
  end

  # def action_permission
  #   case params[:action]
  #   when 'details'
  #     :view
  #   else
  #     super
  #   end
  # end
end
