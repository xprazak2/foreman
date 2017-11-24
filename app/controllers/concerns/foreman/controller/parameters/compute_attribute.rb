module Foreman::Controller::Parameters::ComputeAttribute
  extend ActiveSupport::Concern
  include Foreman::Controller::Parameters::KeepParam
  include Foreman::Controller::NormalizeScsiAttributes

  class_methods do
    def compute_attribute_params_filter
      Foreman::ParameterFilter.new(::ComputeAttribute).tap do |filter|
        filter.permit :compute_profile_id,
          :compute_resource_id
      end
    end
  end

  def compute_attribute_params
    keep_param(params, controller_name.singularize, :vm_attrs) do
      self.class.compute_attribute_params_filter.filter_params(params, parameter_filter_context)
    end
  end

  def normalized_compute_attribute_params
    normalized = compute_attribute_params

    if normalized["vm_attrs"] && normalized["vm_attrs"]["scsi_controllers"]
      normalize_scsi_attributes(normalized["vm_attrs"])
    end

    normalized
  end
end
