import React from "react";
import classes from "./home.module.css";
import FolderStandart from "../../components/Folder/FolderStandart";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FoldersContext } from "../../Context/FoldersContext/FoldersProvider";
import ContextMenu from "../../components/ContextMenu/ContextMenu.jsx";
import {
  getNewFolderObject,
  pathNormalize,
  searchHandler,
  sortHandler,
} from "../../utils/utils.js";
import {
  addAllowPath,
  getAllowPaths,
  removeAllowPath,
} from "../../storage/pathsStorage.js";
import {
  addFolder,
  editFolder,
  getFolders,
  removeFolder,
} from "../../storage/foldersStorage.js";
import FolderAlter from "../../components/Folder/FolderAlter.jsx";
import {
  getFolderSettings,
  removeFolderSettings,
  setFolderSettings,
} from "../../storage/folderSettingsStorage.js";
import { SearchContext } from "../../Context/SearchContext/SearchProvider.jsx";

const FoldersList = (props) => {
  const [foldersData, setFoldersData] = React.useState([]);
  const [allowedPathsData, setAllowedPathsData] = React.useState([]);
  const [mounted, setMounted] = React.useState(false);
  const { folders = {}, folderSettings } = React.useContext(FoldersContext);
  const { search } = React.useContext(SearchContext);
  const [settings, setSettings] = React.useState({
    view: "icons",
    sort: {
      by: "name",
      ordering: "ascending",
    },
  });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    setFoldersData(getFolders()[pathname]);
    setSettings(getFolderSettings()[pathname]);
  }, [pathname]);

  React.useEffect(() => {
    if (mounted) {
      setFolderSettings(pathname, settings);
    }
  }, [settings]);

  React.useEffect(() => {
    setFoldersData(folders[pathname]);
    setSettings(folderSettings[pathname]);
    setAllowedPathsData(getAllowPaths());
    setMounted(true);
  }, []);

  const renderContent = () => {
    if (!getAllowPaths().includes(pathname)) {
      return <Navigate to="/" />;
    }
    const filtredData = sortHandler(
      searchHandler(foldersData, search),
      settings.sort.by,
      settings.sort.ordering
    );
    if (settings.view === "list") {
      return filtredData.map((folder) => (
        <FolderAlter
          key={folder.id}
          edit={editFolderHandler}
          remove={removeFolderHandler}
          navigateTo={navigateTo}
          name={folder.name}
          id={folder.id}
          date={folder.date}
          type={folder.type}
          path={folder.parentPath}
          folderPath={folder.path}
        />
      ));
    }
    return filtredData.map((folder) => (
      <FolderStandart
        key={folder.id}
        edit={editFolderHandler}
        remove={removeFolderHandler}
        navigateTo={navigateTo}
        name={folder.name}
        id={folder.id}
        path={folder.parentPath}
        folderPath={folder.path}
      />
    ));
  };

  const createFolderHandler = () => {
    const folder = getNewFolderObject(foldersData, pathname);
    setFoldersData((state) => [folder, ...state]);
    addAllowPath(pathNormalize(folder.parentPath + folder.path));
    addFolder(pathname, pathNormalize(folder.parentPath + folder.path), folder);
    setFolderSettings(pathNormalize(folder.parentPath + folder.path), {
      view: "icons",
      sort: {
        by: "name",
        ordering: "ascending",
      },
    });
  };

  const editFolderHandler = (path, name, id) => {
    editFolder(path, name, id);
  };

  const removeFolderHandler = (path, folderPath, id) => {
    removeFolder(path, folderPath, id);
    removeAllowPath(folderPath);
    removeFolderSettings(folderPath);
    setFoldersData((state) => state.filter((folder) => folder.id !== id));
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className={classes[`homeContainer${settings.view}`]}>
      {!allowedPathsData.length ? null : renderContent()}
      <ContextMenu
        viewSettings={settings.view}
        by={settings.sort.by}
        ordering={settings.sort.ordering}
        setSettings={setSettings}
        setViewSettings={setSettings}
        createFolder={createFolderHandler}
      />
    </div>
  );
};

export default FoldersList;
