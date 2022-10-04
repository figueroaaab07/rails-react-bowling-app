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
    left_handed: 0,
    total_pins: null,
    total_games: null,
    handicap: null,
    team_id: null,
    user_id: null
  },
});