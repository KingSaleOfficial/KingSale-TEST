import React from "react";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IOSSlider from "./IOSSlider";
import { deadAddress, USDTTokenAddress } from "src/constants";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    transition: "0.5s",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    backdropFilter: " blur(4px)",

    "& label": {
      backgroundColor: "#E8424C",
      color: "#fff",
      padding: "2px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      fontSize: "9px",
      fontWeight: "800",
      width: "150px",
      fontFamily: "Roboto Slab",
      top: "14px",
      right: "-44px",
      transform: "rotate(40deg)",
    },
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
export default function TokenCard({ data }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Box className={classes.mainBox}>
      <Box
        onClick={() =>
          history.push({
            pathname: "/app/launched-detail",
            search: data.presaleAddress,
            hash: data._id,
          })
        }
        style={{ textDecoration: "none" }}
      >
        <Box className={classes.mainBoxShade}></Box>
        <label>
          Live since {moment().diff(moment(data.openTime * 1000), "hours")}h{" "}
        </label>
        <Box className={classes.nameBox}>
          <img
            src={data?.presaleImage ? data?.presaleImage : "images/logo_2.png"}
            alt=''
          />{" "}
          <Typography variant='h4'>{data?.saleTitle}</Typography>
          <Box></Box>
        </Box>
        <Box className={classes.apyBox}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={5}>
              <Typography variant='h4'>Total Rises</Typography>
            </Grid>
            <Grid item xs={7} align='right'>
              <Typography variant='h4'>{data?.totalCollectedWei}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h4'>Total Tokens</Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Typography variant='h4'>{data?.totalTokens}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='h4'>Buying Coin</Typography>
            </Grid>
            <Grid item xs={7} align='right'>
              <Typography variant='h4'>
                {" "}
                {data?.investmentToken === deadAddress
                  ? "BNB"
                  : data?.investmentToken === USDTTokenAddress
                  ? "USDT"
                  : "BUSD"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <IOSSlider
                value={Math.ceil(
                  ((parseFloat(data?.totalTokens) -
                    parseFloat(data?.tokensLeft)) /
                    data?.totalTokens) *
                    100
                )}
              />
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
