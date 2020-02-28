module Mutations
  module Domains
    class Delete < DeleteMutation
      graphql_name 'DeleteDomainMutation'
      description 'Deletes a domain.'
    end
  end
end
