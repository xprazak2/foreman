module Types
  class Domain < BaseObject
    description 'A Domain'

    global_id_field :id
    timestamps
    field :name, String
    field :fullname, String

    has_many :hosts, Types::Host
    has_many :subnets, Types::Subnet, resolver: Resolvers::Domain::Subnets
    belongs_to :dns, Types::SmartProxy
    has_many :locations, Types::Location
    has_many :organizations, Types::Organization
  end
end
