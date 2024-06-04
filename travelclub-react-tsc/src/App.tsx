import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./page/Main";
import MemberRegister from "component/member/MemberRegister";
import ClubList from "component/club/ClubList";
import ClubRegister from "component/club/ClubRegister";
import MemberLogin from "component/member/MemberLogin";
import MyPage from "component/member/MyPage";
import ClubDetail from "component/club/ClubDetail";
import BoardList from "component/board/BoardList";
import MyPageModify from "component/member/MyPageModify";
import BoardRegister from "component/board/BoardRegister";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="/" element={<ClubList/>}/>
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/register" element={<BoardRegister />} />
        <Route path="/club/register" element={<ClubRegister/>}/>
        <Route path="club/:id" element={<ClubDetail />} />
        <Route path="/member/mypage" element={<MyPage/>}/>
        <Route path="/member/mypage/modify" element={<MyPageModify/>}/>
        <Route path="/member/register" element={<MemberRegister />} />
        <Route path="/member/login" element={<MemberLogin/>}/>
      </Route>
    </Routes>
  );
};

export default App;
