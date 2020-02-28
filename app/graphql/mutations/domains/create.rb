module Mutations
  module Domains
    class Create < CreateMutation
      graphql_name 'CreateDomainMutation'
      description 'Creates a new domain'

      include Common
    end
  end
end
