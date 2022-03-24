import React from "react";
import { Box, Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { HiOutlineExternalLink } from "react-icons/hi";
const useStyles = makeStyles((theme) => ({
  mainBoxShade: {
    // position: "absolute",
    //     right: "-20px",
    //     top: "20px",
    //     width: "100%",
    //     height: "100%",
    //     background: "#161616",
    //     borderRadius: "10px",
    // "&::before": {
    //     content: "''",
    //     position: "absolute",
    //     right: "-20px",
    //     top: "20px",
    //     width: "100%",
    //     height: "100%",
    //     background: "#161616",
    //     borderRadius: "10px",
    //     zIndex: "-1",
    // },
  },
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
      fontSize: "14px",
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
    padding: "20px 20px 30px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
    "& h4": {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
      marginBottom: "5px",
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
        <label>Finished</label>
        <Box className={classes.nameBox}>
          <Box>
            <Typography variant='h4'>MemePad Old Pool5</Typography>
            <Typography variant='body2'>
              Pool unlocks Dec 2, 10:30 EST
            </Typography>
          </Box>
          <img src='images/logo_2.png' alt='' />
        </Box>
        <Box className={classes.apyBox}>
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={5}>
              <Typography variant='h4'>APY :</Typography>
            </Grid>
            <Grid item xs={7} align='right'>
              {/* <input type="text" /> */}
              <Typography variant='body2' style={{ color: "#fff" }}>
                $1234
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h4' style={{ color: "#F6A52D" }}>
                Start earning
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' color='primary' fullWidth>
                Pool Finishes
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.manualBtn}>
                {" "}
                <IoMdRefresh /> Manual
              </Button>
            </Grid>
            <Grid item xs={6} align='right'>
              <Typography variant='h4'>
                Details <BiChevronDown />{" "}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='body2' style={{ color: "#fff" }}>
                Total staked:
              </Typography>
            </Grid>
            <Grid item xs={6} align='right'>
              <Typography variant='body2' style={{ color: "#fff" }}>
                $1234
              </Typography>
            </Grid>
            <Grid item xs={8} align='center'>
              <Link href='#' className={classes.viewLink}>
                View Contract <HiOutlineExternalLink />
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
