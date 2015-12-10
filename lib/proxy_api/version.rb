module ProxyAPI
  class Version < ProxyAPI::Resource
    def initialize(args)
      @url = args[:url] + "/version"
      super args
    end

    def proxy_versions
      parse get
    rescue => e
      raise ProxyException.new(url, e, N_("Unable to detect version"))
    end

    def plugin_versions
      proxy_versions["modules"]
    end

    def version
      proxy_versions["version"]
    end
  end
end
