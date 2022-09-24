class FramesController < ApplicationController
  def index
    frames = Frame.all
    render json: frames
  end

  def show
    frame = find_frame
    render json: frame
  end

  def create
    frame = Frame.create!(frame_params)
    render json: frame, status: :created
  end

  def update
    frame = find_frame
    frame.update!(frame_params)
    render json: frame
  end

  def destroy
    frame = find_frame
    frame.destroy!
    render json: {}, status: :no_content
  end

  private

  def frame_params
    params.permit(:id, :frame_number, :ball_one_pins, :ball_two_pins, :ball_three_pins, :frame_score, :bowler_game_id)
  end

  def find_frame
    Frame.find(params[:id])
  end
end
