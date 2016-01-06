module ProxyStatus
  class Tftp < Status
    def tftp_server
      raise ::Foreman::Exception.new(N_('No TFTP feature for %s') % proxy.to_label) unless proxy.has_feature?('TFTP')
      Rails.cache.fetch("proxy_#{proxy.id}/tftp_server", :expires_in => cache_duration) do
        fetch_proxy_data do
          ProxyAPI::TFTP.new(:url => proxy.url).bootServer
        end
      end
    end
  end
end