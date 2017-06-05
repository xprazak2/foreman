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
    return false unless hostgroup.parent && hostgroup.ancestry_was.nil?
    return false if params[:action] == 'clone'
    return true unless params[:hostgroup]
    !params[:hostgroup][field]
  end

  def select_hostgroup_field(f, field_name, array, id, method, select_options = {}, html_options = {})
    if @hostgroup && @hostgroup.parent && !@hostgroup.send(field_name) && @hostgroup.new_record?
      @hostgroup.send("#{field_name}=", @hostgroup.parent.send(field_name))
    end
    select_f f, field_name, array, id, method, select_options, html_options
  end

  def hostgroup_select_options(field_name)
    {
      :include_blank => true,
      :disable_button => _(HostsAndHostgroupsHelper::INHERIT_TEXT),
      :disable_button_enabled => inherited_from_parent?(field_name, @hostgroup),
      :user_set => user_set_hostgroup?(field_name)
    }
  end
end
