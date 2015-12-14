module Pages
  class Page
    attr_reader :tabs, :widgets, :url_hash, :view

    def initialize(url_hash, view)
      @url_hash = url_hash
      @tabs = {}.with_indifferent_access
      @widgets = []
      @view = view
    end

    def add_tab(opts)
      tab_name = opts[:name]
      fail "Cannot add tab with no name" unless tab_name.present?
      fail "Tab name #{tab_name} alerady exists" if @tabs[tab_name]
      partial = opts[:partial] || nil
      priority = opts[:priority] || last_tab_priority - 1
      tab_widgets = opts[:widgets].empty? ? [] : opts[:widgets].map { |item| Pages::Widget.new(item) }
      @tabs[tab_name.to_sym] = Pages::Tab.new(:name => tab_name, :partial => partial, :priority => priority, :widgets => tab_widgets)
    end

    def find_tab(tab_name)
      @tabs[tab_name] ? @tabs[tab_name] : raise(ArgumentError, "Cannot find tab with name #{tab_name}")
    end

    def add_widget(opts)
      @widgets << Pages::Widget.new(opts)
    end

    def last_tab_priority
      tabs.values.map(&:priority).min || 10
    end

    def first_tab_priority
      tabs.values.map(&:priority).max || 10
    end

    def name
      "#{@url_hash[:controller]}/#{url_hash[:action]}".to_sym
    end

    #to force all widgets into tabs - imagine hosts/_form
    def tabify(tab_name)
      tabs.any? && widgets.any?
      new_tab = Pages::Tab.new(:name => tab_name, :widgets => @widgets, :priority => 100)
      @tabs[tab_name.to_sym] = new_tab
      @widgets = []
    end

    def tabified?
      !(tabs.any? && widgets.any?)
    end

    def tabbed?
      tabs.any?
    end

    def sorted_tabs
      tabs.sort_by { |k,v| v.priority }.reverse.to_h
    end
  end
end