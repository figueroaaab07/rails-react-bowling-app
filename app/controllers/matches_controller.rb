class MatchesController < ApplicationController
  def index
    matches = Match.all
    render json: matches
  end

  def show
    match = find_match
    render json: match
  end

  def create
    match = Match.create!(match_params)
    render json: match, status: :created
  end

  def update
    match = find_match
    match.update!(match_params)
    render json: match
  end

  def destroy
    match = find_match
    match.destroy!
    render json: {}, status: :no_content
  end

  private

  def match_params
    params.permit(:id, :date, :number_players, :number_games, :tournament_id)
  end

  def find_match
    Match.find(params[:id])
  end
end
