module Pages
  class ViewItem

    attr_reader :tabs, :columns

    def initialize(column_count = 1)
      @columns = (0...column_count).map { Column.new }
      @tabs = {}.with_indifferent_access
    end

    def find_tab(tab_name)
      if @tabs[tab_name]
        @tabs[tab_name]
      elsif @tabs.values.empty?
        nil
      else
        @tabs.values.map { |item| item.find_tab tab_name }.compact.first
      end
    end

    def add_tab(tab_name, columns_count = 1)
      fail "Cannot add tab with no name" unless tab_name.present?
      fail "Tab name #{tab_name} already exists" if find_tab(tab_name)
      fail "This view item already has columns, no tabs can be added" if @columns > 1
      tab = Pages::Tab.new(tab_name, last_tab_priority - 1, columns_count)
      yield tab if block_given?
      @tabs[tab_name] = tab
    end

    def add_widget(opts)
      @columns[opts[:column] ? opts[:column] : 0] << Pages::Widget.new(opts)
    end

    def last_tab_priority
      @tabs.values.map(&:priority).min || 20
    end

  end
end