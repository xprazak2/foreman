module ProxyStatus
  class DHCP < Base
    def subnets
      # [{ :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.101.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.102.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.103.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.104.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.105.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.106.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.107.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.108.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.109.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.110.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.111.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.112.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.113.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.114.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.115.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.116.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.116.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.117.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'},
      #   { :network => '192.168.100.1', :netmask => '255.255.255.0'}]
      fetch_proxy_data do
        @subnets = api.subnets.map do |s|
          Net::DHCP::Subnet.new s
        end.compact
      end
    end

    def subnet(dhcp_subnet)
      fetch_proxy_data "details" do
        result = api.subnet dhcp_subnet[:network]
        net = Net::DHCP::Subnet.new result.merge!(dhcp_subnet)
        net.reservations.each { |res| res['network'] = net.network }
        net
      end
    end

    def self.humanized_name
      'DHCP'
    end
  end
end
ProxyStatus.status_registry.add(ProxyStatus::DHCP)
