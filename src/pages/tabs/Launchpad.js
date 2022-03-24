import React from "react";
import {
  makeStyles,
  Typography,
  Box,
  Button,
  Container,
  Grid,
} from "@material-ui/core";
// import {SiBinance } from "react-icons/bi";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
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
  root: {},
}));

function Launchpad() {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      <Container maxWidth="lg">
        <Box mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <div className={classes.textbox}>
                <Typography variant="h1"> ENMT Token Minter</Typography>
                <Typography variant="h6">
                  {" "}
                  Select network to mint your token on Binance
                </Typography>
                <Typography variant="body2">
                  ENMT tokens are fully ERC20 compliant Non-Mintable Tokens. Use
                  the Unicrypt Token factory to mint your very own token at the
                  click of a button. Your ENMT token will be shown favourably in
                  the Unicrypt browser and bypass the need for an audit on the
                  token contract itself, as well as when using our ILO dapp.
                  Anyone can query our ENMT token mint factory with your token
                  address to see your new token is a valid, safe, and ERC20
                  compliant token.
                </Typography>
                <Typography variant="h1"> ENMT Token specs</Typography>
                <ul class="tokenSpecsList">
                  <li>
                    <DoneIcon />
                    No mint function
                  </li>
                  <li>
                    <DoneIcon />
                    No owner / admin functions
                  </li>
                  <li>
                    <DoneIcon />
                    No unsafe code in the token contract itself
                  </li>
                  <li>
                    <DoneIcon />
                    Fully ERC20 compliant
                  </li>
                  <li>
                    {" "}
                    <DoneIcon />
                    Fully decentralised
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box>
                <Typography variant="h1"> Mint your own ENMT token!</Typography>
                <Grid spacing={4} container>
                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>Token Name</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box mt={2}>
                      <label>Token Symbol</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>
                        Total supply (excluding decimals e.g. 100 tokens)
                      </label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Total supply"
                        fullWidth
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box>
                      <label>Decimals (18 reccomended)</label>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Total supply"
                        fullWidth
                      />
                    </Box>
                    <span>
                      Total supply (including decimals - raw amount) = 0
                    </span>
                  </Grid>
                </Grid>
                <Box>
                  {" "}
                  <label>
                    Total supply (including decimals - raw amount) = 0
                  </label>
                </Box>
                <Box mt={1}>
                  {" "}
                  <label>Fee: 0.2 BNB</label>
                </Box>
                <Box mt={1} mb={3}>
                  {" "}
                  <label>+ 0.2% total supply</label>
                </Box>
                <Box align="center">
                  <Button
                    className={classes.mint}
                    variant="contained"
                    size="large"
                    color="secondary"
                  >
                    MINT A NEW TOKEN
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Launchpad;
