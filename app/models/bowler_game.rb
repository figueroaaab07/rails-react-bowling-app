class BowlerGame < ApplicationRecord
  belongs_to :bowler
  belongs_to :game
  has_many :frames
end
