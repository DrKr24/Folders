import React from "react";
import classes from "./search.module.css";
import SearchIcon from "../ui/SearchIcon/SearchIcon";
import CancelIcon from "../ui/Cancel/CancelIcon";
import { isEmptyString } from "../../utils/utils";

const Search = (props) => {
  const { search, setSearch } = props;

  const searchHandler = (event) => setSearch(event.target.value);
  const searchActionHandler = (event) => {
    event.preventDefault();
    setSearch("");
  };

  return (
    <form className={classes.searchContainer}>
      <input
        className={classes.searchField}
        onInput={searchHandler}
        value={search}
        type="text"
        placeholder="Search..."
      />
      {isEmptyString(search) ? (
        <div className={classes.iconWrapper}>
          <SearchIcon />
        </div>
      ) : (
        <button onClick={searchActionHandler} className={classes.searchButton}>
          <CancelIcon />
        </button>
      )}
    </form>
  );
};

export default Search;
