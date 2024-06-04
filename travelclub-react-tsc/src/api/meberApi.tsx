import axios from "axios";
import { MemberData } from "../store/memberAtom"
import { LoginData } from "store/loginAtom";

const memberApi:string = "http://localhost:8080/member";

export const postMember = async (memberData:MemberData) => {
  const response = await axios.post(`${memberApi}`, memberData);

  return response.data;
};

export const postLogin = async (memberData:LoginData) => {
  const response = await axios.post(`${memberApi}/login`, memberData);

  return response.data;
}

// export const getMemberById = async (memberId:string) => {
//   const response = await axios.get(`${memberApi}/${memberId}`);

//   return response.data;
// };

export const getMemberByEmail = async (memberEmail:string) => {
  const response = await axios.get(`${memberApi}/${memberEmail}`);

  return response.data;
};

export const getMemberByName = async (memberName:string) => {
  const response = await axios.get(`${memberApi}/list/${memberName}`);
  
  return response.data;
};

export const putMember = async (memberEamil:string, nameValueList:MemberData) => {
  await axios.put(`${memberApi}/${memberEamil}`, nameValueList);
};

export const deleteMember = async (memberEmail:string) => {
  await axios.delete(`${memberApi}/${memberEmail}`);
};
