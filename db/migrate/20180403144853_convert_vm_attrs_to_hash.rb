class ConvertVmAttrsToHash < ActiveRecord::Migration[5.1]
  def up
    transform :to_h
  end

  def down
    transform :to_params
  end

  def transform(transform_method)
    say "Starting serialized attributes conversion, this can take long time based on data amount"
    say "Converting Nics, total: #{Nic::Base.unscoped.count}"
    start = Time.now
    transform_batch_columns(Nic::Base, [:attrs, :compute_attributes], transform_method)
    say "Took: #{Time.now - start}"

    say "Converting Compute Attributes, total: #{ComputeAttribute.unscoped.count}"
    start = Time.now
    transform_batch_columns(ComputeAttribute, [:vm_attrs], transform_method)
    say "Took: #{Time.now - start}"

    say "Converting Compute Resources, total #{ComputeResource.unscoped.count}"
    start = Time.now
    transform_batch_columns(ComputeResource, [:attrs], transform_method)
    say "Took: #{Time.now - start}"

    say "Converting Reports, total: #{Report.unscoped.count}"
    start = Time.now
    transform_batch_columns(Report, [:metrics], transform_method)
    say "Took: #{Time.now - start}"

    say "Converting Lookup Keys, total: #{LookupKey.unscoped.count}"
    start = Time.now
    transform_batch_columns(LookupKey, [:default_value], transform_method)
    say "Took: #{Time.now - start}"

    say "Converting Lookup Values, total: #{LookupValue.unscoped.count}"
    start = Time.now
    transform_batch_columns(LookupValue, [:value], transform_method)
    say "Took: #{Time.now - start}"

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
