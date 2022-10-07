import { atom } from "recoil";
import { format } from 'date-fns'

export const matchState = atom({
  key: 'matchState',
  default: {
    id: null,
    date: format(new Date(), 'yyyy-MM-dd'),
    number_players: '',
    number_games: '',
    tournament_id: ''
  },
});
