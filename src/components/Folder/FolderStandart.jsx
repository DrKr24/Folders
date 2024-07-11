import React from "react";
import classes from "./folder.module.css";
import folderImage from "../../images/folder.png";
import ContextMenuFolder from "../ContextMenu/ContextMenuFolder";
import { pathNormalize } from "../../utils/utils";

const FolderStandart = (props) => {
  const { name, id, path, folderPath, edit, remove, navigateTo } = props;
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
    <div onMouseLeave={handleBlur} className={classes.folderContainer}>
      <img
        className={classes.folderImage}
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
        className={classes.folderName}
        tabIndex={0}
      >
        {folderName}
      </span>
      <ContextMenuFolder
        navigateTo={() => navigateTo(pathNormalize(path + folderPath))}
        edit={handleFocusModal}
        remove={() => remove(path, folderPath, id)}
      />
    </div>
  );
};

export default FolderStandart;
