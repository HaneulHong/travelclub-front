import React, { useEffect, useState } from "react";
import { postLogin } from "../../api/meberApi";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { loginDataAtom, isLogInAtom } from "../../store/loginAtom";

const MemberLogin= () => {
  const [loginData, setLoginData] = useAtom(loginDataAtom);
  const [fetching, setFetching] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogIn] = useAtom(isLogInAtom);

  useEffect(() => {
    if (isLogin) {
        alert("이미 로그인 되었습니다.")
        navigate('/');
    }
}, [isLogin, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    setFetching(true);

    try {
      const response = await postLogin(loginData);

      if (response) {
        setIsLogIn(true);
        alert("로그인이 성공!")
        navigate("/");
      } else {
        console.log(response)
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        setFetching(false);
      }
    } catch (error) {
      alert(`로그인 중 오류가 발생했습니다: ${error}`);
      setFetching(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-4">로그인</div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg mb-4 font-medium">
          이메일:
        </label>
        <input
          type="email"
          name="email"
          placeholder="example@example.com"
          value={loginData.email}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xl"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-lg mb-4 font-medium">
          비밀번호:
        </label>
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginData.password}
          onChange={handleChange}
          className="input input-bordered w-full max-w-xl"
        />
      </div>
      <div className="w-full flex justify-end">
      <button
        type="button"
        className="w-24 mb-4 btn btn-neutral"
        onClick={handleClickLogin}
        disabled={fetching}
      >
        {fetching ? "로그인" : "로그인"}
      </button>
      </div>
    </div>
  );
};

export default MemberLogin;
