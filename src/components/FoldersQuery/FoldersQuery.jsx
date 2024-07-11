import React from "react";
import classes from "./foldersquery.module.css";
import FoldersQueryItem from "../FoldersQueryItem/FoldersQueryItem";
import { getBreakPoints, getUrls } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { getFolders } from "../../storage/foldersStorage";

const FoldersQuery = (props) => {
  const [urlData, setUrlData] = React.useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  React.useEffect(() => {
    const folders = getFolders();
    const folderData = [];
    const { breakPoints, breakPointsNames } = getBreakPoints(pathname);
    let breakPointChunks = getUrls(pathname, breakPoints);

    if (!breakPointsNames.length && breakPointChunks.length < 2) {
      setUrlData([]);
    } else {
      breakPointChunks.forEach((item, index) => {
        const folderItem = folders[item].find(
          (folder) => folder.path === `/${breakPointsNames[index]}`
        );
        if (folderItem) {
          folderData.push([
            folderItem.id,
            folderItem.name,
            folderItem.fullpath,
          ]);
        }
      });
      setUrlData(
        folderData.filter(
          (item, index, self) =>
            index === self.findIndex((elem) => elem[0] === item[0])
        )
      );
    }
  }, [pathname]);

  const navigateTo = (path) => {
    navigate(path);
  };

  const renderQueryItems = () => {
    return urlData.map((queryItem, index) => (
      <FoldersQueryItem
        arrow={index + 1 !== urlData.length}
        key={`${queryItem}${index}`}
        name={queryItem[1]}
        path={queryItem[2]}
        navigateTo={navigateTo}
      />
    ));
  };

  return (
    <div className={classes.foldersQuery}>
      <FoldersQueryItem
        arrow={urlData.length}
        name="Folders"
        path="/"
        navigateTo={navigateTo}
      />
      {!urlData.length ? null : renderQueryItems()}
    </div>
  );
};

export default FoldersQuery;
