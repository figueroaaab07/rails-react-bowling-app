class BowlerSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name, :street_address, :city, :state, :zip_code, :country, :phone, :captain, :left_handed, :total_pins, :total_games, :handicap
  belongs_to :team
  has_many :games
end
