class ReactModelsController < ReactController
  include Foreman::Controller::AutoCompleteSearch

  # def index
  # end

  def model_of_controller
    Model
  end
end
