import React, { useContext } from "react";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import LaunchedCard from "../../components/LaunchedCard";
import PreSell from "../../components/PreSell";

import { UserContext } from "src/context/User";
import NoDataFound from "src/components/NoDataFound/NoDataFound";

const useStyles = makeStyles((theme) => ({
  textbox: {
    mint: {
      fontSize: "14px ",
      border: "1px solid #E8424C",
      background: "#E8424C",
      fontWeight: 600,
      height: "44px ",
      color: "#FFFFFF",
      minWidth: "150px ",
      borderRadius: "50px",
      boxShadow: "none ",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        height: "45px ",
        minWidth: "120px ",
      },
      "&:hover": {
        borderColor: "#E8424C",
        background: "#E8424C",
      },
    },
    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
    "& h2": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& h3": {
      fontSize: "35px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
      "@media (max-width: 1024px)": {
        fontSize: "30px",
      },
    },
    "& h5": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#fff",
      marginBottom: "10px",
      marginTop: "15px",
    },
    "& h6": {
      color: "#9F9F9F",
      marginBottom: "10px",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
      // maxWidth: "600px",
    },
    "& label": {
      fontSize: "16px",
      color: "#fff",
      // maxWidth: "600px",
    },
    "& div": {
      "& button": {
        "&:last-child": {
          marginLeft: "20px",
        },
      },
    },
  },
  technologies: {
    background: "#ECECEC",
    borderRadius: "10px",
    maxHeight: "300px",
    "& img": {
      maxHeight: "300px",
    },
  },

  amount: {
    "& label": {
      color: "#353840",
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "33px",
    },
  },
  amountdiv: {
    maxWidth: "100%",
    height: "60px",
    border: "1px solid #00ffab",
    borderRadius: " 5px",
    display: "flex",
    padding: "0 20px",
    alignItems: "center",
    fontSize: "45px",
  },

  inputfile: {
    background: "#ECECEC",
    borderRadius: "10px",
    position: "relative",
    border: "2px dashed #DDD9D9",
    boxSizing: "border-box",
    cursor: "pointer",
    padding: "10px",

    "& input": {
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      opacity: "0",
      position: "absolute",
      cursor: "pointer",
    },

    "& img": {
      padding: "26px",
    },

    "& p": {
      fontSize: "9px",
      fontWeight: "normal",
      padding: "9px",
      lineHeight: "17px",
      textAlign: "center",
      color: "#595C62",
      marginTop: "-17px",
    },
  },

  mainBox: {
    padding: "20px 20px 50px",
    overflow: "hidden",
    position: "relative",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    transition: "0.5s",
    borderRadius: "0 30px 0 0",
    backdropFilter: "blur(42px)",

    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
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
  selectbox: {
    width: "100%",
    border: "2px solid #FABE25",
    height: "37px",
    borderRadius: "5px",
    background: "#18131d",
    color: "#9F9F9F",
    fontSize: "14px",
    padding: "5px",
  },

  buttonright: {
    fontSize: "14px ",
    border: "1px solid #E8424C",
    background: "#E8424C",
    fontWeight: 600,
    height: "44px ",
    borderRadius: "50px",
    color: "#FFFFFF",
    minWidth: "150px ",
    boxShadow: "none ",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      height: "45px ",
      minWidth: "120px ",
    },
    "&:hover": {
      borderColor: "#E8424C",
      backgroundColor: "#E8424C",
      border: "2px solid #fff",
    },
  },

  labeltext: {
    display: "inline",
    padding: "0em 0em 0.7em",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "27px",
    color: "rgb(255, 255, 255)",
    display: "block",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: "0.25em",
  },
  Buttonbox: {
    "@media (max-width: 767px)": {
      textAlign: "center",
    },
  },
  createbutton: {
    // "@media (max-width: 1024px)": {
    //   marginTop:"10px",
    //   },
    "@media (max-width: 767px)": {
      marginTop: "10px",
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();
  const user = useContext(UserContext);
  return (
    <Box className={classes.bannerBox}>
      <Box className={classes.textbox} mt={5} mb={5}>
        <Typography variant='h2' align='center'>
          Live Pre sales
        </Typography>
      </Box>

      <Box mt={5}>
        <Grid container spacing={5} justifyContent='center'>
          {user.livePoolList.map((data, i) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={i}
                className='walletSet'
              >
                <PreSell data={data} type='card' index={i} />
              </Grid>
            );
          })}
        </Grid>
        {user.livePoolList.length === 0 && <NoDataFound />}
      </Box>
    </Box>
  );
}
