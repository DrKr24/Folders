import React from "react";
import classes from "./App.module.css";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import { RoutesProvider } from "./Context/RoutesContext/RoutesProvider";
import { FoldersProvider } from "./Context/FoldersContext/FoldersProvider";
import { SearchProvider } from "./Context/SearchContext/SearchProvider";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <section className={classes.container}>
      <FoldersProvider>
        <RoutesProvider>
          <SearchProvider>
            <BrowserRouter>
              <Header />
              <Content />
            </BrowserRouter>
          </SearchProvider>
        </RoutesProvider>
      </FoldersProvider>
    </section>
  );
};

export default App;
