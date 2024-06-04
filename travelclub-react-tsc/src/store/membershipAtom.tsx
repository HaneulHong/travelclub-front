import { atom } from "jotai";

export interface MembershipData {
    id:string
    clubId: string;
    memberEmail: string;
    role: string;
    joinDate: string;
}

export const membershipDataAtom = atom<MembershipData> ({
    id: "",
    clubId: "",
    memberEmail: "",
    role: "",
    joinDate: ""
})