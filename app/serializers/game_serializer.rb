class GameSerializer < ActiveModel::Serializer
  attributes :id, :game_number, :home_team_score, :guest_team_score
  belongs_to :match_team
  has_many :bowlers
end
