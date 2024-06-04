// BoardRegister.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { isLogInAtom } from "store/loginAtom";
import BoardInput from "./BoardInput";
import ClubList from "./ClubList";
import { postBoard } from "api/boardApi";
import { getClubByName } from "../../api/clubApi";
import { getAllMembershipsOfClub } from "api/membershipApi";
import { MembershipData } from "store/membershipAtom";

const BoardRegister: React.FC = () => {
  const [board, setBoard] = useState({ name: "", clubName: "" });
  const [fetching, setFetching] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [clubId, setClubId] = useState("");
  const [isLogIn] = useAtom(isLogInAtom);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleClubClick = (clubId: string) => {
    setClubId(clubId);
    setClubList([]);
  };

  const handleClickAdd = async (e: React.FormEvent) => {
    if (!board.name || !board.clubName) {
      alert("게시판 이름과 클럽 이름을 입력해주세요.");
      return;
    }

    setFetching(true);

    try {
      const club = await getClubByName(board.clubName);
      if (!club) {
        alert("해당 클럽이 존재하지 않습니다.");
        setFetching(false);
        return;
      }

      const memberships = await getAllMembershipsOfClub(clubId);
      const presidentMembership = memberships.find(
        (membership: MembershipData) => membership.role === "President"
      );

      if (!presidentMembership) {
        alert("해당 클럽에 President 역할을 가진 멤버가 없습니다.");
        setFetching(false);
        return;
      }

      await postBoard({ name: board.name, adminEmail: presidentMembership.memberEmail });
      alert("게시판이 성공적으로 등록되었습니다.");
      navigate("/board");
    } catch (error) {
      console.error(error);
      alert("게시판 등록 중 오류가 발생했습니다.");
      setFetching(false);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const handleClickSearch = async () => {
    if (!board.clubName) {
      alert("검색할 클럽 이름을 입력해주세요.");
      return;
    }

    try {
      const foundClubs = await getClubByName(board.clubName);
      setClubList(foundClubs);
    } catch (error) {
      console.error(error);
      alert("클럽 검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-4 text-gray-800">게시판 등록</div>
      <BoardInput board={board} setBoard={setBoard} handleChange={handleChange} />
      <button
        type="button"
        className="btn btn-neutral m-2"
        onClick={handleClickSearch}
      >
        클럽 검색
      </button>
      <ClubList clubList={clubList} handleClubClick={handleClubClick} formatDate={formatDate} />
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="btn btn-neutral w-24 mr-4 mb-4"
          onClick={handleClickAdd}
          disabled={fetching}
        >
          {fetching ? "등록 중..." : "등록"}
        </button>
        <button
          type="button"
          className="btn w-24 btn-neutral"
          onClick={() => {
            navigate("/board");
          }}
        >
          뒤로
        </button>
      </div>
    </div>
  );
};

export default BoardRegister;
