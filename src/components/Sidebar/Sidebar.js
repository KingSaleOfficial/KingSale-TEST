import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Drawer, IconButton, List, makeStyles, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames";
import { GiToken } from "react-icons/gi";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// import { BsFillHandbagFill } from "react-icons/bs";
import { RiLock2Fill, RiAdminFill } from "react-icons/ri";
// import { RiAdminFill } from "react-icons/Ri";
// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { GoRequestChanges, GoVerified } from "react-icons/go";
import { AiFillRocket, AiOutlineBank } from "react-icons/ai";
// import { FiTrendingUp } from "react-icons/fi";
import { MdGeneratingTokens } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { ImDatabase } from "react-icons/im";
import { AiOutlineAudit } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { UserContext } from "src/context/User";
const structure = [
  {
    id: 0,
    label: "Home",
    link: "/app/dashboard",
    icon: <MdDashboard />,
    children: [
      {
        id: 1,
        label: "Token Creater",
        link: "/app/token",
        icon: <GiToken />,
      },
      {
        id: 1,
        label: "Token Creater",
        link: "/app/token",
        icon: <GiToken />,
      },
    ],
  },
  {
    id: 1,
    label: "Token Creater",
    link: "/app/token",
    icon: <GiToken />,
  },
  {
    id: 2,
    label: "Liquidity Locker",
    link: "/app/lock-liquidity",
    icon: <RiLock2Fill />,
  },
  {
    id: 2,
    label: "Verified Pre-Sale",
    link: "/app/verifyed-presell",
    icon: <GoVerified />,
  },
  {
    id: 3,
    label: "Launchpad",
    link: "/app/launched",
    icon: <AiFillRocket />,
  },

  // {
  //   id: 4,
  //   label: 'Staking',
  //   link: '/app/staking',
  //   icon: <ImDatabase />,
  // },
  // {
  //   id: 7,
  //   label: "Liquidity Token",
  //   link: "/app/liquidity",
  //   icon: <FiTrendingUp />,
  // },
  // {
  //   id: 7,
  //   label: "KYC",
  //   link: "#",
  //   icon: <AiOutlineAudit />,
  // },
  {
    id: 8,
    label: "Contract Sniffer",
    link: "/app/sniffer",
    icon: <MdGeneratingTokens />,
  },

  {
    id: 10,
    label: "About",
    link: "/app/About",
    icon: <AiOutlineInfoCircle />,
  },
  {
    id: 10,
    label: "Telegram",
    link: "#",
    icon: <FaTelegramPlane />,
  },
  {
    id: 11,
    label: "Twitter",
    link: "#",
    icon: <FaTwitter />,
  },
];
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    paddingLeft: "20px",
    height: "100vh",
    position: "fixed",
    background: "#15161C",
    borderRight: "1px solid #1D1D1D",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "&::-webkit-scrollbar": {
      width: " 3px",
    },
    "&::-webkit-scrollbar-track ": {
      background: " #f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: " #888",
    },
    "&::-webkit-scrollbar-thumb:hover ": {
      background: "#555",
    },
  },
  drawerClose: {
    borderRight: "0",
    background: "#15161C",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 20,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
    "&::-webkit-scrollbar": {
      width: " 3px",
    },
    "& .side-navigation-panel": {
      pointerEvents: "none",
      [theme.breakpoints.down("sm")]: {
        pointerEvents: "auto",
      },
    },
    "&::-webkit-scrollbar-track ": {
      background: " #f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: " #888",
    },
    "&::-webkit-scrollbar-thumb:hover ": {
      background: "#555",
    },
    "& .side-navigation-panel-select-option-wrap .side-navigation-panel-select-option-text":
      {
        display: "none",
        [theme.breakpoints.down("sm")]: {
          display: "block",
        },
      },
    "& .side-navigation-panel ul ul": {
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /* sidebarList: {
    marginTop: theme.spacing(6),
  }, */
  mobileBackButton: {
    marginTop: theme.spacing(2),
    marginLeft: 13,
    display: " flex",
    alignItems: "center",
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(0.625),
    },
    // [theme.breakpoints.up("md")]: {
    //   display: "none",
    // },
    "& button": {
      color: "#ca8a2d",
    },
  },
}));
function Sidebar({ location }) {
  const classes = useStyles();
  var theme = useTheme();
  const user = useContext(UserContext);
  const history = useHistory();
  // const location = useLocation();
  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      onBackdropClick={() => toggleSidebar(layoutDispatch)}
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={!isSidebarOpened}
    >
      {/* <div className={classes.toolbar} /> */}
      <Box className={classes.mobileBackButton} mb={3}>
        {isSidebarOpened ? (
          <Link to='/app/dashboard'>
            <img
              src='images/logo_1.png'
              style={{ maxWidth: "130px" }}
              alt='logo'
            />
          </Link>
        ) : (
          <img src='images/fav_1.png' style={{ maxWidth: "30px" }} alt='logo' />
        )}

        <IconButton
          className='arrowButton'
          onClick={() => toggleSidebar(layoutDispatch)}
          size='small'
        >
          {isSidebarOpened ? (
            <FiArrowLeft
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          ) : (
            <FiArrowRight
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse
                ),
              }}
            />
          )}
        </IconButton>
      </Box>
      <Navigation
        // you can use your own router's api to get pathname
        activeItemId={location.pathname}
        onSelect={({ itemId }) => {
          history.push(itemId);
        }}
        items={[
          {
            title: "Home",
            itemId: "/app/dashboard",
            // you can use your own custom Icon component as well
            // icon is optional
            elemBefore: () => <MdDashboard />,
          },

          {
            title: "Launchpad",
            itemId: "#2",
            elemBefore: () => <AiFillRocket />,
            subNav: [
              {
                title: "Create Pre-Sale",
                itemId: "/app/create-launched",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <GoVerified />,
              },
              {
                title: "My Pre sales",
                itemId: "/app/verifyed-presell",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <GoVerified />,
              },
              {
                title: "Live Pre sales",
                itemId: "/app/launched-live-presale",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <GoVerified />,
              },
              {
                title: "Past Pre sales",
                itemId: "/app/past-presell",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <GoVerified />,
              },
            ],
          },
          {
            title: "King locker",
            itemId: "#1",
            elemBefore: () => <RiLock2Fill />,
            subNav: [
              {
                title: "Liquidity Locker",
                itemId: "/app/lock-liquidity",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <RiLock2Fill />,
              },
              {
                title: "Token locker",
                itemId: "/app/lock-token",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <RiLock2Fill />,
              },
            ],
          },

          {
            title: "King Staking",
            itemId: "#3",
            elemBefore: () => <ImDatabase />,
            subNav: [
              {
                title: "Create staking",
                itemId: "/app/create-stake",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <RiLock2Fill />,
              },
              {
                title: "Live staking pools",
                itemId: "/app/live-staking",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <RiLock2Fill />,
              },
              {
                title: "Finished staking pools",
                itemId: "/app/finished-staking",
                // you can use your own custom Icon component as well
                // icon is optional
                // elemBefore: () => <RiLock2Fill />,
              },
            ],
          },
          {
            title: "Token Creater",
            itemId: "/app/token",
            // you can use your own custom Icon component as well
            // icon is optional
            elemBefore: () => <GiToken />,
          },

          // {
          //   title: 'Staking',
          //   itemId: '/app/staking',
          //   elemBefore: () => <ImDatabase />,
          // },
          {
            title: "Contract Sniffer",
            itemId: "/app/sniffer",
            elemBefore: () => <MdGeneratingTokens />,
          },
          {
            title: "KYC",
            itemId: "/app/kyc",
            elemBefore: () => <AiOutlineBank />,
          },
          // {
          //   title: "Pre-Sale",
          //   itemId: "/app/pre-sale",
          //   elemBefore: () => <AiOutlineBank />,
          // },

          // {
          //   title: "Admin",
          //   itemId: "#4",
          //   elemBefore: () => <RiAdminFill style={{ color: "#fff" }} />,
          //   subNav: [
          //     {
          //       title: "KYC List",
          //       itemId: "/app/kyc-list",
          //     },
          //     {
          //       title: "Promot",
          //       itemId: "/app/promot-list",
          //     },
          //     {
          //       title: "Verified List",
          //       itemId: "/app/varify-list",
          //     },
          //   ],
          // },
          // {
          //   title: 'Admin',
          //   itemId: '',
          //   elemBefore: () => <AiOutlineAudit />,
          // },
          // {
          //   title: "About",
          //   itemId: "/app/About",
          //   elemBefore: () => <AiOutlineInfoCircle />,
          // },
        ]}
      />

      <Navigation
        activeItemId={location.pathname}
        items={[
          {
            title: "About",
            itemId: "https://launchpad-kyle.mobiloitte.org/#/app/dashboard",
            elemBefore: () => <AiOutlineInfoCircle />,
          },
        ]}
        onSelect={({ itemId }) => {
          window.open(itemId, "_blank");
        }}
      />

      {user?.userData?.userType == "Admin" && (
        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }) => {
            history.push(itemId);
          }}
          items={[
            {
              title: "Presale Request",
              itemId: "/app/pre-sale",
              elemBefore: () => <GoRequestChanges />,
            },
          ]}
        />
      )}

      <Navigation
        activeItemId={location.pathname}
        items={[
          {
            title: "Telegram",
            itemId: "https://t.me/KINGSALEcommunity",
            elemBefore: () => <FaTelegramPlane />,
          },
          {
            title: "Twitter",
            itemId: "https://twitter.com/KingSaleFinance",
            elemBefore: () => <FaTwitter />,
          },
        ]}
        onSelect={({ itemId }) => {
          window.open(itemId, "_blank");
        }}
      />
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
