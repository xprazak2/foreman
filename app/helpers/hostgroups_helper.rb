module HostgroupsHelper
  include CommonParametersHelper
  include HostsAndHostgroupsHelper

  def warning_message(group)
    msg = [_("Delete %s?") % group.title ]
    if group.has_children?
      msg << _("This group has nested groups!") + "\n"
      msg << _("Please delete all nested groups before deleting it.")
    end
    msg.join("\n")
  end

  def parent_hostgroups
    accessible_hostgroups = accessible_resource_records(:hostgroup, :title).to_a
    if @hostgroup.new_record?
      accessible_hostgroups
    else
      accessible_hostgroups - @hostgroup.descendants - [@hostgroup]
    end
  end

  def user_set_hostgroup?(field)
    return true unless @hostgroup && @hostgroup.parent
    action = params[:action]
    return true if action == 'edit' || action == 'clone' || action == 'nest'
    params[:hostgroup] && params[:hostgroup][:parent_id] && params[:hostgroup][field]
  end

  def inherited_from_parent?(field, hostgroup)
    return false if hostgroup.parent.nil? || hostgroup.ancestry_was.nil?
    return false if params[:action] == 'clone'
    return true unless params[:hostgroup]
    !params[:hostgroup][field]
  end

  def select_hostgroup_field(f, field_name, array, id, method, select_options = {}, html_options = {})
    # binding.pry if field_name == :compute_resource_id
    if @hostgroup && @hostgroup.parent && !@hostgroup.send(field_name) && inherited = @hostgroup.parent.send(inherited_attribute(field_name))
      @hostgroup.send("#{field_name}=", inherited.id)
    end
    select_f f, field_name, array, id, method, select_options, html_options
  end

  def inherited_attribute(field_name)
    field_name.to_s.split('_')[0..-2].join('_').to_sym
  end

  def hostgroup_select_options(field_name)
    {
      :include_blank => true,
      :disable_button => _(HostsAndHostgroupsHelper::INHERIT_TEXT),
      :disable_button_callback => 'setParentAttr',
      :disable_button_enabled => inherited_from_parent?(field_name, @hostgroup),
      :user_set => user_set_hostgroup?(field_name)
    }
  end
end
