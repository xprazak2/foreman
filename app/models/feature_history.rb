class FeatureHistory < ActiveRecord::Base
  belongs_to :smart_proxy, :inverse_of => :feature_histories
  belongs_to :feature, :inverse_of => :feature_histories
end