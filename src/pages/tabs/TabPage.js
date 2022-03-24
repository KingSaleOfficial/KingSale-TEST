import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import Launchpad from "./Launchpad";
import MyDashboard from "./MyDasboard";
import TokenMonter from "./TokenMonter";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "auto",
    padding: "70px 0px",
    backgroundColor: "#090C16",
  },

  appbar: {
    width: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    textAlign:"center",
    alignItems:"center",
    backgroundColor: "#090c16",
  },
  pages: {
    width: "100%",
  },
}));

export default function TabPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Box className={classes.topbar}>
        <AppBar position="static" className={classes.appbar}>
          <Tabs
            onClick={() => history.push("/app/Tab")}
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Dashboard" {...a11yProps(0)} />
            <Tab label="Token Minter" {...a11yProps(1)} />
            <Tab label="Launch Pad" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </Box>
      <Box className={classes.pages}>
        <TabPanel value={value} index={0}>
          <MyDashboard />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Launchpad />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TokenMonter />
        </TabPanel>
      </Box>
    </div>
  );
}
