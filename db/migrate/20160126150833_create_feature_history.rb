class CreateFeatureHistory < ActiveRecord::Migration
  def up
    create_table :feature_histories do |t|
      t.integer "smart_proxy_id", :null => false
      t.integer "feature_id", :null => false
      t.datetime "created_at", :null => false
      t.datetime "updated_at", :null => false
    end
  end

  def down
    drop_table :feature_histories
  end
end
