import { atom } from "recoil";

export const matchState = atom({
  key: 'matchState',
  default: {
    id: null,
    date: '',
    number_players: '',
    number_games: '',
    tournament_id: ''
  },
});
