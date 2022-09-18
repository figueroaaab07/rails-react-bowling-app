class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :street_address
      t.string :city
      t.string :state
      t.string :country
      t.integer :zip_code

      t.timestamps
    end
  end
end
