module FiltersHelper
  def search_path(type)
    if type.nil?
      ''
    else
      case type
        when 'Image'
          '' # images are nested resource for CR, we can't autocomplete
        when 'HostClass'
          '' # host classes is only used in API
        else
          return FiltersHelperOverrides.search_path(type) if FiltersHelperOverrides.can_override?(type)
          resource_path = resource_path(type)
          resource_path.blank? ? "" : (resource_path + auto_complete_search_path)
      end
    end
  end

  def display_link_if_authorized_to_modify(name, options = {}, html_options = {})
    display_if_authorized_to_modify(display_link_if_authorized(name, options, html_options))
  end

  def display_delete_if_authorized_to_modify(options, html_options)
    display_if_authorized_to_modify(display_delete_if_authorized(options, html_options))
  end

  def display_if_authorized_to_modify(markup)
    return unless Filter.can_change_parent_role?
    markup
  end

  def auto_complete_search_path
    '/auto_complete_search'
  end
end
