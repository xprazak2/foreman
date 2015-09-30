class AddLogCategory < ActiveRecord::Migration
  def up
    add_column :logs, :category, :string, :default => "core"
  end

  def down
    remove_column :logs, :category
  end
end
