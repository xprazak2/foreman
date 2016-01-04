module Pages
  class Tab < ViewItem
    attr_reader :name, :priority

    def initialize(name, priority, columns_count)
      @name = name
      @priority = priority
      super columns_count
    end

    def snake_name
      @name.gsub(/\s/, "_").underscore
    end

    def add_widget(widget)
      @widgets << Pages::Widget.new(widget)
    end
  end
end