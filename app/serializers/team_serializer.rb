class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name, :logo
  has_many :matches
  has_many :bowlers
end
