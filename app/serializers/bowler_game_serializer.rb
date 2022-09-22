class BowlerGameSerializer < ActiveModel::Serializer
  attributes :id, :game_score
  belongs_to :bowler
  belongs_to :game
  has_many :frames
end
