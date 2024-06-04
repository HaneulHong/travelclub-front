import React, { useEffect, useState } from "react";
import { postMember, getMemberByEmail } from "../../api/meberApi";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { MemberData, memberDataAtom } from "store/memberAtom";
import { isLogInAtom } from "store/loginAtom";

const MemberRegister = () => {
  const [member, setMember] = useState<MemberData>({
    email: "",
    password: "",
    name: "",
    nickName: "",
    phoneNumber: "",
    birthDay: "",
  });
  const [isLogin] = useAtom(isLogInAtom);
  const [fetching, setFetching] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      alert("이미 로그인 되었습니다.");
      navigate("/");
    }
  }, [isLogin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleClickAdd = async () => {
    if (
      !member.email ||
      !member.password ||
      !member.name ||
      !member.phoneNumber
    ) {
      alert("메일, 비밀번호, 이름, 전화번호를 입력해주세요.");
      return;
    }
    if (!validateEmail(member.email)) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }
    if (!validatePhoneNumber(member.phoneNumber)) {
      alert("유효한 전화번호를 입력해주세요.");
      return;
    }
    setFetching(true);

    try {
      const existingMember = await getMemberByEmail(member.email);
      if (existingMember) {
        alert("이미 등록된 이메일입니다.");
        setFetching(false);
        return;
      }
    } catch (error) {
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
      setFetching(false);
      return;
    }

    try {
      await postMember(member);
      setFetching(false);
      alert("멤버가 성공적으로 등록되었습니다.");
      navigate("/");
    } catch (error) {
      setFetching(false);
      alert(`오류: ${error}`);
    }
  };

  const validateEmail = (email: string) => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailTest.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneTest = /^(010-?\d{4}-?\d{4})$/;
    return phoneTest.test(phoneNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="text-2xl font-bold mb-4 text-gray-800">회원가입</div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg mb-2 font-medium">
            이메일 :
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={member.email}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-lg mb-2 font-medium">
            비밀번호 :
          </label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={member.password}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg mb-4 font-medium">
            이름 :
          </label>
          <input
            type="text"
            name="name"
            placeholder="홍길동"
            value={member.name}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nickName" className="block text-lg mb-4 font-medium">
            별명 :
          </label>
          <input
            type="text"
            name="nickName"
            placeholder="별명"
            value={member.nickName}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-lg font-medium">
            핸드폰 :
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="010-1234-5678"
            value={member.phoneNumber}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xl"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthDay" className="block text-lg mb-4 font-medium">
            생년월일 :
          </label>
          <input
            type="date"
            name="birthDay"
            placeholder="1990-01-01"
            value={member.birthDay}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xl"
          />
        </div>
        <div className="w-full flex justify-end">
          <button
            type="button"
            className="w-24 mb-4 mr-4 btn btn-neutral"
            onClick={handleClickAdd}
            disabled={fetching}
          >
            {fetching ? "등록" : "등록"}
          </button>
          <button
            type="button"
            className="w-24 mb-4 btn btn-neutral"
            onClick={() => navigate("/")}
          >
            뒤로
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberRegister;
