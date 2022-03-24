import React from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  withStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";
const marks = [
  {
    value: 0,
  },
  {
    value: 2500,
  },
  {
    value: 7500,
  },
  {
    value: 10000,
  },
];

const IOSSlider = withStyles({
  root: {
    color: "#FABE25!important",
    height: 12,
    padding: "15px 0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#fff",
    },
  },
  track: {
    height: 9,
  },
  rail: {
    height: 9,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 20,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);
const useStyles = makeStyles((theme) => ({
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
    width: "100%",
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
}));

export default function BestSeller() {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      <Container maxWidth="lg">
        <Box mt={5} className={classes.amount}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <Box>
                <Typography variant="h1"> Presale Details</Typography>
                <Typography variant="body2">
                  (Fields marked with * are required | Dev fee: 1% of
                  raisedETHor 1ETH, whichever is higher | Presale factory
                  address: 0xcD76d39B8979A4025C09dfAD9161C83cD21234b2)
                </Typography>
                <Grid spacing={4} container>
                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>*ERC20 Token Address</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                        fullWidth
                      />
                    </Box>
                    <small>
                      IMPORTANT: Token should have 18 decimals and should NOT
                      have liquidity inPancakeSwapuntil it is listed by ABC
                    </small>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>* Sale Title</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>Max. Investment per Wallet (BNB)</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>* Min. Investment per Wallet (BNB)</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>* Opens at</label>
                      <TextField
                        type="date"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>* Closes at</label>
                      <TextField
                        type="date"
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>* Token Price ( BNB )</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>
                        * Address where UNSOLD TOKENS will be transferred to
                      </label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                    <small>
                      Unsold tokens will be sent to burn address by default
                    </small>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>* Hard Cap</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>* Soft Cap ( BNB )</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Token Public Sale Round 1"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={3}>
                <Typography variant="h1">
                  {" "}
                  Liquidity Lock and Allocation
                </Typography>
                <Grid spacing={4} container>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>* Listing Rate (n BNB per 1 Token)</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="2"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mt={4}>
                      <IOSSlider
                        aria-label="ios slider"
                        defaultValue={60}
                        marks={marks}
                        valueLabelDisplay="on"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>*Listing Time</label>
                      <TextField
                        id="outlined-basic"
                        type="date"
                        variant="outlined"
                        placeholder="2"
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>* LP Tokens Lock Duration (Days)</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="0"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              {/* <Box mt={3}>
            <Typography variant="h1"> VøidSwap Referral Code</Typography>
          <Grid spacing={4} container>
              <Grid item xs={6} sm={3}>
                     <Box mt={2}>
                     <Typography variant="body2"> Apply your referral code</Typography>
                               
                      </Box> 
                    
              </Grid>
              <Grid item xs={6} sm={2}>
                      <Box mt={2}>
                    
                      <select className={classes.selectbox}>
                      <option>Buy</option>
                      <option>Sell</option>
                      </select>
                      </Box> 
              </Grid>       
            </Grid>
            </Box> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography variant="h1"> Whitelist</Typography>
                <Grid spacing={4} container>
                  <Grid item xs={12} sm={12}>
                    <Box mt={2}>
                      <label>Whitelisted Addresses (Comma-separated)</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Example only: 0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"
                        fullWidth
                      />
                    </Box>
                    <Box mt={2}>
                      <button
                        className={classes.buttonright}
                        variant="contained"
                        size="large"
                        style={{ color: "#fff !important" }}
                      >
                        ADD
                      </button>
                    </Box>
                    <small>Skip if there is no whitelist</small>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={3}>
                <Typography variant="h1"> Community Links</Typography>
                <Grid spacing={4} container>
                  <Grid item xs={12} sm={12}>
                    <Box mt={2}>
                      <label>Website</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="https://ABC.io"
                        fullWidth
                      />
                    </Box>

                    <Box mt={2}>
                      <label>Telegram</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="https://t.me/ABC"
                        fullWidth
                      />
                    </Box>

                    <Box mt={2}>
                      <label>Discord</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="https://discord.com/invite/aB1c234"
                        fullWidth
                      />
                    </Box>
                    <Box mt={2}>
                      <label>Twitter</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="https://twitter.com/ABC"
                        fullWidth
                      />
                    </Box>
                    <Box mt={2}>
                      <button
                        className={classes.buttonright}
                        variant="contained"
                        size="large"
                        style={{ color: "#fff !important" }}
                      >
                        CONNECT WALLET
                      </button>
                    </Box>

                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                      >
                        CREATE ICO
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
