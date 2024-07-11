import React from "react";
import CancelIconInput from "./cancel-icon.png";
import classes from "./cancelicon.module.css";

const CancelIcon = () => {
  return (
    <div className={classes.cancelContainer}>
      <img className={classes.cancel} src={CancelIconInput} alt="Search" />
    </div>
  );
};

export default CancelIcon;
