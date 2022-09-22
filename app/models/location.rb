class Location < ApplicationRecord
  include MethodsPhone
  has_many :tournaments
  before_save :normalize_phone
  validates :phone, phone: true, allow_blank: true
end
