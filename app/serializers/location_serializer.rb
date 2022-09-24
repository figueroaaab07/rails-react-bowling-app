class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :street_address, :city, :state, :country, :zip_code, :phone, :number_lanes
  has_many :tournaments
end
