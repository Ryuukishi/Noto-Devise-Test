class Users::SessionsController < Devise::SessionsController
  before_action :find_user
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: { message: 'You are logged in.' }, status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: { message: "You are logged out." }, status: :ok
  end

  def log_out_failure
    render json: { message: "Hmm nothing happened."}, status: :unauthorized
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
  def find_user
    @user = User.find_by(email: params[:email])
  end
end