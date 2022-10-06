import { atom } from "recoil";

export const matchTeamState = atom({
  key: 'matchTeamState',
  default: {
    id: null,
    lanes: '',
    home_team_id: '',
    guest_team_id: '',
    match_id: ''
  },
});
