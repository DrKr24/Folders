import React from "react";
import classes from "./header.module.css";
import Search from "../Search/Search";
import { SearchContext } from "../../Context/SearchContext/SearchProvider";
import FoldersQuery from "../FoldersQuery/FoldersQuery";

const Header = () => {
  const { search, setSearch } = React.useContext(SearchContext);

  return (
    <div className={classes.header}>
      <FoldersQuery />
      <Search search={search} setSearch={setSearch} />
    </div>
  );
};

export default Header;
