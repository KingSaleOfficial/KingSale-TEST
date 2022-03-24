import React from "react";
import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core";

import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    mainBox: {
        borderRadius: "10px",
        minHeight: "250px",
        overflow: "hidden",
        position: "relative",
        background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
        border:"1px solid #b6852e",
        transition: "0.5s",
        backdropFilter: "blur(42px)",
        padding: "30px 0px 30px",
        "&:hover": {
            transform: "translateY(-10px)",
        },
    },
    apyBox: {
        padding: "20px",
        "& h4": {
            fontSize: "15px",
            fontWeight: "700",
            color: "#fff",
        },
        "& h5": {
            fontSize: "15px",
            fontWeight: "700",
            color: "#ffffffcf",
        },
  
    },
    inputBox: {
        border: "none",
        height: "30px",
        width:"100%",
        background: "rgba(141, 137, 137, 0.2)",

    },
    DialogBox: {
        backgroundColor: "#090c16 !important",
        transition: "0.5s",
        position: "relative",
        borderRadius: "10px",
        backdropFilter: "blur(4px)",
     
        "& h4": {
            fontSize: "15px",
            fontWeight: "700",
            color: "#ffffffab",
        },
        "& h1": {
            fontSize: "30px",
            fontWeight: "bold",
            lineHeight: "76px",
            color: "rgb(246, 165, 45)",
        },
        "& h5": {
            fontSize: "15px",
            fontWeight: "700",
            color: "#fff",
        },
    },
    CoinBox: {
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        "& h5": {
            fontSize: "19px",
            fontWeight: "700",
            color: "#fff",
        },

    },
    cardimg: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        marginRight: "15px",
    },
    bannerBox: {
        position: "relative",
        padding: " 10px 0px",
        zIndex: " 1",
    },
    textbox: {
        "& h1": {
            fontSize: "40px",
            fontWeight: "bold",
            lineHeight: "76px",
            color: "#FABE25",
            "@media (max-width: 767px)": {
                fontSize: "30px",
                }, 
        },
        "& p": {
            fontSize: "18px",
            color: "#fff",
        },
    },
    Buttonbox:{
        "@media (max-width: 767px)": {
            textAlign:"center",
            },     
    },
    rewardbutton:{
        "@media (max-width: 767px)": {
            minWidth: "120px",
            }, 

    },
}));
const walletdetails = [
    {
      name: "Bitcoin Miner Ani...",
      apy: "~ 0.00%",
      gain: "0.00%",
      stake: "12.25",
    },
    {
      name: "Bitcoin Miner Ani...",
      apy: "~ 0.00%",
      gain: "0.00%",
      stake: "12.25",
    },
    {
      name: "Bitcoin Miner Ani...",
      apy: "~ 0.00%",
      gain: "0.00%",
      stake: "12.25",
    },
    {
      name: "Bitcoin Miner Ani...",
      apy: "~ 0.00%",
      gain: "0.00%",
      stake: "12.25",
    },
   
  ];
export default function Items(props) {
  const { type, data } = props;
  var classes = useStyles();
  return (
    <Box>
      <Grid container spacing={3}>
      
      {walletdetails.map((data, i) => {
            return (
              <Grid item xs={12} sm={4} md={3} key={i}>
               <Box className={classes.mainBox} mt={5} mb={2}>
                      
                      <Box className={classes.CoinBox}>
          <img className={classes.cardimg} src="images/logo_2.png" alt="images"/>
          <Typography variant="h5" className="wow bounceInRight">{data.name} </Typography>
                  </Box>
          <Box className={classes.mainBoxShade}></Box>
          <Box className={classes.apyBox}>
              <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                      <Typography variant="h4">APY</Typography>
                  </Grid>
                  <Grid item xs={4} align="right">
                  <Typography variant="h5">{data.apy}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                      <Typography variant="h4">Gain Balance</Typography>
                  </Grid>
                  <Grid item xs={4} align="right">
                  <Typography variant="h5">{data.gain}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                      <Typography variant="h4">Earned</Typography>
                  </Grid>
                  <Grid item xs={4} align="right">
                  <Typography variant="h5">{data.stake}</Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                  <Box mt={2}>
                  <Button variant="contained" color="primary" fullWidth disabled>
                  Finished
                      </Button>
                      </Box>
                  </Grid>
                
               </Grid>
        
          </Box>
      </Box>
              </Grid>
            );
          })}
      
      </Grid>
    </Box>
  );
}
