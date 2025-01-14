import React from "react";
import { IoIosSearch } from "react-icons/io";
import "./style.css";

function SearchBar({ onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search movies..."
        onChange={handleInputChange}
        className="search-bar"
      />
      <IoIosSearch className="search-icon" />
    </div>
  );
}

export default SearchBar;
