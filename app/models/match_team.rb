class MatchTeam < ApplicationRecord
  belongs_to :match
  # belongs_to :team
  belongs_to :home_team, class_name: 'Team'
  belongs_to :guest_team, class_name: 'Team'
  has_many :games

  def self.teams
    Team.where("home_team_id = ? OR guest_team_id = ?", self.id, self.id).uniq
  end
  # def self.teams
  #   joined_tables = Team.joins(:home_team).joins(:guest_team)
  #   joined_tables.where('home_team.id in (?) or guest_team.id in (?)', select(:id), select(:id)).uniq
  # end
end
