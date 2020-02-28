module Mutations
  module Domains
    class Update < UpdateMutation
      graphql_name 'UpdateDomainMutation'
      description 'Updates a domain'

      include Common
    end
  end
end
