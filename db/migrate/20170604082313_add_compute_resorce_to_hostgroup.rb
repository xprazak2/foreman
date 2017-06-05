class AddComputeResorceToHostgroup < ActiveRecord::Migration
  def up
    add_column :hostgroups, :compute_resource_id, :integer
  end

  def down
    remove_column :hostgroups, :compute_resource_id
  end
end
