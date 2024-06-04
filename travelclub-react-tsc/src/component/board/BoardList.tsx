import React, { useState, useEffect } from "react";
import { getAll } from "../../api/boardApi";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { isLogInAtom } from "store/loginAtom";
import { BoardData } from "store/boardAtom";

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogIn] = useAtom(isLogInAtom);

  useEffect(() => {
    getAll()
      .then((data) => {
        setBoardList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="loading loading-spinner text-neutral"></div>
      ) : (
        <div className="mb-4">
          {boardList.map((board: BoardData) => (
            <Link
              to={`/board/${board.id}`}
              key={board.id}
              className="border-gary-200 flex justify-between"
            >
              <div className="flex-col flex-1 min-w-0 whitespace-nowrap mb-4">
                <div className="text-base font-semibold text-ellipsis">
                  {board.name}
                </div>
                <div className="text-sm text-gray-800">
                  관리자 이메일: {board.adminEmail}
                </div>
              </div>
              <div className="flex w-1/3 min-w-36 items-end text-sm flex-col flex-1">
                <div className="text-nowrap mb-1">보드 ID: {board.id}</div>
                <div className="">생성일: {formatDate(board.createDate)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {isLogIn ? (
        <div className="w-full flex justify-end">
          <Link to={"/board/register"} className="btn btn-neutral mb-4">
            신규 게시판
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BoardList;
