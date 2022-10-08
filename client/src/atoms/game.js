import { atom } from "recoil";

export const gameState = atom({
  key: 'gameState',
  default: {
    game_id: null,
    game_number: null,
    match_team_id: null,
    match_team_lanes: '',
    guest_team_id: null,
    guest_team_name: '',
    guest_team_logo: '',
    home_team_id: null,
    home_team_name: '',
    home_team_logo: '',
    match_id: null,
    match_date: '',
    match_number_games: null,
    match_number_players: null,
    tournament_id: null,
    tournament_name: '',
    tournament_start_date: '',
    tournament_end_date: '',
    tournament_number_dates: null,
    location_id: null,
    location_name: ''
  },
});
