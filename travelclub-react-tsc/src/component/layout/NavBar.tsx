import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { isLogInAtom, loginDataAtom, notLogin } from '../../store/loginAtom';

const NavBar = () => {
  const [isLogIn, setIsLogIn] = useAtom(isLogInAtom);
  const [, setNotLogIn] = useAtom(notLogin);
  const [, setLoginData] = useAtom(loginDataAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setNotLogIn();
      setLoginData({ email: "", password: "" });
      navigate('/'); 
    }
  };

  return (
    <div className="flex justify-center max-w-screen-xl mx-auto">
      <div role="tablist" className="flex justify-center tabs tabs-bordered"></div>
      <div className="navbar">
        <button className="btn btn-ghost text-xl font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "font-bold" : ""
            }
          >
            클럽
          </NavLink>
        </button>
        <button className="btn btn-ghost text-xl font-medium">
          <NavLink
            to="/board"
            className={({ isActive }) =>
              isActive ? "font-bold" : ""
            }
          >
            게시판
          </NavLink>
        </button>
        
        {!isLogIn ? (
          <>
            <button className="btn btn-ghost text-xl font-medium">
              <NavLink
                to="/member/login"
                className={({ isActive }) =>
                  isActive ? "font-bold" : ""
                }
              >
                로그인
              </NavLink>
            </button>
            <button className="btn btn-ghost text-xl font-medium">
              <NavLink
                to="/member/register"
                className={({ isActive }) =>
                  isActive ? "font-bold" : ""
                }
              >
                회원가입
              </NavLink>
            </button>
          </>
        ) : (
          <>
          <button className="btn btn-ghost text-xl font-medium">
          <NavLink
            to="/member/mypage"
            className={({ isActive }) =>
              isActive ? "font-bold" : ""
            }
          >
            마이페이지
          </NavLink>
        </button>
          <button className="btn btn-ghost text-xl font-medium"
            onClick={handleLogout}>
            로그아웃
          </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
