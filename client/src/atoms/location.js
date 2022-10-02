import { atom } from "recoil";

export const locationState = atom({
  key: 'locationState',
  default: {
    id: null,
    name: '',
    street_address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    phone: '',
    number_lanes: ''
  },
});
