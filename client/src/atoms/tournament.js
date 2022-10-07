import { atom } from "recoil";
import { format } from 'date-fns'

export const tournamentState = atom({
  key: 'tournamentState',
  default: {
    id: null,
    name: '',
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd'),
    number_dates: '',
    location_id: ''
  },
});