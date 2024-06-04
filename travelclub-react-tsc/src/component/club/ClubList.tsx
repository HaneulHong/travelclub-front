import React, { useState, useEffect } from "react";
import { getAll } from "../../api/clubApi";
import { ClubData } from "store/clubAtom";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { isLogInAtom } from "store/loginAtom";


const formatDate = (timestamp:string) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const ClubList = () => {
  const [clubList, setClubList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogIn,] = useAtom(isLogInAtom);


  useEffect(() => {
    getAll()
      .then((data) => {
        setClubList(data);
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
        <div>
          {clubList.map((club:ClubData) => (
            <Link to={`/club/${club.id}`} key={club.id} className="border-gary-200 p-3 flex justify-between">
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
            </Link>
          ))}
        </div>
      )}
      {isLogIn ? (
        <div className="w-full flex justify-end">
      <Link to={"/club/register"} className="btn btn-neutral mr-4 mb-4">
            신규 클럽
      </Link>
      </div>
     ):(<></>) }
     </div>
  );
};

export default ClubList;