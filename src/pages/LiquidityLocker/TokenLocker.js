import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";
import Index from "./TabToken/Index";

const useStyles = makeStyles((theme) => ({
  textbox: {
    "& h2": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
  },
  mainBox: {
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    padding: "25px",
    transition: "0.5s",
    textAlign: "left",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    borderRadius: "0 30px 0 0",
    backdropFilter: "blur(42px)",
    "& p": {
      fontSize: "16px !important",
      color: "#b8b8b8",
      marginTop: "15px",
    },
    "& label": {
      fontSize: "15px !important",
      lineHeight: "24px",
      color: "#7e7f81 !important",
    },
  },
  connectCard: {
    display: " flex",
    alignItems: "center",
    borderRadius: "5px",
    marginTop: "7px",
    color: "#fff",
    textDecoration: "none",
    "& img": {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      marginRight: "15px",
    },
  },
  information: {
    backgroundColor: "#090b16",
    border: "1px solid #443309",
    padding: "10px",
    fontSize: "16px",
    color: " #888585",
    "& small": {
      color: "#fabe25",
      cursor: "pointer",
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();

  return (
    <Box className={classes.bannerBox}>
      <Container maxWidth='lg' align='center'>
        <Box className={classes.textbox} mt={5} mb={5}>
          <Typography variant='h2'>Token Locker</Typography>
        </Box>
      </Container>
      <Box mt={5}>
        <Index />
      </Box>
    </Box>
  );
}
