module Pages
  class Loader
    def self.load
      Pages::Manager.add_page({ :controller => :smart_proxies, :action => :show }, "smart_proxies/show") do |page|
        page.add_tab :name => "Overview"#, :widgets => [{ :name => "one", :partial => "common/extensible/sample_partial" }], :priority => 5
        page.add_tab :name => "Services"
      end
    end
  end
end