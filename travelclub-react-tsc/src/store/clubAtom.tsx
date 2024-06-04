import { atom } from "jotai";

export interface ClubData {
    id: string;
    name: string;
    intro: string;
    foundationTime: string;
}

export const clubDataAtom = atom<ClubData>({
    id: "",
    name: "",
    intro: "",
    foundationTime: "",
});

