class TeamsController < ApplicationController
  def index
    teams = Team.all
    render json: teams
  end

  def show
    team = find_team
    render json: team
  end

  def create
    team = Team.create!(team_params)
    render json: team, status: :created
  end

  def update
    team = find_team
    team.update!(team_params)
    render json: team
  end

  def destroy
    team = find_team
    team.destroy!
    render json: {}, status: :no_content
  end

  private

  def team_params
    params.permit(:id, :name, :logo)
  end

  def find_team
    Team.find(params[:id])
  end
end
