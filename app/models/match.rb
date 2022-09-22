class Match < ApplicationRecord
  belongs_to :tournament
  has_many :match_teams
  has_many :teams, through: :match_teams
end
