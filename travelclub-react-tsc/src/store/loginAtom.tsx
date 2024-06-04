import {atom} from "jotai";

export interface LoginData {
    email: string;
    password: string;
}

export const loginDataAtom = atom<LoginData> ({
    email: "",
    password: "",
})

export const isLogInAtom = atom<boolean>(false);

export const isLogin = atom(null, (_, set) => {
    set(isLogInAtom, true);
});
  
export const notLogin = atom(null, (_, set) => {
    set(isLogInAtom, false);
});