import React from "react";
import ArrowRightIcon from "./arrow-right-icon.png";
import classes from "./arrow.module.css";

const ArrowRight = () => {
  return (
    <div className={classes.arrowContainer}>
      <img className={classes.arrow} src={ArrowRightIcon} alt="Sub content" />
    </div>
  );
};

export default ArrowRight;
