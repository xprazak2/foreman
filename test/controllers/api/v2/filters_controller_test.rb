require 'test_helper'

class Api::V2::FiltersControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:filters)
    filters = ActiveSupport::JSON.decode(@response.body)
    assert !filters.empty?
  end

  test "should show individual record" do
    get :show, params: { :id => filters(:manager_1).to_param }
    assert_response :success
    show_response = ActiveSupport::JSON.decode(@response.body)
    assert !show_response.empty?
  end

  test_attributes :pid => 'b8631d0a-a71a-41aa-9f9a-d12d62adc496'
  test "should create filter" do
    valid_attrs = { :role_id => roles(:destroy_hosts).id, :permission_ids => [permissions(:view_architectures).id] }
    assert_difference('Filter.count') do
      post :create, params: { :filter => valid_attrs }
    end
    assert_response :created
    show_response = ActiveSupport::JSON.decode(@response.body)
    assert_equal show_response["permissions"].first["name"], "view_architectures"
  end

  test "should update filter" do
    valid_attrs = { :role_id => roles(:destroy_hosts).id, :permission_ids => [permissions(:create_hosts).id] }
    put :update, params: { :id => filters(:destroy_hosts_1).to_param, :filter => valid_attrs }
    assert_response :success
  end

  test_attributes :pid => 'f0c56fd8-c91d-48c3-ad21-f538313b17eb'
  test "should destroy filters" do
    assert_difference('Filter.count', -1) do
      delete :destroy, params: { :id => filters(:destroy_hosts_1).to_param }
    end
    assert_response :success
  end

  context "with organizations" do
    before do
      @org = FactoryBot.create(:organization)
    end

    test "filter can override taxonomies" do
      valid_attrs = { :role_id => roles(:destroy_hosts).id, :permission_ids => [permissions(:view_media).id], :organization_ids => [@org.id], :override => true }
      assert_difference('Filter.count') do
        post :create, params: { :filter => valid_attrs }
      end
      assert_response :created
      assert assigns(:filter).organizations.include? @org
    end

    test "taxonomies are ignored if override is not explicitly enabled" do
      valid_attrs = { :role_id => roles(:destroy_hosts).id, :permission_ids => [permissions(:view_domains).id], :organization_ids => [@org.id] }
      assert_difference('Filter.count') do
        post :create, params: { :filter => valid_attrs }
      end
      assert_response :created
      refute assigns(:filter).organizations.include? @org
    end
  end

  test "should not create filter when user does not have permission to edit role" do
    role_permissions = [:view_roles, :destroy_roles, :create_roles].map { |item| send(:permissions, item) }
    filter_permissions = [:view_filters, :destroy_filters, :create_filters, :edit_filters].map { |item| send(:permissions, item) }

    user = create_user_with_filters([role_permissions, filter_permissions])

    as_user(user) do
      valid_attrs = { :role_id => roles(:destroy_hosts).id, :permission_ids => [permissions(:create_hosts).id] }
      put :update, params: { :id => filters(:destroy_hosts_1).to_param, :filter => valid_attrs }
    end

    res = JSON.parse(@response.body)
    assert_equal "Missing one of the required permissions: edit_roles", res['error']['details']
    assert_response :forbidden
  end

  test "should create filter when user has permission to edit role" do
    role_permissions = [:view_roles, :destroy_roles, :edit_roles, :create_roles].map { |item| send(:permissions, item) }
    filter_permissions = [:view_filters, :destroy_filters, :create_filters, :edit_filters].map { |item| send(:permissions, item) }

    user = create_user_with_filters([role_permissions, filter_permissions])

    as_user(user) do
      valid_attrs = { :role_id => roles(:destroy_hosts).id, :permission_ids => [permissions(:create_hosts).id] }
      put :update, params: { :id => filters(:destroy_hosts_1).to_param, :filter => valid_attrs }
    end

    assert_response :success
  end

  private

  def create_user_with_filters(filter_permissions)
    user = FactoryBot.create(:user, :admin => false)
    role = FactoryBot.create(:role)

    FactoryBot.create(:user_role, :owner => user, :role => role)
    filter_permissions.each do |permissions|
      FactoryBot.create(:filter, :role => role, :permissions => permissions)
    end
    user
  end
end
