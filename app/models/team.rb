class Team < ApplicationRecord
  # has_many :match_teams
  # has_many :matches, through: :match_teams
  has_many :match_home_teams, class_name: 'MatchTeam', foreign_key: 'home_team_id'
  has_many :match_guest_teams, class_name: 'MatchTeam', foreign_key: 'guest_team_id'
  # has_many :match_teams
  # has_many :matches, through: :match_teams

  has_many :matches, through: :match_home_teams
  has_many :matches, through: :match_guest_teams
  has_many :bowlers

  # def match_teams
  #   MatchTeam.where("home_team_id = ? OR guest_team_id = ?", self.id, self.id)
  # end
end
