import React from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import TokenCard from "../../components/TokenCard";
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    position: "relative",
    padding: " 50px 0px",
    overflow: "hidden",
    zIndex: " 1",
  },
  textbox: {
    "& h1": {
      fontSize: "40px",
      fontWeight: "bold",
      color: "#fff",
      "& span": {
        color: "#FABE25",
      },
    },
    "& p": {
      fontSize: "16px",
      color: "#fff",
    },
    "& small": {
      "& div": {
        width: "50px",
        height: "1px",
        backgroundColor: "#FABE25",
        marginRight: "10px",
      },
      fontSize: "15px",
      color: "#FABE25",
      display: "flex",
      marginTop: "10px",
      alignItems: "center",
    },
  },
}));
const Token = [
  {
    icon: "images/icons/1.svg",
    name: "Fees",
    discription: `3% of BNB/USDT raised through the presale.
      0% of token supply to give each project their best chance.
      `,
  },
  // {
  //   icon: "images/icons/2.svg",
  //   name: "King Swap",
  //   discription: "Claim and swap your tokens directly through our KingSwap.",
  // },
  {
    icon: "images/icons/3.svg",
    name: "Token distribution",
    discription: "Check the token distribution of each presale.",
  },
  {
    icon: "images/icons/4.svg",
    name: "Community Participation",
    discription: "Vote on project safety and other features.",
  },
  {
    icon: "images/icons/5.svg",
    name: "Contract sniffer",
    discription:
      "Your first line of defence against malicious smart contracts.",
  },
  {
    icon: "images/icons/6.svg",
    name: "King Lock",
    discription:
      "Give investors security and confidence by locking liquidity and team tokens through us.",
  },
  {
    icon: "images/icons/7.svg",
    name: "Staking Deployer",
    discription:
      "A place to create or participate in staking pools for all tokens.",
  },
  {
    icon: "images/icons/8.svg",
    name: "Trending service",
    discription: `Track promising upcoming projects through the KingSale trending banner. Trending rank is measured from user engagement and is not a paid service (in contrast to the ‘promoted’ banner).`,
  },
  {
    icon: "images/icons/9.svg",
    name: "KYC feature",
    discription:
      "We offer KYC to developers to give their investors more peace of mind.",
  },
  {
    icon: "images/icons/10.svg",
    name: "Verified Pre-sale page",
    discription:
      "Ensure that all URLs point to our correct address kingsale.finance, and not any scam site.",
  },
];
export default function Dashboard(props) {
  var classes = useStyles();
  return (
    <>
      <Box className={classes.bannerBox}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <Box className={classes.textbox}>
              <Typography variant='h1'>
                Kingly Features <br /> for <span>Token Presales</span>
              </Typography>
              <small>
                {" "}
                <div></div> Services
              </small>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Box className={classes.textbox}>
              <Typography variant='body2'>
                KingSale offers a suite of tools and features to help developers
                launch their projects and investors to participate in token
                presales. Take a look around to learn more!
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Grid container spacing={3} justifyContent='center'>
            {Token.map((data, i) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                  key={i}
                  className='walletSet'
                >
                  <TokenCard data={data} type='card' index={i} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
