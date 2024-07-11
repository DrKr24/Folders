import React from "react";
import { getFolders } from "../../storage/foldersStorage";
import { getFolderSettings } from "../../storage/folderSettingsStorage";

const FoldersContext = React.createContext();

const FoldersProvider = (props) => {
  const { children } = props;

  return (
    <FoldersContext.Provider
      value={{ folders: getFolders(), folderSettings: getFolderSettings() }}
    >
      {children}
    </FoldersContext.Provider>
  );
};

export { FoldersContext, FoldersProvider };
