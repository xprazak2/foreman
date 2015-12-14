module Pages
  class Manager
    class << self

      def add_page(url_hash, view)
        page = Pages::Page.new(url_hash, view)
        raise ArgumentError, "You are either trying to find non-existing element or add a page with already existing name" if pages[name]
        yield page if block_given?
        pages[page.name] = page
      end

      def extend_page(url_hash, opts)
        page = find_page(url_hash[:controller], url_hash[:action])
        opts[:tabs].each { |new_tab| page.add_tab new_tab } if opts[:tabs]
        opts[:widgets].each { |new_widget| page.add_widget new_widget } if opts[:widgets]
      end

      def extend_tab(url_hash, tab_name, opts)
        page = find_page(url_hash[:controller], url_hash[:action])
        tab = find_tab page, tab_name
        opts[:widgets].each { |widget| tab.add_widget Pages::Widget.new(widget) } if opts[:widgets]
      end

      def load_pages
        Pages::Loader.load
      end

      def find_tab(in_page, tab_name)
        in_page.find_tab tab_name
      rescue ArgumentError
        load_pages
        in_page.find_tab tab_name
      end

      def find_page(controller, action)
        find_page_by_name("#{controller}/#{action}".to_sym)
      end

      def find_page_by_name(page_name)
        req_page = pages[page_name]
        begin
          load_pages if req_page.nil?
        rescue ArgumentError
          fail "No page with name #{page_name} found"
        end
        pages[page_name]
      end

      def pages
        @pages ||= {}.with_indifferent_access
      end
    end
  end
end