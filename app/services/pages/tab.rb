module Pages
  class Tab
    attr_reader :widgets, :name, :priority, :partial

    def initialize(opts)
      @name = opts[:name]
      @widgets = opts[:widgets]
      @priority = opts[:priority]
      @partial = opts[:partial]
    end

    def snake_name
      @name.gsub(/\s/, "_").underscore
    end

    def add_widget(widget)
      @widgets << widget
    end
  end
end