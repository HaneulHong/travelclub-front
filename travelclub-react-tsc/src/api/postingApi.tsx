import axios from "axios";

const postingAPI:string = "http://localhost:8080/posting";

interface PostingData {
  title: string;
  contetns: string;
}

export const postPosting = async (postingData:PostingData) => {
  const response = await axios.post(`${postingAPI}`, postingData);

  return response.data;
};

export const getPostingById = async (postingId:string) => {
  const response = await axios.get(`${postingAPI}/${postingId}`);

  return response.data;
};

export const getPostingByBoardId = async (boardId:string) => {
  const response = await axios.get(`${postingAPI}/all/${boardId}`);

  return response.data;
};

export const putPosting = async (postingId:string, nameValueList:PostingData) => {
  await axios.put(`${postingAPI}/${postingId}`, nameValueList);
};

export const deletePosting = async (postingId:string) => {
  await axios.delete(`${postingAPI}/${postingId}`);
};

export const deleteAllByBoardId = async (boardId:string) => {
  await axios.delete(`${postingAPI}/all/${boardId}`);
};
