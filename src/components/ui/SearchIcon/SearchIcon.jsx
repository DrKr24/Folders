import React from "react";
import SearchIconInput from "./search-icon.png";
import classes from "./searchicon.module.css";

const SearchIcon = () => {
  return (
    <div className={classes.searchContainer}>
      <img className={classes.search} src={SearchIconInput} alt="Search" />
    </div>
  );
};

export default SearchIcon;
