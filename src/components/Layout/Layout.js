import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { makeStyles, Box } from "@material-ui/core";
//icons

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
// import Dashboard from "../../pages/dashboard";
// import Staking from "../../pages/staking/Staking";
// import LiveStake from "../../pages/staking/LiveStake";
// import FinishedStake from "../../pages/staking/FinishedStake";
// import Rewards from "../../pages/staking/Rewards";
// import Withdraw from "../../pages/staking/Withdraw";
// import CreateStake from "../../pages/staking/CreateStake";
// import Token from "../../pages/token/Token";
// import Launched from "../../pages/launched/Launched";
// import LivePreSales from "../../pages/launched/LivePreSales";
// import Sniffer from "../../pages/sniffer/Sniffer";
// import KycList from "../../pages/KYC/KycList";
// import AddKyc from "../../pages/KYC/index";
// import ViewKyc from "../../pages/KYC/ViewKyc";
// import Notification from "../../pages/Notification/Notification";
// import Launchedform from "../../pages/launched/Launchedform";
// import LaunchedDetail from "../../pages/launched/LaunchedDetail";
// import Liquidity from "../../pages/liquidity/Liquidity";
// import Index from "../../pages/VerifiedPresell/Index";
// import LockLiquidity from "../../pages/LiquidityLocker/LockLiquidity";
// import Locker from "../../pages/LiquidityLocker/Locker";
// import TokenLocker from "../../pages/LiquidityLocker/TokenLocker";
// import TabPage from "../../pages/tabs/TabPage";
// import About from "../../pages/About/About";
// import Terms from "src/components/StasticData/Terms";
// import Privacy from "src/components/StasticData/Privacy";
// import Documentation from "src/components/StasticData/Documentation";
// import Audits from "src/components/StasticData/Audits";

// import Tab from "../../pages/Tab/index";
// import Launchpad from "../../pages/tabs/Launchpad";

