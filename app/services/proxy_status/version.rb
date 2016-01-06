module ProxyStatus
  class Version < Status
    def initialize(proxy, opts = {})
      @api ||= ProxyAPI::Version.new(:url => proxy.url)
      super proxy, opts
    end

    def api_versions
      Rails.cache.fetch(versions_cache_key, :expires_in => cache_duration) do
        fetch_proxy_data do
          api.proxy_versions
        end
      end
    end

    alias_method :version, :api_versions

  end
end