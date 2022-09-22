class MatchSerializer < ActiveModel::Serializer
  attributes :id, :date, :number_players, :number_games
  belongs_to :tournament
  has_many :teams
end
