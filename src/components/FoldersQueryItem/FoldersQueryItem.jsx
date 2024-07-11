import React from "react";
import classes from "./foldersqueryitem.module.css";
import ArrowRight from "../ui/ArrowIcon/ArrowRightIcon";

const FoldersQueryItem = (props) => {
  const { name, arrow, path, navigateTo } = props;

  return (
    <span onClick={() => navigateTo(path)} className={classes.foldersQueryItem}>
      {name}
      <span>{!arrow ? null : <ArrowRight />}</span>
    </span>
  );
};

export default FoldersQueryItem;
