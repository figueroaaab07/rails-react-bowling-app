class Match < ApplicationRecord
  belongs_to :tournament
  has_many :match_teams
  has_many :teams, through: :match_teams, source: :home_team
  # has_many :teams, through: :match_teams, source: :guest_team
end
