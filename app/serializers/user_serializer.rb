class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest, :role
  has_one :bowler
end
