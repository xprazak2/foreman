object @subnet

extends "api/v2/subnets/main"

node do |subnet|
  { :label => subnet.to_label, :parameterized => subnet.network.parameterize }
end
