module ReactjsHelper
  def mount_react_component(name, selector, data = [])
    javascript_tag defer: 'defer' do
      "$(tfm.reactMounter.mount('#{name}', '#{selector}', #{data}));".html_safe
    end
  end

  def register_plugin_components

    webpacked_plugins = Foreman::Plugin.registered_plugins.keys.detect do |plugin|
      plugin_class_name = plugin.name.to_s.gsub('-', '_').camelize
      "#{plugin_class_name}::Engine".constantize.root.join('/webpack/index.js').exist?
    end
    bundle_names = webpacked_plugins.map { |plugin_name| Foreman::Plugin.bundle_name plugin_name }

    javascript_tag :defer => 'defer' do
      "tfm.pluginComponents.register(#{bundle_names});".html_safe
    end
  end
end