import { useLayoutState } from "../../context/LayoutContext";
import Footer from "./Footer";
// import VarifiedList from "../../pages/Admin/VarifiedList";
// import PromotList from "../../pages/Admin/PromotList";
// import listKycAdmin from "../../pages/Admin/ListKyc";
// import Pre_sale from "../../pages/Admin/Index";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: "24px 100px 0",
    width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
    minHeight: "100vh",
    paddingTop: "80px",
    zIndex: "1",
    overflow: "hidden",
    position: "relative",
    "@media (max-width:1440px)": {
      padding: "24px 30px 0",
    },
    [theme.breakpoints.down("md")]: {
      padding: "24px 24px",
      paddingTop: "80px",
    },
  },
  contentShift: {
    width: `calc(100vw - 240px)`,
    position: "absolute",
    right: "0",
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
    },
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  link: {
    "&:not(:first-child)": {
      paddingLeft: 15,
    },
  },

  buttonright: {
    background: "linear-gradient(90deg, #2599FA -23.36%, #42E8E0 59.43%)",
    fontSize: "14px ",
    border: "1px solid transparent",
    fontWeight: 600,
    height: "44px ",
    color: "#FFFFFF",
    minWidth: "135px ",
    borderRadius: "5px",
    boxShadow: "none ",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      height: "45px ",
      minWidth: "120px ",
    },
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      color: "#fff",
      transition: "0.5s",
      boxSizing: " border-box",
      border: " 2px solid transparent",
      backgroundClip: "padding-box, border-box",
      backgroundOrigin: "padding-box, border-box",
      backgroundImage:
        "linear-gradient(#000, #000), linear-gradient(#2599fa, #42E8E0)",
    },
  },
  mainBodyBox: {
    minHeight: "calc(100vh - 260px)",
  },
}));
function Layout(props) {
  const classes = useStyles();

  var layoutState = useLayoutState();
  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <Box className={classes.mainBodyBox}>
            <Suspense fallback={() => null}>
              <Switch>
                Staking
                <Route
                  path='/app/dashboard'
                  component={lazy(() => import("../../pages/dashboard"))}
                />
                <Route
                  path='/app/About'
                  component={lazy(() => import("../../pages/About/About"))}
                />{" "}
                <Route
                  path='/app/token'
                  component={lazy(() => import("../../pages/token/Token"))}
                />{" "}
                <Route
                  path='/app/launched'
                  component={lazy(() =>
                    import("../../pages/launched/Launched")
                  )}
                />
                <Route
                  path='/app/sniffer'
                  component={lazy(() => import("../../pages/sniffer/Sniffer"))}
                />{" "}
                <Route
                  path='/app/kyc'
                  component={lazy(() => import("../../pages/KYC/KycList"))}
                />{" "}
                <Route
                  path='/app/add-kyc'
                  component={lazy(() => import("../../pages/KYC/index"))}
                />{" "}
                <Route
                  path='/app/view-kyc'
                  component={lazy(() => import("../../pages/KYC/ViewKyc"))}
                />{" "}
                <Route
                  path='/app/notification'
                  component={lazy(() =>
                    import("../../pages/Notification/Notification")
                  )}
                />
                <Route
                  path='/app/create-launched'
                  component={lazy(() =>
                    import("../../pages/launched/Launchedform")
                  )}
                />
                <Route
                  path='/app/create-stakE'
                  component={lazy(() =>
                    import("../../pages/staking/CreateStake")
                  )}
                />{" "}
                {/* <Route path="/app/reward-staking" component={Rewards} /> */}
                <Route
                  path='/app/withDraw-stake'
                  component={lazy(() => import("../../pages/staking/Withdraw"))}
                />
                <Route
                  path='/app/launched-detail'
                  component={lazy(() =>
                    import("../../pages/launched/LaunchedDetail")
                  )}
                />{" "}
                <Route
                  path='/app/Promot-list'
                  component={lazy(() => import("../../pages/Admin/PromotList"))}
                />{" "}
                <Route
                  path='/app/varify-list'
                  component={lazy(() =>
                    import("../../pages/Admin/VarifiedList")
                  )}
                />{" "}
                <Route
                  path='/app/pre-sale'
                  component={lazy(() => import("../../pages/Admin/Index"))}
                />{" "}
                <Route
                  path='/app/launched-live-presale'
                  component={lazy(() =>
                    import("../../pages/launched/LivePreSales")
                  )}
                />
                <Route
                  path='/app/liquidity'
                  component={lazy(() =>
                    import("../../pages/liquidity/Liquidity")
                  )}
                />{" "}
                <Route
                  path='/app/lock-liquidity'
                  component={lazy(() =>
                    import("../../pages/LiquidityLocker/Locker")
                  )}
                />
                <Route
                  path='/app/past-presell'
                  component={lazy(() =>
                    import("../../pages/PastPreSale/Index")
                  )}
                />{" "}
                <Route
                  path='/app/verifyed-presell'
                  component={lazy(() =>
                    import("../../pages/VerifiedPresell/Index")
                  )}
                />{" "}
                {/* <Route
                  path='/app/locker'
                  component={lazy(() =>
                    import("../../pages/LiquidityLocker/Locker")
                  )}
                /> */}
                <Route
                  path='/app/lock-token'
                  component={lazy(() =>
                    import("../../pages/LiquidityLocker/TokenLocker")
                  )}
                />
                <Route
                  path='/app/staking'
                  component={lazy(() => import("../../pages/staking/Staking"))}
                />{" "}
                <Route
                  path='/app/live-staking'
                  component={lazy(() =>
                    import("../../pages/staking/LiveStake")
                  )}
                />{" "}
                <Route
                  path='/app/finished-staking'
                  component={lazy(() =>
                    import("../../pages/staking/FinishedStake")
                  )}
                />{" "}
                <Route
                  path='/app/terms'
                  component={lazy(() =>
                    import("src/components/StasticData/Terms")
                  )}
                />{" "}
                <Route
                  path='/app/privacy'
                  component={lazy(() =>
                    import("src/components/StasticData/Privacy")
                  )}
                />{" "}
                <Route
                  path='/app/documentation'
                  component={lazy(() =>
                    import("src/components/StasticData/Documentation")
                  )}
                />{" "}
                <Route
                  path='/app/audits'
                  component={lazy(() =>
                    import("src/components/StasticData/Audits")
                  )}
                />{" "}
                <Route
                  exact
                  path='/app/ui'
                  render={() => <Redirect to='/app/ui/icons' />}
                />
              </Switch>
            </Suspense>
          </Box>
          <Footer />
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
