class BowlerGameSerializer < ActiveModel::Serializer
  attributes :id, :game_score, :selected
  belongs_to :bowler
  belongs_to :game
  has_many :frames
end
