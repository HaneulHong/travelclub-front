import React from "react";

interface BoardInputProps {
  board: { name: string; clubName: string };
  setBoard: React.Dispatch<React.SetStateAction<{ name: string; clubName: string }>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BoardInput: React.FC<BoardInputProps> = ({ board, setBoard, handleChange }) => {
  return (
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
      <label htmlFor="clubName" className="block text-sm font-medium text-gray-800 mt-4">
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
    </div>
  );
};

export default BoardInput;
