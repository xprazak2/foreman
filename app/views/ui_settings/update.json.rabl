object @setting

extends "api/v2/settings/base"

attributes :description, :category, :settings_type, :default, :full_name, :select_values, :value

node :readonly do |s|
  s.readonly?
end

node :config_file do |s|
  s.class.config_file
end

node :encrypted do |s|
  s.encrypted?
end
