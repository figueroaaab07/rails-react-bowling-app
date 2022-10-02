class User < ApplicationRecord
  enum role: [:admin, :captain, :player]
  has_one :bowler
  has_secure_password
  # after_initialize :set_default_role, :if => :new_record?
  after_initialize :set_default_role

  before_save :downcase_email
  # validates email
  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}, presence: true, uniqueness: true

  private

  def set_default_role
    self.role ||= :player
  end

  def downcase_email
    self.email = email.downcase
  end
end
