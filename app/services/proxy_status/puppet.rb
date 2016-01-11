module ProxyStatus
  class Puppet < Status
    def initialize(proxy, opts = {})
      @api ||= ProxyAPI::Puppet.new(:url => proxy.url)
      super proxy, opts
    end

    def puppet_status
      # Rails.cache.fetch(versions_cache_key, :expires_in => cache_duration) do
        fetch_proxy_data do
          @api.status
        end
      # end
    end

    def last_puppet_report
      ConfigReport.where(:host_id => Host.where(:puppet_proxy_id => proxy.id)).order(:reported_at => :desc).limit(1).first
    end
  end
end