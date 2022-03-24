import React from "react";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IOSSlider from "./IOSSlider";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    transition: "0.5s",
    // zIndex: "1",
    background:
      "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
      border:"1px solid #b6852e",
    // background: "linear-gradient(180deg, rgba(19, 21, 29, 0.84) 0%, rgba(19, 21, 29, 0.67) 100%)",
    backdropFilter: " blur(4px)",
    "&:hover": {
      transform: "translateY(-10px)",
    },
  },
  nameBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px 30px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
    "& h4": {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
    },
    "& p": {
      fontSize: "12px",
      color: "#fff",
    },
    "& img": {
      height: "50px",
      // height: "40px",
      borderRadius: "50%",
    },
  },
  apyBox: {
    padding: "20px",
    "& h4": {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
    },
    "& input": {
      background: " rgba(141, 137, 137, 0.2)",
      maxWidth: "100px",
      border: "none",
      height: "30px",
    },
  },
  manualBtn: {
    border: "0.5px solid #F6A52D",
    boxSizing: "border-box",
    borderRadius: "3px",
    fontSize: "14px",
    color: "#fff",
    width: "100%",
    "& svg": {
      color: "#F6A52D",
    },
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  viewLink: {
    paddingTop: "10px",
    textDecoration: "underline",
    color: "#f6a52d",
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    justifyContent: "flex-end",
    "& link": {
      marginLeft: "2px",
    },
  },
}));
export default function TokenCard(props) {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      <Box
        component={Link}
        to='/app/launched-detail'
        style={{ textDecoration: "none" }}
      >
        <Box className={classes.mainBoxShade}></Box>
        <Box className={classes.nameBox}>
          <Box>
            <Typography variant='h4'>MemePad Old Pool5</Typography>
          </Box>
          <img src='images/logo_2.png' alt='' />
        </Box>
        <Box className={classes.apyBox}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={5}>
              <Typography variant='h4'>Total Rises</Typography>
            </Grid>
            <Grid item xs={7} align='right'>
              <Typography variant='h4'>0</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h4'>Total Tokens</Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Typography variant='h4'>12</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='h4'>Buying Coin</Typography>
            </Grid>
            <Grid item xs={7} align='right'>
              <Typography variant='h4'>BNB</Typography>
            </Grid>
            <Grid item xs={12}>
              <IOSSlider />
            </Grid>
            <Grid item xs={12}>
              <Box align='center'>
                <Button className={classes.manualBtn}> Closed</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
