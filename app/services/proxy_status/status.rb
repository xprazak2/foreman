module ProxyStatus
  class Status
    attr_reader :proxy, :cache_duration

    CONNECTION_ERRORS = [Errno::EINVAL, Errno::ECONNRESET, EOFError, Timeout::Error, Errno::ENOENT,
                       Net::HTTPBadResponse, Net::HTTPHeaderSyntaxError, Net::ProtocolError]

    def initialize(proxy, opts = {})
      @proxy = proxy
      @cache_duration = opts[:cache_duration] || 3.minutes
    end

    def revoke_cache!
      # As memcached does not support delete_matched, we need to delete each
      Rails.cache.delete(versions_cache_key)
      Rails.cache.delete("proxy_#{proxy.id}/tftp_server")
    end

    def versions_cache_key
      "proxy_#{proxy.id}/versions"
    end

    private

    def fetch_proxy_data
      begin
        yield
      rescue *CONNECTION_ERRORS => exception
        raise ::Foreman::WrappedException.new exception, N_("Unable to connect to smart proxy")
      end
    end
  end
end