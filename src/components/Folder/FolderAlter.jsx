import React from "react";
import classes from "./folder.module.css";
import folderImage from "../../images/folder.png";
import ContextMenuFolder from "../ContextMenu/ContextMenuFolder";
import { pathNormalize } from "../../utils/utils";

const FolderAlter = (props) => {
  const { name, id, path, folderPath, date, type, edit, remove, navigateTo } =
    props;
  const nameRef = React.useRef();
  const nameFieldRef = React.useRef();
  const [folderName, setFolderName] = React.useState("New folder");
  const [isEditable, setIsEditable] = React.useState(false);

  React.useEffect(() => {
    setFolderName(name);
    nameRef.current = name;
  }, []);

  const nameHandler = (event) => {
    nameRef.current = event.target.innerText;
  };

  const handleFocus = () => setIsEditable(true);
  const handleBlur = () => setIsEditable(false);
  const handleFocusModal = () => {
    setIsEditable(true);
    nameFieldRef.current.focus();
  };

  const keyHandler = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      nameFieldRef.current.blur();
      if (nameRef.current.length) {
        setFolderName(nameRef.current);
      } else {
        nameFieldRef.current.innerText = folderName;
      }
      setIsEditable(false);
      edit(path, nameRef.current, id);
    }
  };

  return (
    <div onMouseLeave={handleBlur} className={classes.folderAlterContainer}>
      <img
        className={classes.folderAlterImage}
        src={folderImage}
        alt="Folder standart"
      />
      <span
        ref={nameFieldRef}
        onKeyDown={keyHandler}
        suppressContentEditableWarning={true}
        contentEditable={isEditable}
        onInput={nameHandler}
        onMouseEnter={handleFocus}
        className={classes.folderAlterName}
        tabIndex="1"
      >
        {folderName}
      </span>
      <span className={classes.folderAlterType}>{type}</span>
      <span className={classes.folderAlterDate}>{date}</span>
      <ContextMenuFolder
        navigateTo={() => navigateTo(pathNormalize(path + folderPath))}
        edit={handleFocusModal}
        remove={() => remove(path, folderPath, id)}
      />
    </div>
  );
};

export default FolderAlter;
