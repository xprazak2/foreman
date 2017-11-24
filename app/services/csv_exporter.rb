require 'csv'

module CsvExporter
  def self.export(resources, columns, header = nil)
    header ||= default_header(columns)
    raise ArgumentError, "Columns and header row aren't the same length" unless columns.length == header.length
    csv = []
    csv << CSV.generate_line(header)
    columns.map!{|c| c.to_s.split('.').map(&:to_sym)}
    resources.uncached do
      resources.reorder(nil).find_each do |obj|
        csv << CSV.generate_line(columns.map { |c| c.inject(obj, :try) })
      end
    end
    csv.each
  end

  def self.default_header(columns)
    columns.map{|c| c.to_s.titleize}
  end
end
