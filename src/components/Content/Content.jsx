import React from "react";
import classes from "./content.module.css";
import { Route, Routes } from "react-router-dom";
import FoldersList from "../../pages/Home/FoldersList";

const Content = () => {
  return (
    <div className={classes.contentContainer}>
      <Routes>
        <Route path="*" element={<FoldersList />} />
      </Routes>
    </div>
  );
};

export default Content;
