module Pages
  class Manager
    class << self

      def add_page(url_hash, view, columns_count = 1)
        @pages ||= {}.with_indifferent_access
        page = Pages::Page.new(url_hash, view, columns_count)
        raise ArgumentError, "You are either trying to find non-existing element or add a page with already existing name" if @pages[page.name]
        yield page if block_given?
        @pages[page.name] = page
      end

      def extend_page(url_hash)
        page = find_page(url_hash[:controller], url_hash[:action])
        # opts[:tabs].each { |new_tab| page.add_tab new_tab } if opts[:tabs]
        # opts[:widgets].each { |new_widget| page.add_widget new_widget } if opts[:widgets]
        yield page if block_given?
      end

      def extend_tab(url_hash, tab_name)
        page = find_page(url_hash[:controller], url_hash[:action])
        tab = page.find_tab tab_name
        if tab
          yield tab if block_given?
        else
          fail "No tab with name #{tab_name} on page #{page.name} was found"
        end
      end

      def load_pages
        Pages::Loader.load
      end

      def find_page(controller, action)
        find_page_by_name("#{controller}/#{action}".to_sym)
      end

      def find_page_by_name(page_name)
        req_page = @pages[page_name]
        begin
          load_pages if req_page.nil?
        rescue ArgumentError
          fail "No page with name #{page_name} found"
        end
        @pages[page_name]
      end

      def pages
        @pages ||= {}.with_indifferent_access
      end
    end
  end
end