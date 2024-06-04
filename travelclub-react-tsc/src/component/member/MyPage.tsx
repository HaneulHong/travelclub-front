import React, { useState, useEffect } from "react";
import { getMemberByEmail } from "../../api/meberApi";
import { getAllMembershipsOfMember, deleteMembership } from "api/membershipApi";
import { ClubData, clubDataAtom } from "store/clubAtom";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLogInAtom, loginDataAtom } from "store/loginAtom";
import { memberDataAtom } from "store/memberAtom";
import { MembershipData } from "store/membershipAtom";
import { getClubById } from "api/clubApi";

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const MyPage = () => {
  const [member, setMember] = useAtom(memberDataAtom);
  const [clubInfo, setClubInfo] = useAtom(clubDataAtom);
  const [clubList, setClubList] = useState<
    (ClubData & { membershipId: string; role: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLogIn] = useAtom(isLogInAtom);
  const [loginData] = useAtom(loginDataAtom);
  const navigate = useNavigate();

  const fetchMemberData = async () => {
    try {
      const email = loginData.email;
      const memberData = await getMemberByEmail(email);
      setMember(memberData);

      const membershipList = await getAllMembershipsOfMember(email);
      const clubDataPromises = membershipList.map(
        async (membership: MembershipData) => {
          const clubInfo = await getClubById(membership.clubId);
          return {
            id: clubInfo.id,
            name: clubInfo.name,
            intro: clubInfo.intro,
            foundationTime: clubInfo.foundationTime,
            membershipId: membership.id,
            role: membership.role,
          };
        }
      );
      const clubListData = await Promise.all(clubDataPromises);
      setClubList(clubListData);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleDeleteMembership = async (membershipId: string) => {
    try {
      await deleteMembership(membershipId);
      alert("멤버십이 성공적으로 삭제되었습니다.");
      fetchMemberData();
    } catch (error) {
      console.error(error);
      alert("멤버십 삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    if (!isLogIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/member/login");
    } else {
      fetchMemberData();
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="loading loading-spinner text-neutral"></div>
      ) : (
        <div>
          {member && (
            <div>
              <div className="text-2xl font-bold mb-4 text-gray-800">
                회원 정보
              </div>
              <div className="collapse collapse-title bg-base-200 w-full flex justify-between items-center mb-4">
                <div>
                  <div>이 름: {member.name}</div>
                  <div>메 일: {member.email}</div>
                  <div>별 명: {member.nickName}</div>
                  <div>전화번호: {member.phoneNumber}</div>
                  <div>생년월일: {member.birthDay}</div>
                </div>
                <button className="btn btn-neutral justify-end"
                onClick={() => navigate("/member/mypage/modify")}>
                  정보 수정
                </button>
              </div>
            </div>
          )}
          <div className="divider divider-neutral"/>
          <div>
            <div className="text-2xl font-bold mb-4">가입 클럽</div>
            <div>
              {clubList.map((club) => (
                <div
                  key={club.id}
                  className="w-full flex justify-between items-center mb-4"
                >
                  <div>
                    <div className="text-base font-semibold text-ellipsis overflow-hidden">
                      {club.name}
                    </div>
                    <div className="text-sm text-gray-500">{club.intro}</div>
                  </div>
                  <div className="flex justify-between w-1/3 min-w-36 items-end text-sm flex-col flex-1 mr-4">
                    <div className="text-nowrap">역할 : {club.role}</div>
                    <div className="">
                      창립일 : {formatDate(club.foundationTime)}
                    </div>
                  </div>
                  <button
                    className="btn btn-neutral mt-2"
                    onClick={() => handleDeleteMembership(club.membershipId)}
                  >
                    클럽 탈퇴
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
