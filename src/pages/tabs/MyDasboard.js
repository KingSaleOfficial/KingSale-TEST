import React from "react";
import { makeStyles, Typography, Box, Grid, Button } from "@material-ui/core";
import Incubated from "./Incubated";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    padding: "20px 20px 50px",
    overflow: "hidden",
    position: "relative",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
    transition: "0.5s",
    borderRadius: "0 30px 0 0",
    backdropFilter: "blur(42px)",
  },
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
  headbox: {
    border: "0.2px solid #9F9F9F",
    borderRadius: "15px",
    marginTop: "50px",
  },
  headtext: {
    padding: "15px",
    "& h6": {
      color: "#9F9F9F",
      marginBottom: "8px",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
      // maxWidth: "600px",
    },
  },
  buttonbox: {
    width: "100%",
    margin: "auto",
    padding: "25px",
    alignItems: "center",
    display: "flex",
    justifyContent: "end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  incubbox: {
    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
  },
  incubcontentbox: {
    marginTop: "15px",
    width: "100%",
    backgroundColor: "#212226",
    borderRadius: "15px",
  },
  newtokenbox: {
    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
  },
  newtokencontent: {
    width: "100%",
    backgroundColor: "#212226",
    borderRadius: "15px",
    height: "450px",
  },
  ethereum: {
    width: "100%",
    margin: "auto",
    padding: "10px 0px",
    display: "flex",
    alignItems: "center",
    backgroundColor: "currentcolor",
    justifyContent: "space-between",
    "& h6": {
      color: "#FABE25",
      paddingRight: "15px",
    },
  },
  ethereumdata: {
    width: "100%",
    margin: "auto",
    display: "flex",
    paddingLeft: "15px",
    flexDirection: "row",
    "& h6": {
      color: "#9F9F9F",
      paddingLeft: "5px",
    },
  },
  coin: {
    width: "100%",
    margin: "auto",
    padding: "5px 0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& :hover": {
      backgroundColor: "#000",
    },
    "& h6": {
      color: "#fff",
      paddingRight: "15px",
    },
  },
  coindata: {
    width: "100%",
    margin: "auto",
    display: "flex",
    paddingLeft: "15px",
    padding: "10px 0px",
    alignItems: "center",
    flexDirection: "row",
    "& h6": {
      color: "#9F9F9F",
      paddingLeft: "5px",
    },
  },
}));

function MyDashboard() {
  const classes = useStyles();

  return (
    <Box className={classes.mainBox}>
      <Box className={classes.headbox}>
        <Grid container>
          <Grid xs={12} sm={6}>
            <Box className={classes.headtext}>
              <Typography variant="h6">$307.11M TVL</Typography>
              <Typography variant="body2">
                Total Value locked across all AMMS
              </Typography>
            </Box>
          </Grid>
          <Grid xs={12} sm={6}>
            <Box className={classes.buttonbox}>
              <Button
                className={classes.mint}
                variant="contained"
                size="large"
                color="secondary"
              >
                ACBD: $279.87
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Heading Box Design */}

      <Box paddingTop="35px">
        <Grid container spacing={4}>
          <Grid item sm={12} md={7} lg={7}>
            <Box className={classes.incubbox}>
              <Typography variant="h1">Incubated ILOs</Typography>
              <Box marginTop="35px">
                <Incubated />
              </Box>
            </Box>
          </Grid>
          <Grid item sm={12} md={5} lg={5}>
            <Box className={classes.newtokenbox}>
              <Typography variant="h1">New Token Locks</Typography>
              <Box className={classes.incubcontentbox}>
                <Box style={{ padding: "15px" }}>
                  <Box className={classes.ethereum}>
                    <Box className={classes.ethereumdata}>
                      <img
                        src="./images/ethereum-1.png"
                        alt="ethereum"
                        width="20px"
                        height="30px"
                      />
                      <Typography variant="h6">Ethereum</Typography>
                    </Box>
                    <Box className={classes.cointext}>
                      <Typography variant="h6">0&nbsp;coins</Typography>
                    </Box>
                  </Box>

                  {/* Scroll Box */}

                  <Box style={{ paddingTop: "5px", paddingBottom: "15px" }}>
                    <Box
                      style={{
                        overflowX: "scroll",
                      }}
                    ></Box>
                  </Box>
                  <Box className={classes.ethereum}>
                    <Box className={classes.ethereumdata}>
                      <img
                        src="./images/ethereum-1.png"
                        alt="ethereum"
                        width="20px"
                        height="30px"
                      />
                      <Typography variant="h6">Binance Smart</Typography>
                    </Box>
                    <Box className={classes.cointext}>
                      <Typography variant="h6">3&nbsp;coins</Typography>
                    </Box>
                  </Box>

                  <Box className={classes.coin}>
                    <Box className={classes.coindata}>
                      <img
                        src="./images/ethereum-1.png"
                        alt="ethereum"
                        width="15px"
                        height="25px"
                      />
                      <Typography variant="h6">Coin&nbsp;1</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.coin}>
                    <Box className={classes.coindata}>
                      <img
                        src="./images/ethereum-1.png"
                        alt="ethereum"
                        width="15px"
                        height="25px"
                      />
                      <Typography variant="h6">Coin&nbsp;2</Typography>
                    </Box>
                  </Box>
                  <Box className={classes.coin}>
                    <Box className={classes.coindata}>
                      <img
                        src="./images/ethereum-1.png"
                        alt="ethereum"
                        width="15px"
                        height="25px"
                      />
                      <Typography variant="h6">Coin&nbsp;3</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MyDashboard;
