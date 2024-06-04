import { atom } from "jotai";

export interface BoardData {
  id: string;
  name: string;
  clubName: string;
  adminEmail: string;
  createDate: string;
}

export const boardDataAtom = atom<BoardData>({
  id: "",
  name: "",
  clubName: "",
  adminEmail: "",
  createDate: "",
});
