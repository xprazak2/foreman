module Pages
  class Column

    attr_reader :widgets

    def initialize
      @widgets = []
    end

    def <<(widget)
      @widgets << widget
    end
  end
end