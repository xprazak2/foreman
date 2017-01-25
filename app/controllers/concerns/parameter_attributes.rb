module ParameterAttributes
  extend ActiveSupport::Concern

  def process_parameter_attributes
    model_params = params[parameter_method_mapping]
    return unless model_params
    parameter_params = model_params["#{parameter_class_mapping}_parameters_attributes"]
    return unless parameter_params
    param_klass = "#{parameter_class_mapping.to_s.capitalize}Parameter".constantize

    obj_names = param_klass.where(:reference_id => instance_variable_get("@#{parameter_method_mapping}").id).map(&:name)
    param_names = parameter_params.map { |hash| hash[:name] }
    delete_names = obj_names - param_names
    update_names = param_names & obj_names

    parameter_params.map! do |parameter|
      if update_names.include? parameter[:name]
        parameter.tap { |hash| hash[:id] = fetch_parameter(param_klass, parameter[:name]).id }
      elsif delete_names.include? parameter[:name]
        { :id => fetch_parameter(param_klass, parameter[:name]).id, :_destroy => true }
      end
    end
  end

  private

  def fetch_parameter(param_klass, name)
    param_klass.find_by(:name => name, :reference_id => instance_variable_get("@#{parameter_method_mapping}").id)
  end

  def parameter_method_mapping
    case controller_name.classify
      when "Operatingsystem" then :operatingsystem
      when "Hostgroup"       then :hostgroup
      else parameter_common_mapping
    end
  end

  def parameter_class_mapping
    case controller_name.classify
      when "Operatingsystem" then :os
      when "Hostgroup"       then :group
      else parameter_common_mapping
    end
  end

  def parameter_common_mapping
    case controller_name.classify
      when "Host"            then :host
      when "Domain"          then :domain
      when "Organization"    then :organization
      when "Location"        then :location
      when "Subnet"          then :subnet
    end
  end
end
