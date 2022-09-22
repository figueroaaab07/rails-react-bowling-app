class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :game_number
      t.integer :home_team_score
      t.integer :guest_team_score
      t.references :match_team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
