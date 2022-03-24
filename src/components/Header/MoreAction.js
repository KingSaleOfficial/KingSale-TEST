import React, { useRef, useState, memo, useContext } from "react";
import {
  ListItemText,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { BiDotsVertical } from "react-icons/bi";
import { UserContext } from "../../context/User";
// import { Edit, Trash2 } from "react-feather";

const useStyles = makeStyles((theme) => ({
  menu: {
    width: 130,
    maxWidth: "100%",
    "& ul": {
      "& li": {
        "&:focus": {
          backgroundColor: "#f3f5ff00 !important",
        },
      },
    },
  },
}));

function MoreAction(props) {
  const { editTodo, deleteTodo, ...rest } = props;
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();
  const user = useContext(UserContext);
  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <Tooltip title="More options">
        <IconButton
          onClick={handleMenuOpen}
          ref={moreRef}
          {...rest}
          className={classes.more}
        >
          <BiDotsVertical />
        </IconButton>
      </Tooltip>
      {openMenu && (
        <Menu
          anchorEl={moreRef.current}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handleMenuClose}
          open={openMenu}
          PaperProps={{ className: classes.menu }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => history.push("/app/explore")}>
            <ListItemText className={classes.navLinks} primary="    Explore" />
          </MenuItem>
          {user?.userData?._id && (
            <MenuItem
              onClick={() =>
                history.push({
                  pathname: "/app/profile",
                  search: user?.userData?._id,
                })
              }
            >
              <ListItemText
                className={classes.navLinks}
                primary="    My Profile"
              />
            </MenuItem>
          )}
          {/* <MenuItem onClick={() => history.push("/app/mint")}>
            <ListItemText
              className={classes.navLinks}
              primary="    Following"
            />
          </MenuItem> */}
          <MenuItem onClick={() => history.push("/app/activity")}>
            <ListItemText
              className={classes.navLinks}
              primary="       Activity"
            />
          </MenuItem>
          <MenuItem onClick={() => history.push("/app/how")}>
            <ListItemText
              className={classes.navLinks}
              primary="       How it Works"
            />
          </MenuItem>
          {/* <MenuItem onClick={() => history.push("/app/mint")}>
            <ListItemText
              className={classes.navLinks}
              primary="     Community"
            />
          </MenuItem> */}
        </Menu>
      )}
    </>
  );
}

export default memo(MoreAction);
