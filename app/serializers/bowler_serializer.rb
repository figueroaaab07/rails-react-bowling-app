class BowlerSerializer < ActiveModel::Serializer
  attributes :id, :last_name, :first_name, :street_address, :city, :state, :zip_code, :country, :phone, :left_handed, :total_pins, :total_games, :handicap
  belongs_to :team
  belongs_to :user
  has_many :games
end
