class MatchTeamSerializer < ActiveModel::Serializer
  attributes :id, :lanes
  belongs_to :match
  belongs_to :home_team, class_name: 'Team'
  belongs_to :guest_team, class_name: 'Team'
  has_many :games
end
