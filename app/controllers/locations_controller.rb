class LocationsController < ApplicationController
  def index
    locations = Location.all
    render json: locations
  end

  def show
    location = find_location
    render json: location
  end

  def create
    location = Location.create!(location_params)
    render json: location, status: :created
  end

  def update
    location = find_location
    location.update!(location_params)
    render json: location
  end

  def destroy
    location = find_location
    location.destroy!
    render json: {}, status: :no_content
  end

  private

  def location_params
    params.permit(:id, :name, :street_address, :city, :state, :country, :zip_code, :phone, :number_lanes)
  end

  def find_location
    Location.find(params[:id])
  end
end
