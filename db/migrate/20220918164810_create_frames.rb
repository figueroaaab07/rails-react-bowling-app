class CreateFrames < ActiveRecord::Migration[6.1]
  def change
    create_table :frames do |t|
      t.integer :frame_number
      t.string :ball_one_pins
      t.string :ball_two_pins
      t.string :ball_three_pins
      t.integer :frame_score
      t.references :bowler_game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
