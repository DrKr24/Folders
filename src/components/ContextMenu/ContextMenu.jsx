import React from "react";
import classes from "./contextmenu.module.css";
import * as Menu from "@radix-ui/react-context-menu";
import ArrowRight from "../ui/ArrowIcon/ArrowRightIcon";
import ItemIndicator from "../ui/ItemIndicator/ItemIndicator";

const ContextMenu = (props) => {
  const {
    viewSettings,
    by,
    ordering,
    setSettings,
    setViewSettings,
    createFolder,
  } = props;

  const sortDataHandler = (value) => {
    const data = value.split(":");
    setSettings((state) => ({
      ...state,
      sort: {
        ...state.sort,
        [data[0]]: data[1],
      },
    }));
  };

  return (
    <Menu.Root>
      <Menu.Trigger className={classes.contextMenu}></Menu.Trigger>
      <Menu.Portal>
        <Menu.Content
          className={`${classes.contentMenu} ${classes.contextMenuContent}`}
        >
          <Menu.Item onClick={createFolder} className={classes.contextMenuItem}>
            Create folder
          </Menu.Item>
          <Menu.Sub>
            <Menu.SubTrigger className={classes.contextMenuItem}>
              Sort
              <div className="RightSlot">
                <ArrowRight />
              </div>
            </Menu.SubTrigger>
            <Menu.Portal>
              <Menu.SubContent
                className={`${classes.contentMenu} ${classes.subContextMenuContent}`}
              >
                <Menu.RadioGroup
                  value={viewSettings}
                  onValueChange={sortDataHandler}
                >
                  <Menu.RadioItem
                    className={classes.contextMenuItem}
                    value="by:name"
                  >
                    {by === "name" ? <ItemIndicator /> : null}
                    Name
                  </Menu.RadioItem>

                  <Menu.RadioItem
                    className={classes.contextMenuItem}
                    value="by:date"
                  >
                    {by === "date" ? <ItemIndicator /> : null}
                    Date
                  </Menu.RadioItem>
                  <Menu.Separator className={classes.contextMenuSeparator} />
                  <Menu.RadioItem
                    className={classes.contextMenuItem}
                    value="ordering:ascending"
                  >
                    {ordering === "ascending" ? <ItemIndicator /> : null}
                    Ascending
                  </Menu.RadioItem>
                  <Menu.RadioItem
                    className={classes.contextMenuItem}
                    value="ordering:descending"
                  >
                    {ordering === "descending" ? <ItemIndicator /> : null}
                    Descending
                  </Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.SubContent>
            </Menu.Portal>
          </Menu.Sub>
          <Menu.Sub>
            <Menu.SubTrigger className={classes.contextMenuItem}>
              View
              <div className="RightSlot">
                <ArrowRight />
              </div>
            </Menu.SubTrigger>
            <Menu.Portal>
              <Menu.SubContent
                className={`${classes.contentMenu} ${classes.subContextMenuContent}`}
              >
                <Menu.RadioGroup
                  value={viewSettings}
                  onValueChange={(value) =>
                    setViewSettings((state) => ({ ...state, view: value }))
                  }
                >
                  <Menu.RadioItem
                    className={classes.contextMenuItem}
                    value="icons"
                  >
                    {viewSettings === "icons" ? <ItemIndicator /> : null}
                    Icons
                  </Menu.RadioItem>
                  <Menu.RadioItem
                    className={classes.contextMenuItem}
                    value="list"
                  >
                    {viewSettings === "list" ? <ItemIndicator /> : null}
                    List
                  </Menu.RadioItem>
                </Menu.RadioGroup>
              </Menu.SubContent>
            </Menu.Portal>
          </Menu.Sub>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

export default ContextMenu;
