class BowlerGamesController < ApplicationController
  def index
    bowler_games = BowlerGame.all
    render json: bowler_games
  end

  def show
    bowler_game = find_bowler_game
    render json: bowler_game
  end

  def create
    bowler_game = BowlerGame.create!(bowler_game_params)
    render json: bowler_game, status: :created
  end

  def update
    bowler_game = find_bowler_game
    bowler_game.update!(bowler_game_params)
    render json: bowler_game
  end

  def destroy
    bowler_game = find_bowler_game
    bowler_game.destroy!
    render json: {}, status: :no_content
  end

  private

  def bowler_game_params
    params.permit(:id, :game_score, :bowler_id, :game_id, :selected)
  end

  def find_bowler_game
    BowlerGame.find(params[:id])
  end
end
