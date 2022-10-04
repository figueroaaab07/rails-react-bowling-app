class Bowler < ApplicationRecord
  include MethodsPhone
  belongs_to :team
  belongs_to :user, optional: true
  has_many :bowler_games
  has_many :games, through: :bowler_games
  before_save :normalize_phone
  validates :phone, phone: true, allow_blank: true
end
