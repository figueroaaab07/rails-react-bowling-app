class Bowler < ApplicationRecord
  belongs_to :team
  has_many :bowler_games
  has_many :games, through: :bowler_games
end
