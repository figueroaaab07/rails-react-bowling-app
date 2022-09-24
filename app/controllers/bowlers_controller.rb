class BowlersController < ApplicationController
  def index
    bowlers = Bowler.all
    render json: bowlers
  end

  def show
    bowler = find_bowler
    render json: bowler
  end

  def create
    bowler = Bowler.create!(bowler_params)
    render json: bowler, status: :created
  end

  def update
    bowler = find_bowler
    bowler.update!(bowler_params)
    render json: bowler
  end

  def destroy
    bowler = find_bowler
    bowler.destroy!
    render json: {}, status: :no_content
  end

  private

  def bowler_params
    params.permit(:id, :last_name, :first_name, :street_address, :city, :state, :zip_code, :country, :phone, :left_handed, :total_pins, :total_games, :handicap, :user_id, :team_id)
  end

  def find_bowler
    Bowler.find(params[:id])
  end
end
