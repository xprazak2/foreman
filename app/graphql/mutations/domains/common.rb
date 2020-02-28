module Mutations
  module Domains
    module Common
      extend ActiveSupport::Concern

      included do
        argument :name, String, required: false
        argument :fullname, String, required: false
        argument :dns_id, GraphQL::Types::ID, loads: Types::SmartProxy, required: false

        include ::Mutations::Concerns::TaxonomyArgs

        field :domain, Types::Domain, 'A domain.', null: true
      end
    end
  end
end
