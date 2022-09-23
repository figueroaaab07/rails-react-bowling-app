class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :street_address, :city, :state,:country, :zip_code, :phone, :lanes_number
  has_many :tournaments
end
