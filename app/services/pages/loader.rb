module Pages
  class Loader
    def self.load
      Pages::Manager.add_page({ :controller => :smart_proxies, :action => :show }, "common/extensible/show") do |page|
        # page.add_tab("first", "common/extensible/test_partial", [])
        page.add_tab :name => "second", :widgets => [{ :name => "one", :partial => "common/extensible/sample_partial" }], :priority => 5
        page.add_widget :name => "first", :partial => "common/extensible/test_partial"
        page.add_widget :name => "second", :partial => "common/extensible/sample_partial"
      end
    end
  end
end