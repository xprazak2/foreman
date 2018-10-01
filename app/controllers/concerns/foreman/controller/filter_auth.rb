module Foreman::Controller::FilterAuth
  extend ActiveSupport::Concern

  included do
    before_action :authorized_to_modify_roles
  end

  private

  def authorized_to_modify_roles
    unless Filter.can_change_parent_role?
      @missing_permissions = [Foreman::AccessControl.permission(:edit_roles)]
      deny_access('Missing one of the required permissions: edit_roles')
    end
  end
end
