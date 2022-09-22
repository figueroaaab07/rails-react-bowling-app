class GameSerializer < ActiveModel::Serializer
  attributes :id, :game_number
  belongs_to :match_team
  has_many :bowlers
end
