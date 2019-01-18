class CorruptFilters < ActiveRecord::Migration[5.2]
  def up
    Permission.where(:name => %w[view_arf_reports])
              .update_all(:resource_type => nil)

    Permission.where(:name => %w[view_ansible_variables])
              .update_all(:resource_type => 'ForemanOpenscap::ScapContent')

  end

  def down
    Permission.where(:name => %w[view_arf_reports])
              .update_all(:resource_type => 'ForemanOpenscap::ArfReport')

    Permission.where(:name => %w[view_ansible_variables])
              .update_all(:resource_type => 'AnsibleVariable')
  end
end
