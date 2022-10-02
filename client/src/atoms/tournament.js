import { atom } from "recoil";

export const tournamentState = atom({
  key: 'tournamentState',
  default: {
    id: null,
    name: '',
    start_date: '',
    end_date: '',
    number_dates: '',
    location_id: ''
  },
});