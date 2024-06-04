import React, { useState, useEffect } from "react";
import { getMemberByEmail, putMember } from "../../api/meberApi"; // API 수정
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { memberDataAtom } from "store/memberAtom";
import { isLogInAtom, loginDataAtom } from "store/loginAtom";

const MyPageModify = () => {
  const [member, setMember] = useAtom(memberDataAtom);
  const [isLogIn] = useAtom(isLogInAtom);
  const [loginData] = useAtom(loginDataAtom);
  const navigate = useNavigate();

  const [name, setName] = useState(member.name || "");
  const [nickName, setNickName] = useState(member.nickName || "");
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber || "");
  const [birthDay, setBirthDay] = useState(member.birthDay || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (!isLogIn) {
      alert("로그인 후 이용해주세요.");
      navigate("/member/login");
    }
  }, [isLogIn, navigate]);

  const handleUpdateMember = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const updatedMember = {
        ...member,
        name,
        nickName,
        phoneNumber,
        birthDay,
        password: password ? password : undefined,
      };
      await putMember(member.email, updatedMember);
      setMember(updatedMember);
      alert("회원 정보가 성공적으로 수정되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error(error);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="text-2xl font-bold mb-4 text-gray-800">회원 정보 수정</div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="name">
            이름
          </label>
          <input
            type="text"
            id="name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="password">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor="confirmPassword"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="nickName">
            별명
          </label>
          <input
            type="text"
            id="nickName"
            className="input input-bordered w-full"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-lg font-medium mb-2"
            htmlFor="phoneNumber"
          >
            전화번호
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="input input-bordered w-full"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="birthDay">
            생년월일
          </label>
          <input
            type="date"
            id="birthDay"
            className="input input-bordered w-full"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            className="w-24 mb-4 mr-4 btn btn-neutral"
            onClick={handleUpdateMember}
          >
            정보 수정
          </button>
          <button
            type="button"
            className="w-24 mb-4 btn btn-neutral"
            onClick={() => navigate("/member/mypage")}
          >
            뒤로
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageModify;
