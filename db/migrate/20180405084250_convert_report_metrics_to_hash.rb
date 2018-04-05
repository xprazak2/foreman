class ConvertReportMetricsToHash < ActiveRecord::Migration[5.1]
  def up
    transform ActionController::Parameters, :to_h
  end

  def down
    transform Hash, :to_params
  end

  def transform(from, transform_method)
    # report_classes.each do |report_class|
      # report_class.unscoped.all.in_batches do |batch|
        # batch.each do |report|
          report = FakeReport.find 887
          metrics = report.metrics
          new_metrics = YAML.load(send(transform_method, metrics))
          new_metrics.to_unsafe_h if new_metrics.respond_to? :to_unsafe_h
          if report.metrics != new_metrics
            report.metrics = YAML.dump new_metrics
            report.save!
          end
    #     end
    #   end
    # end
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

  class FakeReport < ApplicationRecord
    self.table_name = 'reports'
    self.inheritance_column = nil
  end
end
