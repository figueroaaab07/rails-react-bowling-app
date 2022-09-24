class MatchTeamsController < ApplicationController
  def index
    match_teams = MatchTeam.all
    render json: match_teams
  end

  def show
    match_team = find_match_team
    render json: match_team
  end

  def create
    match_team = MatchTeam.create!(match_team_params)
    render json: match_team, status: :created
  end

  def update
    match_team = find_match_team
    match_team.update!(match_team_params)
    render json: match_team
  end

  def destroy
    match_team = find_match_team
    match_team.destroy!
    render json: {}, status: :no_content
  end

  private

  def match_team_params
    params.permit(:id, :lanes, :match_id, :home_team_id, :guest_team_id)
  end

  def find_match_team
    MatchTeam.find(params[:id])
  end
end
