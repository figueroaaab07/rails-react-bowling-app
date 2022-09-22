class CreateBowlers < ActiveRecord::Migration[6.1]
  def change
    create_table :bowlers do |t|
      t.string :last_name
      t.string :first_name
      t.string :street_address
      t.string :city
      t.string :state
      t.string :zip_code
      t.string :country
      t.string :phone
      t.boolean :captain
      t.boolean :left_handed
      t.integer :total_pins
      t.integer :total_games
      t.integer :handicap
      t.references :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
