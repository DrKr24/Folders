import React from "react";

const SearchContext = React.createContext();

const SearchProvider = (props) => {
  const { children } = props;

  const [search, setSearch] = React.useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
