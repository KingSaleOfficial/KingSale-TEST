import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Box,
  AppBar,
  Tab,
  Tabs,
  makeStyles,
} from "@material-ui/core";

import { Link, useHistory, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import axios from "axios";
import VarifiedList from "./VarifiedList";
import PromotList from "./PromotList";
import ListKyc from "./ListKyc";

export default function Index(props) {
  const [value, setValue] = useState(1);
  const drawerHandler = (event, newValue) => {
    setValue(newValue);
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
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
  return (
    <div>
      <Container maxWidth='xl'>
        <Box pt={1} pb={1}>
          <Box width='100%' textAlign='center' pt={3} className='mainBox'>
            <Typography variant='h5'> Presale</Typography>
          </Box>
          <Tabs>
            {/* <Tab label='Promot Request' style={{ color: "#fff" }} /> */}
            <Tab label='Verification Request' style={{ color: "#fff" }} />
          </Tabs>
        </Box>

        {/* <TabPanel value={value} index={0}>
          <Box style={{ marginTop: "50px" }}>
            <PromotList />
          </Box>
        </TabPanel> */}
        <TabPanel value={value} index={1}>
          <Box style={{ marginTop: "0px" }}>
            <VarifiedList />
          </Box>
        </TabPanel>
      </Container>
    </div>
  );
}

// export default index;
