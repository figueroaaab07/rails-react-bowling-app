# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'wa_bowling_locations_1.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
  t = Location.new
  t.name = row['name']
  t.street_address = row['street_address']
  t.city = row['city']
  t.state = row['state']
  t.zip_code = row['zip_code']
  t.country = row['country']
  t.phone = row['phone']
  t.number_lanes = row['number_lanes']
  t.save
end
puts "There are now #{Location.count} rows in the locations table"
