class UsersController < ApplicationController
  before_action :authorized, only: [:show]

  def index
    users = User.all
    render json: users
  end

  def destroy
    user = User.find(params[:id])
    user.destroy!
    render json: {}, status: :no_content
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def show
    user = User.find(session[:user_id])
    render json: user, status: :ok
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :role)
  end
end
