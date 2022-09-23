class UsersController < ApplicationController
  before_action :authorize, only: [:show]

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user, status: :created
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :role)
  end
end
