import axios from "axios";

const boardAPI:string = "http://localhost:8080/board";

interface BoardData {
  name: string;
  adminEmail: string;
}

export const postBoard = async (boardData:BoardData) => {
  const response = await axios.post(`${boardAPI}`, boardData);

  return response.data;
};

export const getAll = async () => {
  const response = await axios.get(`${boardAPI}/all`);

  return response.data;
};

export const getBoardById = async (boardId:string) => {
  const response = await axios.get(`${boardAPI}/${boardId}`);

  return response.data;
};

export const getBoardByBoardName = async (boardName:string) => {
  const response = await axios.get(`${boardAPI}/?name=${boardName}`);

  return response.data;
};

export const getBoardByClubName = async (clubName:string) => {
  const response = await axios.get(`${boardAPI}/club${clubName}`);

  return response.data;
};

export const putBoard = async (boardId:string, nameValueList:BoardData) => {
  await axios.put(`${boardAPI}/${boardId}`, nameValueList);
};

export const deleteBoard = async (boardId:string) => {
  await axios.delete(`${boardAPI}/${boardId}`);
};
