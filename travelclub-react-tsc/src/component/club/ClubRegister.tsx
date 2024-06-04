import React, { useEffect, useState } from "react";
import { getClubByName, postClub } from "../../api/clubApi";
import { useNavigate } from "react-router-dom"
import { postMembership } from "../../api/membershipApi";
import { useAtom } from "jotai";
import { isLogInAtom, loginDataAtom } from "store/loginAtom";
import { clubDataAtom } from "store/clubAtom";

const ClubRegister = () => {
  const [club, setClub] = useAtom(clubDataAtom);
  const [findClub, setFindClub] = useAtom(clubDataAtom);
  const [fetching, setFetching] = useState(false);
  const [isLogIn,] = useAtom(isLogInAtom);
  const [loginData] = useAtom(loginDataAtom);
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogIn) {
        alert("로그인 후 등록해주세요.")
        navigate('/member/login');
    }
}, [isLogIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClub({ ...club, [e.target.name]: e.target.value });
  };

  const handleClickAdd = async (e: React.FormEvent) => {
    if (!club.name || !club.intro) {
      alert("클럽명과 클럽소개를 입력해주세요.");
      return;
    }
    if (club.name.length < 3) {
      alert("클럽명은 3글자 이상이어야 합니다.")
      return;
    }
    if (club.intro.length < 10) {
      alert("클럽소개는 10글자 이상이어야 합니다.");
      return;
    }

    setFetching(true);

    try {
      const clubData = await postClub(club);
      alert(`${club.name} 클럽이 성공적으로 등록되었습니다.`);

      getClubByName(club.name)
        .then((newClub) => 
          setFindClub(newClub)
      )

      const membershipData = {
        clubId: clubData,
        memberEmail: loginData.email,
        role: "President",
      };
      console.log(loginData.email);
      console.log(loginData);
      await postMembership(membershipData);
      alert("회원의 멤버십이 성공적으로 등록되었습니다.");

      setFetching(false);
      navigate("/");
    } catch (error) {
      setFetching(false);
      alert(`오류: ${error}`);
    }
  };

  return (

      <div className="container mx-auto p-4">
        <div className="text-2xl font-bold mb-4 text-gray-800">클럽 등록</div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-800"
          >
            클럽 이름:
          </label>
          <input
            type="text"
            name="name"
            placeholder="클럽명"
            value={club.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="intro"
            className="block text-sm font-medium text-gray-800"
          >
            클럽 소개:
          </label>
          <input
            type="text"
            name="intro"
            placeholder="클럽소개"
            value={club.intro}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
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
          onClick={() => { navigate('/') }}
        >
          뒤로
        </button>
        </div>
      </div>
  );
};

export default ClubRegister;
