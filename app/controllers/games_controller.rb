class GamesController < ApplicationController
  def index
    games = Game.all
    render json: games
  end

  def show
    game = find_game
    render json: game
  end

  def create
    game = Game.create!(game_params)
    render json: game, status: :created
  end

  def update
    game = find_game
    game.update!(game_params)
    render json: game
  end

  def destroy
    game = find_game
    game.destroy!
    render json: {}, status: :no_content
  end

  private

  def game_params
    params.permit(:id, :game_number, :home_team_score, :guest_team_score, :match_team_id)
  end

  def find_game
    Game.find(params[:id])
  end
end
