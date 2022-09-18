class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.string :date
      t.integer :number_players
      t.integer :number_games
      t.references :tournament, null: false, foreign_key: true

      t.timestamps
    end
  end
end
