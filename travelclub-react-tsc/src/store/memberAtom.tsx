import { atom } from "jotai";

export interface MemberData {
    email: string;
    password: string | undefined;
    name: string;
    nickName: string;
    phoneNumber: string;
    birthDay: string;
}

export const memberDataAtom = atom<MemberData>({
    email: "",
    password: "",
    name: "",
    nickName: "",
    phoneNumber: "",
    birthDay: "",
})

