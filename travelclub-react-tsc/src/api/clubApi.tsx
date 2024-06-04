import axios from "axios";


const clubApi:string = "http://localhost:8080/club";

interface ClubData {
    name: string;
    intro: string;
}

export const postClub = async (ClubData:ClubData) => {
  const response = await axios.post(`${clubApi}`, ClubData);

  return response.data;
};

export const getAll = async () => {
  const response = await axios.get(`${clubApi}/all`);

  return response.data;
};

export const getClubById = async (clubId:string) => {
  const response = await axios.get(`${clubApi}/${clubId}`);

  return response.data;
};

export const getClubByName = async (clubName:string) => {
  const response = await axios.get(`${clubApi}?name=${clubName}`);

  return response.data;
};

export const putClub = async (clubId:string, nameValueList:ClubData) => {
  console.log(clubId)
  console.log(nameValueList)
  await axios.put(`${clubApi}/${clubId}`, nameValueList);
};

export const deleteClub = async (clubId:string) => {
  await axios.delete(`${clubApi}/${clubId}`);
};
