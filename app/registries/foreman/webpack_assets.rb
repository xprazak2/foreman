module Foreman
  module WebpackAssets
    def bundle_name(plugin_name)
      plugin_name.name.gsub(/-|_|#{plugin_name_regexp}/,'')
    end

    def plugin_name_regexp
      /foreman*|katello*/
    end
  end
end
