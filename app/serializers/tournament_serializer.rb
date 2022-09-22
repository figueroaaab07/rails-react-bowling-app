class TournamentSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :number_dates
  has_many :matches
  belongs_to :location
end
