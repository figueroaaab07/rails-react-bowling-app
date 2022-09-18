class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :game_number
      t.references :match_team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
