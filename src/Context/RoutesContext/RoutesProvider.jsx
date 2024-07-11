import React from "react";
import { getAllowPaths } from "../../storage/pathsStorage";

const RoutesContext = React.createContext();

const RoutesProvider = (props) => {
  const { children } = props;

  return (
    <RoutesContext.Provider value={{ allowedPaths: getAllowPaths() }}>
      {children}
    </RoutesContext.Provider>
  );
};

export { RoutesContext, RoutesProvider };
