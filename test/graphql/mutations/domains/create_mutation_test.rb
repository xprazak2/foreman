require 'test_helper'

module Mutations
  module Domains
    class CreateMutationTest < ActiveSupport::TestCase
      let(:domain_id) { Foreman::GlobalId.for(FactoryBot.create(:domain)) }
      let(:org_id) { Foreman::GlobalId.for(FactoryBot.create(:organization)) }
      let(:loc_id) { Foreman::GlobalId.for(FactoryBot.create(:location)) }
      let(:dns_id) { Foreman::GlobalId.for(FactoryBot.create(:dns_smart_proxy)) }
      let(:variables) do
        {
          name: 'random.org',
          fullname: 'A random test domain',
          dnsId: dns_id,
          organizationIds: [org_id],
          locationIds: [loc_id],
        }
      end
      let(:query) do
        <<-GRAPHQL
          mutation createDomainMutation(
              $name: String,
              $fullname: String,
              $dnsId: ID,
              $organizationIds: [ID!],
              $locationIds: [ID!]
            ) {
            createDomain(input: {
              name: $name,
              fullname: $fullname,
              dnsId: $dnsId,
              organizationIds: $organizationIds,
              locationIds: $locationIds
            }) {
              domain {
                id
                name
                fullname
                dns {
                  id
                  name
                }
                organizations {
                  nodes {
                    name
                  }
                }
                locations {
                  nodes {
                    name
                  }
                }
              }
              errors {
                path
                message
              }
            }
          }
        GRAPHQL
      end

      context 'with admin user' do
        let(:user) { FactoryBot.create(:user, :admin) }
        let(:context) { { current_user: user } }

        test 'create a domain' do
          assert_difference('Domain.count', +1) do
            result = ForemanGraphqlSchema.execute(query, variables: variables, context: context)
            assert_empty result['errors']
            assert_empty result['data']['createDomain']['errors']
          end
          assert_equal user.id, Audit.last.user_id
        end

        test 'should not create a domain twice' do
          assert_difference('Domain.count', +1) do
            result = ForemanGraphqlSchema.execute(query, variables: variables, context: context)
            assert_empty result['errors']
            assert_empty result['data']['createDomain']['errors']
          end

          assert_difference('Domain.count', 0) do
            result = ForemanGraphqlSchema.execute(query, variables: variables, context: context)
            assert_includes result['data']['createDomain']['errors'], { "path" => ["attributes", "name"], "message" => "has already been taken" }
          end
        end
      end

      context 'with user with view permissions' do
        setup do
          variables
          @user = setup_user 'view', 'domains'
        end

        test 'cannot create a domain' do
          context = { current_user: @user }
          assert_difference('::Domain.count', 0) do
            result = ForemanGraphqlSchema.execute(query, variables: variables, context: context)
            assert_not_empty result['errors']
          end
        end
      end
    end
  end
end
