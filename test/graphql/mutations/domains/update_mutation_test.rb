require 'test_helper'

module Mutations
  module Domains
    class UpdateMutationTest < ActiveSupport::TestCase
      let(:domain) { FactoryBot.create(:domain) }
      let(:domain_name) { 'updated domain name' }
      let(:fullname) { 'updated domain fullname' }
      let(:domain_id) { Foreman::GlobalId.for(domain) }
      let(:dns_proxy) { FactoryBot.create(:dns_smart_proxy) }
      let(:dns_id) { Foreman::GlobalId.for(dns_proxy) }
      let(:org_id) { Foreman::GlobalId.for(FactoryBot.create(:organization)) }
      let(:loc_id) { Foreman::GlobalId.for(FactoryBot.create(:location)) }
      let(:variables) do
        {
          id: domain_id,
          name: domain_name,
          fullname: fullname,
          dnsId: dns_id,
          organizationIds: [org_id],
          locationIds: [loc_id],
        }
      end
      let(:query) do
        <<-GRAPHQL
        mutation UpdateDomainMutation(
            $id: ID!,
            $name: String,
            $fullname: String,
            $dnsId: ID,
            $organizationIds: [ID!],
            $locationIds: [ID!]
          ){
          updateDomain(input: {
            id: $id,
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

        setup do
          domain
        end

        test 'updates a domain' do
          assert_difference('::Domain.count', 0) do
            result = ForemanGraphqlSchema.execute(query, variables: variables, context: context)
            assert_empty result['errors']
            assert_empty result['data']['updateDomain']['errors']
          end
          assert_equal user.id, Audit.last.user_id
          domain.reload
          assert_equal domain_name, domain.name
          assert_equal fullname, domain.fullname
          assert_equal dns_proxy.name, domain.dns.name
          refute_empty domain.locations
          refute_empty domain.organizations
        end

        test 'should not update a domain without id' do
          assert_difference('Domain.count', 0) do
            result = ForemanGraphqlSchema.execute(query,
              variables: variables.reject { |key, value| key == :id },
              context: context)
            assert_equal "Variable id of type ID! was provided invalid value", result['errors'].first['message']
            assert_equal "Expected value to not be null", result['errors'].first['problems'].first['explanation']
          end
        end
      end

      context 'with user with view permissions' do
        setup do
          @user = setup_user 'view', 'domains'
        end

        test 'cannot update a domain' do
          context = { current_user: @user }

          assert_difference('Domain.count', 0) do
            result = ForemanGraphqlSchema.execute(query, variables: variables, context: context)
            assert_not_empty result['errors']
          end
        end
      end
    end
  end
end
