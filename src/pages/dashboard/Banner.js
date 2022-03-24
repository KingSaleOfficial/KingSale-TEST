import React from "react";
import { Box, makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    backgroundImage: "url('../images/banner.svg')",
    position: "relative",
    padding: " 150px 0px",
    zIndex: " 1",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("xs")]: {
      padding: " 90px 0px 0",
    },
    "& img": {
      width:"100%",
      // position: "absolute",
      // right: "-100px",
      // top: "50%",
      // transform: "translateY(-50%)",
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  },
  textbox: {
    "& h1": {
      fontSize: "45px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#FABE25",
      [theme.breakpoints.down("md")]: {
        fontSize: "35px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& h5": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#fff",
      marginBottom: "10px",
       [theme.breakpoints.down("md")]: {
        fontSize: "25px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px",
      },
    },
    "& p": {
      fontSize: "16px",
      color: "#fff",
      width: "100%",
      maxWidth: "600px",
      [theme.breakpoints.down("md")]: {
        fontSize: "14px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "13px",
      },
    },
    "& div": {
      "& button": {
        "&:last-child": {
          marginLeft: "20px",
        },
      },
    },
  },
}));
export default function Dashboard(props) {
  var classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box className={classes.bannerBox}>
      
        {/* <img src='images/KingSale.jpg' alt='images' /> */}

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} lg={5}>
            <Box className={classes.textbox}>
              <Typography variant='h1'>WELCOME TO KINGSALE</Typography>
              <Typography variant='h5'>
                A BSC Launchpad that is fit for a King
              </Typography>
              <Typography variant='body2'>
                KingSale is the next big launchpad on the BSC to provide
                developers and investors a suite of tools to safely manage
                project presales. We offer low fees for developers that don’t
                include token supply, feeless emergency withdrawal for every
                investor, and a fun welcoming community for developers to
                discuss their projects and investors to keep in touch. Welcome!{" "}
              </Typography>
              <Box mt={5}>
                <Button
                  onClick={() => history.push("/app/create-launched")}
                  variant='outlined'
                  color='primary'
                  size='large'
                >
                  Create Now
                </Button>
                <Button
                  onClick={() => history.push("/app/About")}
                  variant='outlined'
                  color='primary'
                  size='large'
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={7}>
          <img src='images/side-banner.png' alt='images' />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
