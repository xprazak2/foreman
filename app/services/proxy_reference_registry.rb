module ProxyReferenceRegistry
  class << self
    attr_accessor :references

    def add_smart_proxy_reference(hash)
      ref = new_reference hash
      if @references
        join_reference_arrays @references, [ref]
      else
        @references = [ref]
      end
    end

    def new_reference(hash)
      raise Foreman::Exception.new(N_("Proxy reference should be { :relation => [:column_name, ...] }")) unless correct_reference_format?(hash)
      SmartProxyReference.new hash.deep_clone
    end

    def smart_proxy_references
      join_reference_arrays local_proxy_references.deep_clone, proxy_references_from_plugins
    end

    def local_proxy_references
      @references ||= []
    end

    def proxy_references_from_plugins
      Foreman::Plugin.all.flat_map(&:smart_proxy_references).compact
    end

    def join_reference_arrays(references, other_references)
      to_add = other_references.reduce([]) do |memo, other_ref|
        existing = references.find { |ref| other_ref.join_relation == ref.join_relation }
        if existing
          existing.merge other_ref
        else
          memo << other_ref
        end
        memo
      end
      references = references.concat to_add
      references
    end

    private

    def correct_reference_format?(hash)
      hash.is_a?(Hash) && hash.values.first.is_a?(Array) && hash.size == 1
    end
  end
end
