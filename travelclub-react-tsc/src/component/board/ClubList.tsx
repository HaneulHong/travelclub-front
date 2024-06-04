// ClubList.tsx
import React from "react";

interface ClubListProps {
  clubList: { id: string; name: string; intro: string; foundationTime: string }[];
  handleClubClick: (clubId: string) => void;
  formatDate: (timestamp: string) => string;
}

const ClubList: React.FC<ClubListProps> = ({ clubList, handleClubClick, formatDate }) => {
  return (
    <div>
      {clubList.length > 0 && (
        <div>
          {clubList.map((club) => (
            <div
              key={club.id}
              className="border-gary-200  flex justify-between"
              onClick={() => handleClubClick(club.id)}
            >
              <div className="flex-col flex-1 min-w-0 whitespace-nowrap">
                <div className="text-base font-semibold text-ellipsis overflow-hidden">
                  {club.name}
                </div>
                <div className="text-sm text-gray-500">{club.intro}</div>
              </div>
              <div className="flex justify-between w-1/3 min-w-36 items-end text-sm flex-col flex-1">
                <div className="text-nowrap">클럽 ID : {club.id}</div>
                <div className="">창립일 : {formatDate(club.foundationTime)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClubList;
