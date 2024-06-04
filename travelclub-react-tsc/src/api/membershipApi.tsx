import axios from "axios";

const membershipApi:string = "http://localhost:8080/membership";

interface MembershipData {
  clubId: string;
  memberEmail: string;
  role: string;
}

export const postMembership = async (membershipData:MembershipData) => {
  const response = await axios.post(`${membershipApi}`, membershipData);

  return response.data;
};

export const getMembershipById = async (membershipId:string) => {
  const response = await axios.get(`${membershipApi}/${membershipId}`);

  return response.data;
};

// export const getMembershipByClubIdAndMemberId = async (clubId:string, memberId:string) => {
//   const response = await axios.get(
//     `${membershipApi}/club/${clubId}/member/${memberId}`);

//   return response.data;
// };

export const getMembershipByClubIdAndMemberEmail = async (clubId:string, memberEmail:string) => {
  const response = await axios.get(
    `${membershipApi}/club/${clubId}/email/${memberEmail}`);

  return response.data;
};

export const getAllMembershipsOfClub = async (clubId:string) => {
  const response = await axios.get(`${membershipApi}/club/${clubId}`);

  return response.data;
};

export const getAllMembershipsOfMember = async (memberId:string) => {
  const response = await axios.get(`${membershipApi}/member/${memberId}`);

  return response.data;
};

export const putMembership = async (membershipId:string, nameValueList:MembershipData) => {
  await axios.put(`${membershipApi}/${membershipId}`, nameValueList);
};

export const deleteMembership = async (membershipId:string) => {
  await axios.delete(`${membershipApi}/${membershipId}`);
};
