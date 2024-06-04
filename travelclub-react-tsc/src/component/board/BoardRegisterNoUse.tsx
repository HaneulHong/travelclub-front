
import React, { useEffect, useState } from "react";
import { postBoard } from "api/boardApi";
import { getClubById, getClubByName } from "../../api/clubApi"; // 수정된 클럽 API
import { getAllMembershipsOfClub } from "../../api/membershipApi";
import { useNavigate } from "react-router-dom";
import { MembershipData } from "store/membershipAtom";
import { useAtom } from "jotai";
import { isLogInAtom } from "store/loginAtom";
import { boardDataAtom } from "store/boardAtom";

const BoardRegisterNoUse = () => {
  const [board, setBoard] = useAtom(boardDataAtom);
  const [fetching, setFetching] = useState(false);
  const [clubList, setClubList] = useState([]);
  const [clubId, setClubId] = useState("");
  const [isLogIn] = useAtom(isLogInAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogIn) {
      alert("로그인 후 등록해주세요.");
      navigate("/member/login");
    }
  }, [isLogIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoard({ ...board, [e.target.name]: e.target.value });
  };

  const handleClubSelect = async (clubId: string) => {
    try {
      const club = await getClubById(clubId);
      setBoard({ ...board, clubName: club.name });
    } catch (error) {
      console.error(error);
      alert("클럽 정보를 가져오는 중 오류가 발생했습니다.");
    }
    setClubList([]);
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
  
  const handleClubClick = (clubId: string) => {
    handleClubSelect(clubId); 
    setClubId(clubId);
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
  
        console.log(club)
        console.log(club.id)
  
        const memberships = await getAllMembershipsOfClub(clubId);
        console.log(memberships)
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
        navigate("/board/posting");
      } catch (error) {
        console.error(error);
        alert("게시판 등록 중 오류가 발생했습니다.");
        setFetching(false);
      }  
  
  };

  const formatDate = (timestamp:string) => {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-4 text-gray-800">게시판 등록</div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-800">
          게시판 이름:
        </label>
        <input
          type="text"
          name="name"
          placeholder="게시판명"
          value={board.name}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="clubName" className="block text-sm font-medium text-gray-800">
          클럽 이름:
        </label>
        <input
          type="text"
          name="clubName"
          placeholder="클럽명"
          value={board.clubName}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <button
          type="button"
          className="btn btn-neutral m-2"
          onClick={handleClickSearch}
        >
          클럽 검색
        </button>
        {clubList.length > 0 && (
          <div>
            {clubList.map((club: any) => (
              <div key={club.id} className="border-gary-200  flex justify-between"
              onClick={() => handleClubClick(club.id)}>
              <div className="flex-col flex-1 min-w-0 whitespace-nowrap">
                <div className="text-base font-semibold text-ellipsis overflow-hidden">
                  {club.name}
                </div>
                <div className="text-sm text-gray-500">{club.intro}</div>
              </div>
              <div className="flex justify-between w-1/3 min-w-36 items-end text-sm flex-col flex-1">
                <div className="text-nowrap">클럽 ID : {club.id}</div>
                <div className="">
                  창립일 : {formatDate(club.foundationTime)}
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full flex justify-end">
        <button
          type="button"
          className="btn btn-neutral w-24 mr-4 mb-4"
          onClick={handleClickAdd}
          disabled={fetching}
        >
          {fetching ? "등록" : "등록"}
        </button>
        <button
          type="button"
          className="btn w-24 btn-neutral"
          onClick={() => { navigate('/board') }}
        >
          뒤로
        </button>
      </div>
    </div>
  );
};

export default BoardRegisterNoUse;