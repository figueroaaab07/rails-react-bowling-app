class FrameSerializer < ActiveModel::Serializer
  attributes :id, :frame_number, :ball_one_pins, :ball_two_pins, :ball_three_pins, :frame_score
  belongs_to :bowler_game
end
