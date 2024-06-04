import React, { useState, useEffect } from "react";
import { getClubById } from "../../api/clubApi";
import { useParams } from "react-router-dom";
import { clubDataAtom } from "store/clubAtom";
import { useAtom } from "jotai";
import { isLogInAtom, loginDataAtom } from "store/loginAtom";
import {
  getAllMembershipsOfClub,
  postMembership,
  deleteMembership,
} from "api/membershipApi";
import { getMemberByEmail } from "../../api/meberApi";
import { MemberData } from "store/memberAtom";

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

interface MembershipData {
  clubId: string;
  memberEmail: string;
  role: string;
}

interface MemberWithRole {
  member: MemberData;
  role: string;
}

const ClubDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [club, setClub] = useAtom(clubDataAtom);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<MemberWithRole[]>([]);
  const [loginData] = useAtom(loginDataAtom);
  const [isLogIn] = useAtom(isLogInAtom);

  const handleClickMembershipJoin = async () => {
    if (id) {
      const membershipData: MembershipData = {
        clubId: id,
        memberEmail: loginData.email,
        role: "Member",
      };
      await postMembership(membershipData);
      alert("회원의 멤버십이 성공적으로 등록되었습니다.");
      fetchMembers();
    }
  };

  const handleClickDeleteMembership = async (memberEmail: string) => {
    if (id) {
      await deleteMembership("");
      alert("멤버십이 성공적으로 삭제되었습니다.");
      fetchMembers();
    }
  };

  const fetchMembers = async () => {
    if (id) {
      setLoading(true);
      try {
        const memberships = await getAllMembershipsOfClub(id);
        const memberPromises = memberships.map(
          async (membership: { memberEmail: string; role: string }) => {
            const memberData = await getMemberByEmail(membership.memberEmail);
            return { member: memberData, role: membership.role };
          }
        );
        const memberDataWithRoles = await Promise.all(memberPromises);
        setMembers(memberDataWithRoles);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getClubById(id)
        .then((data) => {
          setClub(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
      fetchMembers();
    }
  }, [id, setClub]);

  if (loading) {
    return <div className="loading loading-spinner text-neutral"></div>;
  }

  if (!club) {
    return <div>Club not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="loading loading-spinner text-neutral"></div>
      ) : (
        <div>
          <div className="text-2xl font-bold mb-4 text-gray-800">클럽 상세</div>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-800 ">
              클럽명
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full mb-4">
              {club.name}
            </div>
            <label className="block text-lg font-medium text-gray-800 ">
              클럽소개
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full mb-4">
              {club.intro}
            </div>
            <label className="block text-lg font-medium text-gray-800">
              클럽ID
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full mb-4">
              {club.id}
            </div>
            <label className="block text-lg font-medium text-gray-800">
              설립일
            </label>
            <div className="collapse bg-base-200 collapse-title text-xl font-medium w-full mb-4">
              {formatDate(club.foundationTime)}
            </div>
          </div>
          {isLogIn ? (
            <div>
              <button
                className="btn btn-neutral w-full mb-4"
                onClick={handleClickMembershipJoin}
              >
                클럽 가입하기
              </button>
            </div>
          ) : null}
          <button className="btn btn-neutral w-full mb-4">클럽 수정하기</button>
          <div className="divider divider-neutral mb-4"></div>
          <div className="text-2xl font-bold text-gray-800 mb-4">클럽 회원</div>
          {members.length > 0 ? (
            members.map(({ member, role }) => (
              <div
                key={member.email}
                className="collapse collapse-title bg-base-200 w-full flex justify-between items-center mb-4"
              >
                <div>
                  <div>{member.email}</div>
                  <div>{member.name}</div>
                </div>
                <div>
                  <div>{member.nickName}</div>
                  <div>{member.phoneNumber}</div>
                </div>
                <div>
                  <div>{member.birthDay}</div>
                  <div>{role}</div>
                </div>
                {role === "Member" && (
                  <button
                    className="btn btn-neutral justify-end"
                    onClick={() => handleClickDeleteMembership(member.email)}
                  >
                    멤버십 삭제
                  </button>
                )}
              </div>
            ))
          ) : (
            <div>클럽에 가입된 멤버가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClubDetail;
