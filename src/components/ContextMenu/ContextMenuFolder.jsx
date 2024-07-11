import React from "react";
import classes from "./contextmenu.module.css";
import * as Menu from "@radix-ui/react-context-menu";

const ContextMenuFolder = (props) => {
  const { edit, remove, navigateTo } = props;

  return (
    <Menu.Root>
      <Menu.Trigger
        onClick={() => navigateTo()}
        className={classes.folderContextMenu}
      ></Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          className={`${classes.contentMenu} ${classes.contextMenuContent}`}
        >
          <Menu.Item onClick={remove} className={classes.contextMenuItem}>
            Remove folder
          </Menu.Item>
          <Menu.Item onClick={edit} className={classes.contextMenuItem}>
            Edit folder
          </Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

export default ContextMenuFolder;
