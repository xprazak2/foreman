class ConvertVmAttrsToHash < ActiveRecord::Migration[5.1]
  def up
    transform :to_h
  end

  def down
    transform :to_params
  end

  def transform(transform_method)
    say "Starting serialized attributes conversion, this can take long time based on data amount"
    say "Converting Nics"
    transform_batch_columns(Nic::Base, [:attrs, :compute_attributes], transform_method)
    say "Converting Compute Attributes"
    transform_batch_columns(ComputeAttribute, [:vm_attrs], transform_method)
    say "Converting Compute Resources"
    transform_batch_columns(ComputeResource, [:attrs], transform_method)
    say "Converting Reports"
    transform_batch_columns(Report, [:metrics], transform_method)
    say "Converting Lookup Keys"
    transform_batch_columns(LookupKey, [:default_value], transform_method)
    say "Converting Lookup Values"
    transform_batch_columns(LookupValue, [:value], transform_method)
    say "All conversions finished"
  end

  def transform_batch_columns(base, serialized_columns, transform_method)
    base.unscoped.find_each  do |object|
      serialized_columns.each do |column|
        attributes = object.send :read_attribute_before_type_cast, column
        next if attributes.nil?
        new_attributes = send(transform_method, attributes)
        object.update_column(column, new_attributes) if new_attributes != attributes
      end
    end
  end

  def to_h(attr)
    attr.gsub(yml_params_hash, yml_hash).gsub(yml_params_obj, yml_hash)
  end

  def to_params(attr)
    attr.gsub(yml_hash, yml_params_hash)
  end

  def yml_hash
    '!ruby/hash:ActiveSupport::HashWithIndifferentAccess'
  end

  def yml_params_hash
    '!ruby/hash:ActionController::Parameters'
  end

  def yml_params_obj
    '!ruby/object:ActionController::Parameters'
  end
end
