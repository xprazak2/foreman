module ExtensiblePageHelper
  def resource
    controller.instance_variable_get "@#{controller.resource_name}"
  end
end