class CreateTournaments < ActiveRecord::Migration[6.1]
  def change
    create_table :tournaments do |t|
      t.string :name
      t.string :start_date
      t.string :end_date
      t.integer :number_dates
      t.references :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end
