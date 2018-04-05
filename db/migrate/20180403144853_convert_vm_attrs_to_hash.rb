class ConvertVmAttrsToHash < ActiveRecord::Migration[5.1]
  def up
    transform :to_h
  end

  def down
    transform :to_params
  end

  YML_HASH = '!ruby/hash:ActiveSupport::HashWithIndifferentAccess'
  YML_PARAMS_HASH = '!ruby/hash:ActionController::Parameters'
  YML_PARAMS_OBJ = '!ruby/object:ActionController::Parameters'
  YML_PARAMS_IVARS = '!ruby/hash-with-ivars:ActionController::Parameters'

  def transform(transform_method)
    say "Starting serialized attributes conversion, this can take long time based on data amount"
    say "Converting Nics, total: #{FakeNic.unscoped.count}"
    transform_batch_columns(FakeNic, [:attrs, :compute_attributes], transform_method)

    say "Converting Compute Attributes, total: #{FakeComputeAttribute.unscoped.count}"
    transform_batch_columns(FakeComputeAttribute, [:vm_attrs], transform_method)

    say "Converting Compute Resources, total #{FakeComputeResource.unscoped.count}"
    transform_batch_columns(FakeComputeResource, [:attrs], transform_method)

    say "Converting Lookup Keys, total: #{FakeLookupKey.unscoped.count}"
    transform_batch_columns(FakeLookupKey, [:default_value], transform_method)

    say "Converting Lookup Values, total: #{FakeLookupValue.unscoped.count}"
    transform_batch_columns(FakeLookupValue, [:value], transform_method)

    say "All conversions finished"
  end

  def transform_batch_columns(base, serialized_columns, transform_method)
    base.unscoped.select(serialized_columns).find_each  do |object|
      serialized_columns.each do |column|
        attributes = object.send :read_attribute_before_type_cast, column
        next if attributes.nil?
        new_attributes = send(transform_method, attributes)
        object.update_column(column, new_attributes) if new_attributes != attributes
      end
    end
  end

  def to_h(attr)
    attr.gsub!(YML_PARAMS_HASH, YML_HASH).gsub!(YML_PARAMS_OBJ, YML_HASH).gsub!(YML_PARAMS_IVARS, YML_HASH)
  end

  def to_params(attr)
    attr.gsub!(YML_HASH, YML_PARAMS_HASH)
  end

  class FakeNic < ApplicationRecord
    self.table_name = 'nics'
    self.inheritance_column = nil
  end

  class FakeReport < ApplicationRecord
    self.table_name = 'reports'
    self.inheritance_column = nil
  end

  class FakeComputeAttribute < ApplicationRecord
    self.table_name = 'compute_attributes'
  end

  class FakeComputeResource < ApplicationRecord
    self.table_name = 'compute_resources'
    self.inheritance_column = nil
  end

  class FakeLookupValue < ApplicationRecord
    self.table_name = 'lookup_values'
  end

  class FakeLookupKey < ApplicationRecord
    self.table_name = 'lookup_keys'
    self.inheritance_column  = 'nil'
  end
end
