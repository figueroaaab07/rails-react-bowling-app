# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_09_18_164810) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bowler_games", force: :cascade do |t|
    t.integer "game_score"
    t.bigint "bowler_id", null: false
    t.bigint "game_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bowler_id"], name: "index_bowler_games_on_bowler_id"
    t.index ["game_id"], name: "index_bowler_games_on_game_id"
  end

  create_table "bowlers", force: :cascade do |t|
    t.string "last_name"
    t.string "first_name"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.string "country"
    t.string "phone"
    t.boolean "left_handed"
    t.integer "total_pins"
    t.integer "total_games"
    t.integer "handicap"
    t.bigint "team_id", null: false
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_id"], name: "index_bowlers_on_team_id"
    t.index ["user_id"], name: "index_bowlers_on_user_id"
  end

  create_table "frames", force: :cascade do |t|
    t.integer "frame_number"
    t.string "ball_one_pins"
    t.string "ball_two_pins"
    t.string "ball_three_pins"
    t.integer "frame_score"
    t.bigint "bowler_game_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bowler_game_id"], name: "index_frames_on_bowler_game_id"
  end

  create_table "games", force: :cascade do |t|
    t.integer "game_number"
    t.integer "home_team_score"
    t.integer "guest_team_score"
    t.bigint "match_team_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["match_team_id"], name: "index_games_on_match_team_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.string "country"
    t.string "phone"
    t.integer "number_lanes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "match_teams", force: :cascade do |t|
    t.string "lanes"
    t.bigint "match_id", null: false
    t.bigint "home_team_id", null: false
    t.bigint "guest_team_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["guest_team_id"], name: "index_match_teams_on_guest_team_id"
    t.index ["home_team_id"], name: "index_match_teams_on_home_team_id"
    t.index ["match_id"], name: "index_match_teams_on_match_id"
  end

  create_table "matches", force: :cascade do |t|
    t.string "date"
    t.integer "number_players"
    t.integer "number_games"
    t.bigint "tournament_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tournament_id"], name: "index_matches_on_tournament_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "logo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tournaments", force: :cascade do |t|
    t.string "name"
    t.string "start_date"
    t.string "end_date"
    t.integer "number_dates"
    t.bigint "location_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["location_id"], name: "index_tournaments_on_location_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.integer "role"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "bowler_games", "bowlers"
  add_foreign_key "bowler_games", "games"
  add_foreign_key "bowlers", "teams"
  add_foreign_key "bowlers", "users"
  add_foreign_key "frames", "bowler_games"
  add_foreign_key "games", "match_teams"
  add_foreign_key "match_teams", "matches"
  add_foreign_key "match_teams", "teams", column: "guest_team_id"
  add_foreign_key "match_teams", "teams", column: "home_team_id"
  add_foreign_key "matches", "tournaments"
  add_foreign_key "tournaments", "locations"
end
