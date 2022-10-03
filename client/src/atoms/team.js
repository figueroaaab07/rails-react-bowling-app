import { atom } from "recoil";

export const teamState = atom({
  key: 'teamState',
  default: {
    id: null,
    name: '',
    logo: ''
  },
});