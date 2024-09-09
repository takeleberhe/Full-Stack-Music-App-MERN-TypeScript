import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../Redux/Features/songSlice";
const Search: React.FC = () => {
  const dispatch = useDispatch();
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };
  return (
    <div className="flex-1 mx-4">
      <input
        type="text"
        placeholder="Search songs..."
        className="w-full p-2 rounded-md"
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
