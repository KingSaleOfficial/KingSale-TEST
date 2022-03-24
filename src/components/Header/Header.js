import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Box,
  Hidden,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import MoreAction from "./MoreAction";
import { Menu as MenuIcon } from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { UserContext } from "../../context/User";
import MenuLink from "./MenuLink";
import HeaderCoins from "./HeaderCoins";
import { useWeb3React } from "@web3-react/core";
import { sortAddress } from "src/utils";
export default function Header(props) {
  var classes = useStyles();
  const user = useContext(UserContext);
  const { account } = useWeb3React();
  // global
  const history = useHistory();
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  return (
    <AppBar
      position='fixed'
      className={layoutState.isSidebarOpened ? `appBar` : `appBarCloses`}
      elevation={0}
      style={{ backgroundColor: "#15161C !important" }}
    >
      <Grid container spacing={2} alignItems='center'>
        <Hidden mdUp>
          <Grid item xs={5} sm={4} md={12}>
            <Toolbar className={classes.toolbar}>
              <Hidden mdUp>
                <IconButton
                  color='inherit'
                  onClick={() => toggleSidebar(layoutDispatch)}
                  className={classNames(
                    classes.headerMenuButtonSandwich,
                    classes.headerMenuButtonCollapse
                  )}
                >
                  {layoutState.isSidebarOpened ? (
                    <MenuIcon
                      classes={{
                        root: classNames(
                          classes.headerIcon,
                          classes.headerIconCollapse
                        ),
                      }}
                    />
                  ) : (
                    <MenuIcon
                      classes={{
                        root: classNames(
                          classes.headerIcon,
                          classes.headerIconCollapse
                        ),
                      }}
                    />
                  )}
                </IconButton>
              </Hidden>
              <Hidden smUp>
                <Link to='/'>
                  {" "}
                  <img
                    src='../images/logo_1.png'
                    className='logoimg'
                    alt='logo'
                  />
                </Link>
              </Hidden>

              <div className={classes.grow} />
            </Toolbar>
          </Grid>
        </Hidden>
        <Grid
          item
          xs={7}
          sm={8}
          md={12}
          align='right'
          className={classes.sidbar}
        >
          <Box className={classes.sidbar2}>
            <Hidden smDown>
              <HeaderCoins />
              {/* <MenuLink /> */}
            </Hidden>
            {/* <Hidden lgUp>
              <MoreAction />
            </Hidden> */}
            {/* &nbsp;&nbsp; */}
            {/* {user?.userData?.userType === "Admin" && (
              <button
                className={classes.buttonright}
                variant='contained'
                size='large'
                style={{ color: "#fff !important" }}
                onClick={() => {
                  history.push("/app/pre-sale");
                }}
              >
                Presale Request
              </button>
            )} */}
            &nbsp;&nbsp;
            {account && user.isLogin ? (
              <button
                className={classes.buttonright}
                variant='contained'
                size='large'
                style={{ color: "#fff !important" }}
              >
                {sortAddress(account)}
              </button>
            ) : (
              <button
                className={classes.buttonright}
                variant='contained'
                size='large'
                onClick={user.connectWallet}
                style={{ color: "#fff !important" }}
              >
                CONNECT
              </button>
            )}
            {/* <Box>
              <Button>hjjk</Button>
            </Box> */}
            {/*  */}
            {/* {account && (
              <Box pl={1}>
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  size="small"
                  style={{
                    background:
                      "linear-gradient(90deg, #2599FA -23.36%, #42E8E0 59.43%)",
                  }}
                  aria-haspopup="true"
                >
                  {" "}
                  <Avatar src={"images/user1.png"} />
                </IconButton>
                <Menu
                  id="simple-menu"
                  style={{ position: "absolute", top: "3.5%" }}
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link
                    to={{
                      pathname: "/app/profile",
                      search: user?.userData?._id,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  </Link>
                  <Link
                    to="/app/editprofile"
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={handleClose}>Edit Profile</MenuItem>
                  </Link>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      user.logoutHanlder();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            )} */}
            {/*  */}
          </Box>
        </Grid>
      </Grid>
    </AppBar>
  );
}
