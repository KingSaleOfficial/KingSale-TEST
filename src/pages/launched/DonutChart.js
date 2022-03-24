import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "30px 30px 30px",
    overflow: "hidden",
    position: "relative",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    borderRadius: "10px",

    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
    },
    "& h5": {
      fontSize: "14px",
      color: "#9F9F9F",
    },
    "& h6": {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#FABE25",
    },
    "& p": {
      color: "#fff",
      width: "100%",
      fontSize: "16px",
      maxWidth: "600px",
      // maxWidth: "600px",
    },
    "& small": {
      fontSize: "12px",
      color: "#6c757d!important",
      // maxWidth: "600px",
    },
    "& label": {
      color: "#9F9F9F",
      padding: "0",
      fontSize: "14px",
      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  dexBox: {
    "& span": {
      color: "#fff !important",
    },
  },
}));

export default function DonutChart({
  allWeiValues,
  staticTextData,
  staticData,
  poolData,
  presaleAddress,
  user,
  presaleBalanceOf,
  totalSupply,
}) {
  const classes = useStyles();

  const options = {
    chart: {
      height: "100%",
      width: "100%",
      type: "line",
      id: "basic-bar",
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },

      toolbar: {
        show: false,
      },
      labels: {
        color: "#fff",
      },
    },
    labels: ["Presale", "Liquidity", "Unsold"],
  };

  const presale =
    allWeiValues?.hardCapInWei && allWeiValues?.tokenPriceInWei
      ? allWeiValues?.hardCapInWei / allWeiValues?.tokenPriceInWei
      : 0;
  const liquidity =
    allWeiValues?.hardCapInWei &&
    poolData?.ammLiquidityPercentageAllocation &&
    allWeiValues?.ammListingPriceInWei
      ? (allWeiValues?.hardCapInWei *
          poolData?.ammLiquidityPercentageAllocation) /
        100 /
        allWeiValues?.ammListingPriceInWei
      : 0;

  const unsold =
    allWeiValues?.tokenPriceInWei && allWeiValues?.totalCollectedWei
      ? presaleBalanceOf -
        allWeiValues?.totalCollectedWei / allWeiValues?.tokenPriceInWei
      : 0;

  const series = [presale, liquidity, unsold]; //our data

  return (
    <Box className={classes.mainBox} mt={3}>
      <Box className={classes.dexBox} pt={4}>
        <Chart options={options} series={series} type='donut' width='100%' />
      </Box>
    </Box>
  );
}
