require 'test_helper'

module Queries
  class ModelsQueryTest < GraphQLQueryTestCase
    let(:query) do
      <<-GRAPHQL
      query($page: Int!, $per_page: Int!) {
        models(pagination: { page: $page, perPage: $per_page }) {
          totalCount
          recordsCount
          nodes {
            id
          }
        }
      }
      GRAPHQL
    end

    let(:variables) { { page: 2, per_page: 5 } }
    let(:data) { result['data']['models'] }

    setup do
      FactoryBot.create_list(:model, 31)
    end

    test 'fetching models attributes' do
      assert_empty result['errors']

      expected_count = Model.count

      assert_not_equal 0, expected_count
      assert_equal variables[:per_page], data['totalCount']
      assert_equal expected_count, data['recordsCount']
      assert_equal variables[:per_page], data['nodes'].count
      refute_includes data['nodes'].pluck('id'), Foreman::GlobalId.for(Model.first)
      refute_includes data['nodes'].pluck('id'), Foreman::GlobalId.for(Model.last)
    end
  end
end
