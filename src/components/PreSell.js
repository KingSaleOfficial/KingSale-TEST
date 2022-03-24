import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Chip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import IOSSlider from "./IOSSlider";
import { deadAddress, USDTTokenAddress } from "src/constants";
import { calculateTimeLeft } from "src/services";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    transition: "0.5s",
    cursor: "pointer",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    backdropFilter: " blur(4px)",

    "& label": {
      backgroundColor: "#107509",
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
    padding: "15px 20px 15px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
    minHeight: 95,
    "& h4": {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
    },
    "& h6": {
      fontSize: "14px",
      fontWeight: "500",
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
    "& h6": {
      fontSize: "13px",
      fontWeight: "500",
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
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timeStartLeft, setTimeStartLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        data?.closeTime &&
        data?.openTime &&
        Number(data?.openTime) < moment().unix() &&
        Number(data?.closeTime) > moment().unix()
      ) {
        setTimeLeft(
          calculateTimeLeft(new Date(parseInt(data?.closeTime) * 1000))
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        data?.closeTime &&
        data?.openTime &&
        Number(data?.openTime) > moment().unix()
      ) {
        setTimeStartLeft(
          calculateTimeLeft(new Date(parseInt(data?.openTime) * 1000))
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

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
        {/* {data.isVerify && <label>Verified</label>}{" "}
        {data.isVerify && <label>Verified</label>} */}

        <Box className={classes.nameBox}>
          <img
            src={data?.presaleImage ? data?.presaleImage : "images/logo_2.png"}
            alt=''
          />{" "}
          <Box>
            <Typography variant='h4'>{data?.saleTitle}</Typography>
            <Box>
              <Typography variant='h6'>
                {" "}
                1{" "}
                {data?.investmentToken === deadAddress
                  ? "BNB"
                  : data?.investmentToken === USDTTokenAddress
                  ? "USDT"
                  : "BUSD"}{" "}
                = {1 / Number(data?.tokenPriceInWei)} {data.symbol}
              </Typography>
            </Box>{" "}
          </Box>
          <Box mt={1} textAlign={"right"} display='flex' flexDirection='column'>
            {data.isVerify && (
              <Chip
                size='small'
                label='Verified'
                Filled
                style={{
                  backgroundColor: "#d1fae5",
                  fontWeight: "bold",
                  marginTop: 4,
                }}
              />
            )}{" "}
            {data?.closeTime &&
              data?.openTime &&
              Number(data?.openTime) > moment().unix() && (
                <Chip
                  size='small'
                  label='Upcoming'
                  Filled
                  style={{
                    backgroundColor: "#d29813",
                    color: "#fff",
                    fontWeight: "bold",
                    marginTop: 4,
                  }}
                />
              )}{" "}
            {data?.closeTime &&
              data?.openTime &&
              Number(data?.openTime) < moment().unix() &&
              Number(data?.closeTime) > moment().unix() && (
                <Chip
                  size='small'
                  label='Sale Live'
                  Filled
                  style={{
                    backgroundColor: "#10b981",
                    color: "#fff",
                    fontWeight: "bold",
                    marginTop: 4,
                  }}
                />
              )}{" "}
            {data?.closeTime &&
              data?.openTime &&
              Number(data?.closeTime) < moment().unix() && (
                <Chip
                  size='small'
                  label='Sale Ended'
                  Filled
                  style={{
                    backgroundColor: "#E8424C",
                    color: "#fff",
                    fontWeight: "bold",
                    marginTop: 4,
                  }}
                />
              )}
          </Box>
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
            <Grid item xs={6}>
              <Typography variant='h4'>Liquidity %</Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Typography variant='h4'>
                {data?.ammLiquidityPercentageAllocation}%
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='h4'>Buying Coin</Typography>
            </Grid>
            <Grid item xs={7} align='right'>
              <Typography variant='h4'>
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
            <Grid item xs={6}>
              {/* <Box className={classes.nameBox}> */}
              <Box textAlign='left' mb={0}>
                <Typography variant='h6'>Soft/Hard Cap:</Typography>
                <Typography variant='h6'>
                  {data.softCapInWei} BNB - {data.hardCapInWei} BNB
                </Typography>
              </Box>
            </Grid>{" "}
            <Grid item xs={6} align='right'>
              <Box mb={0}>
                {data?.closeTime &&
                  data?.openTime &&
                  Number(data?.openTime) < moment().unix() &&
                  Number(data?.closeTime) > moment().unix() && (
                    <Box>
                      <Typography variant='h6'>Presale Ends In</Typography>
                      <Typography variant='h6'>
                        {timeLeft.days}d : {timeLeft.hours}h :{" "}
                        {timeLeft.minutes}m : {timeLeft.seconds}s
                      </Typography>
                    </Box>
                  )}
                {data?.closeTime &&
                  data?.openTime &&
                  Number(data?.openTime) > moment().unix() && (
                    <Box>
                      <Typography variant='h6'>Presale Starts In</Typography>
                      <Typography variant='h6'>
                        {timeStartLeft.days}d : {timeStartLeft.hours}h :{" "}
                        {timeStartLeft.minutes}m : {timeStartLeft.seconds}s
                      </Typography>
                    </Box>
                  )}
                {data?.closeTime &&
                  data?.openTime &&
                  Number(data?.closeTime) < moment().unix() && (
                    <Box>
                      <Typography variant='h6'>Presale</Typography>
                      <Typography variant='h4' style={{ color: "#FFF" }}>
                        Ended
                      </Typography>
                    </Box>
                  )}
              </Box>
              {/* </Box> */}
            </Grid>
            {/* <Grid item xs={12}>
              <Box align='center'>
                <Button className={classes.manualBtn}> Closed</Button>
              </Box>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
