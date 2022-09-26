import { atom } from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    id: '',
    email: '',
    password_digest: '',
    role: 0
  },
});
