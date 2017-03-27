module Foreman
  class Plugin
    class RoleLock
      attr_reader :plugin_id

      def initialize(plugin_id)
        @plugin_id = plugin_id
      end

      def register_role(name, permissions, role_registry)
        Role.transaction do
          role = process_role name, permissions
          role.ignore_locking do |r|
            r.add_permissions!(permissions)
          end
          role_registry.role_ids << role.id
        end
      end

      def process_role(name, permissions)
        role = Role.find_by :name => name
        if role && role.permission_diff(permissions).empty?
          role.update_attribute :origin, @plugin_id if role.origin.empty?
        elsif role
          role = rename_and_create role, name, permissions
        else
          role = create_plugin_role name, permissions
        end
        role
      end

      def rename_and_create(role, original_name, permissions)
        rename_existing role, original_name
        create_plugin_role original_name, permissions
      end

      def create_plugin_role(name, permissions)
        Role.ignore_locking do
          role = Role.create! :name => name, :origin => @plugin_id
          role.add_permissions!(permissions)
          role
        end
      end

      def rename_existing(role, original_name)
        prefix = "Customized"
        role_name = generate_name prefix, original_name
        if Role.find_by(:name => role_name)
          num = 1
          role_name = generate_name prefix, original_name, num
          while Role.find_by :name => role_name
            role_name = generate_name prefix, original_name, num
            num += 1
          end
        end
        role.update_attribute :name, role_name
      end

      def generate_name(prefix, original_name, num = nil)
        new_name = "#{prefix} #{original_name}"
        num ? new_name << " #{num}" : new_name
      end
    end
  end
end
