class Game < ApplicationRecord
  belongs_to :match_team
  has_many :bowler_games
  has_many :bowlers, through: :bowler_games
end
