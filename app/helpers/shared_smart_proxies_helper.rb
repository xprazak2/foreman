module SharedSmartProxiesHelper
  def smart_proxy_fields(f, options = {})
    object = options.fetch(:object, f.object)

    safe_join(object.registered_smart_proxies.map do |proxy_name, proxy_options|
      smart_proxy_select_f(f, proxy_name, options.merge(proxy_options))
    end)
  end

  INHERIT_TEXT = N_("inherit")

  def smart_proxy_select_f(f, resource, options)
    required = options.fetch(:required, false)
    hidden = options[:if].present? && !options[:if].call(f.object)
    can_override = options.fetch(:can_override, false)
    override = options.fetch(:override, false)

    proxies = accessible_smart_proxies(f.object, resource, options[:feature])
    return if !required && proxies.blank?

    if f.object.is_a? Hostgroup
      select_options = hostgroup_proxy_select_options(resource)
      select_method = :select_hostgroup_field
    else
      select_options = host_proxy_select_options(resource, override, can_override)
      select_method = :select_f
    end

    public_send select_method, f, :"#{resource}_id", proxies, :id, :name,
      select_options,
      { :label => _(options[:label]),
        :help_inline => _(options[:description]),
        :wrapper_class => "form-group #{'hide' if hidden}"
      }
  end

  def host_proxy_select_options(resource, override, can_override)
    {
      :disable_button => can_override ? _(INHERIT_TEXT) : nil,
      :disable_button_enabled => override && !explicit_value?(:"#{resource}_id"),
      :user_set => user_set?(:"#{resource}_id")
    }
  end

  def hostgroup_proxy_select_options(resource)
    hostgroup_select_options(:"#{resource}_id")
  end

  def accessible_smart_proxies(obj, resource, feature)
    list = accessible_resource_records(:smart_proxy).with_features(feature).to_a
    current = obj.public_send(resource) if obj.respond_to?(resource)
    list |= [current] if current.present?
    list
  end
end
