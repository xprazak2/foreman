module Pages
  class Widget
    attr_reader :name, :partial

    def initialize(opts)
      opts[:name] ? @name = opts[:name] : fail("Widget should have name")
      opts[:partial] ? @partial = opts[:partial] : fail("Widget should have partial")
    end
  end
end