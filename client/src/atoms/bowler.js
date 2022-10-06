import { atom } from "recoil";

export const bowlerState = atom({
  key: 'bowlerState',
  default: {
    id: null,
    last_name: '',
    first_name: '',
    street_address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    phone: '',
    left_handed: false,
    total_pins: '',
    total_games: '',
    handicap: '',
    team_id: '',
    user_id: ''
  },
});