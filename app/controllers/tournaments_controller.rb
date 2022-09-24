class TournamentsController < ApplicationController
  def index
    tournaments = Tournament.all
    render json: tournaments
  end

  def show
    tournament = find_tournament
    render json: tournament
  end

  def create
    tournament = Tournament.create!(tournament_params)
    render json: tournament, status: :created
  end

  def update
    tournament = find_tournament
    tournament.update!(tournament_params)
    render json: tournament
  end

  def destroy
    tournament = find_tournament
    tournament.destroy!
    render json: {}, status: :no_content
  end

  private

  def tournament_params
    params.permit(:id, :name, :start_date, :end_date, :number_dates, :location_id)
  end

  def find_tournament
    Tournament.find(params[:id])
  end
end
