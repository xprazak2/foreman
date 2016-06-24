require 'test_helper'

class ProxyReferenceRegistryTest < ActiveSupport::TestCase
  setup do
    @references = ProxyReferenceRegistry.references
    ProxyReferenceRegistry.references = nil
  end

  teardown do
    ProxyReferenceRegistry.references = @references
  end

  test "should add smart proxy reference" do
    refute ProxyReferenceRegistry.references
    ProxyReferenceRegistry.add_smart_proxy_reference(:hosts => [:foo])
    assert_equal [:foo], ProxyReferenceRegistry.references[:hosts]
    ProxyReferenceRegistry.add_smart_proxy_reference(:hosts => [:bar])
    assert_equal [:bar, :foo], ProxyReferenceRegistry.references[:hosts].sort
  end

  test "should add correct entries from plugins" do
    old_plugins = Foreman::Plugin.registered_plugins.deep_clone

    Foreman::Plugin.register :test_first_entry_from_plugin do
      smart_proxy_reference :hosts => [:my_test]
    end

    Foreman::Plugin.register :test_second_entry_from_plugin do
      smart_proxy_reference :hosts => [:my_test_again]
    end
    begin
      assert_equal [:my_test, :my_test_again], ProxyReferenceRegistry.smart_proxy_references[:hosts].sort
    ensure
      Foreman::Plugin.instance_variable_set('@registered_plugins', old_plugins)
    end
  end
end
