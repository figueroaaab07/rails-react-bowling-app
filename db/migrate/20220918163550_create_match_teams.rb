class CreateMatchTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :match_teams do |t|
      t.string :lanes
      t.references :match, null: false, foreign_key: true
      t.references :team, null: false, foreign_key: true

      t.timestamps
    end
  end
end
