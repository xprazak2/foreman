module Hostext
  module FactData
    extend ActiveSupport::Concern

    def set_reported_data(parser)
      set_data(:boot_timestamp, parser, ->(value) { Time.at value })
      set_data(:virtual, parser)
      set_data(:ram, parser, ->(value) { format_host_memory value })
      set_data(:sockets, parser)
      set_data(:cores, parser)
    end

    def cores
      get_data :cores
    end

    def virtual
      get_data :virtual
    end

    def sockets
      get_data :sockets
    end

    def ram
      get_data :ram
    end

    def uptime_seconds
      get_data(:boot_time, ->(value) { value.nil? ? nil : Time.zone.now.to_i - value.to_i })
    end

    private

    def get_data(attr_name, format_lambda = ->(value) { value })
      value = self&.reported_data&.public_send(attr_name)
      format_lambda.call(value)
    end

    def set_data(attr_name, parser, format_lambda = ->(value) { value })
      value = parser.public_send(attr_name)
      return unless value

      reported_data_facet.update(attr_name => format_lambda.call(value)) if self.persisted?
    end

    def format_host_memory(memory)
      return (memory / 1048576).round(2) unless memory.is_a? String
      value = memory.downcase
      value.sub('gb', '').strip.to_i if value.match(/gb/)
    end

    def reported_data_facet
      self.reported_data || self.build_reported_data
    end
  end
end
