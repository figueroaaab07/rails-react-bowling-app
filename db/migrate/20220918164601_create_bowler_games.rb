class CreateBowlerGames < ActiveRecord::Migration[6.1]
  def change
    create_table :bowler_games do |t|
      t.integer :game_score
      t.references :bowler, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
