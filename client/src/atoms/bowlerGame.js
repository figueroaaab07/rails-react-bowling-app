import { atom } from "recoil";

export const bowlerGameState = atom({
  key: 'bowlerGameState',
  default: {id: null,
    checked: false,
    bowler_id: null,
    bowler_first_name: '',
    bowler_last_name: '',
    game_id: ''
  },
});
