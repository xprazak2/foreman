module ReactjsHelper
  def mount_react_component(name, selector, data = [], opts = {})
    javascript_tag defer: 'defer' do
      "$(tfm.reactMounter.mount('#{name}', '#{selector}', #{data}, #{opts[:flatten_data] || false}));".html_safe
    end
  end

  def webpacked_plugins_js_for(*plugin_names)
    js_tags_for(select_requested_plugins(plugin_names)).join.html_safe
  end

  def webpacked_plugins_css_for(*plugin_names)
    css_tags_for(select_requested_plugins(plugin_names)).join.html_safe
  end

  def webpacked_plugins_assets_for(*plugin_names)
  end

  def select_requested_plugins(plugin_names)
    available_plugins = Foreman::Plugin.with_webpack.map(&:id)
    missing_plugins = plugin_names - available_plugins
    if missing_plugins.any?
      logger.error { "Failed to include webpack assets for plugins: #{missing_plugins}" }
      raise ::Foreman::Exception.new("Failed to include webpack assets for plugins: #{missing_plugins}") if Rails.env.development?
    end
    plugin_names & available_plugins
  end

  def js_tags_for(requested_plugins)
    requested_plugins.map do |plugin|
      javascript_include_tag(*webpack_asset_paths(plugin.to_s, :extension => 'js'), "data-turbolinks-track" => true)
    end
  end

  def css_tags_for(requested_plugins)
    requested_plugins.map do |plugin|
      stylesheet_link_tag(*webpack_asset_paths(plugin.to_s, :extension => 'css'))
    end
  end

  def add_react_js_for(page_name)
    plugins = Foreman::Plugin.with_webpack.select { |plugin| plugin.react_js_page_extensions.include? page_name}.map(&:id)
    js_tags_for(plugins).join.html_safe
  end

  def add_react_css_for(page_name)
    plugins = Foreman::Plugin.with_webpack.select { |plugin| plugin.react_js_page_extensions.include? page_name}.map(&:id)
    css_tags_for(plugins).join.html_safe
  end

  def add_react_assets_for(page_name)
    #todo: compose previous two?
  end
end
