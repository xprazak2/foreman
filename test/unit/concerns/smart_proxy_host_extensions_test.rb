require 'test_helper'

class SmartProxyHostExtensionsTest < ActiveSupport::TestCase
  setup do
    @references = SmartProxyReference.references
    SmartProxyReference.references = nil

    class ProxyReferrer
      include SmartProxyHostExtensions
      smart_proxy_reference :test_reference => [:test]
      smart_proxy_reference :test_reference => [:another_test]
    end
  end

  teardown do
    SmartProxyReference.references = @references
  end

  test "should have test_reference" do
    assert SmartProxyReference.smart_proxy_references.keys.detect { |ref| ref == :test_reference }
  end

  test "should not overwrite references" do
    assert_equal 2, SmartProxyReference.smart_proxy_references[:test_reference].length
  end
end
