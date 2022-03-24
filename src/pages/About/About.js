import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
 Container
} from "@material-ui/core";
import Team from "../../components/Team";
const useStyles = makeStyles((theme) => ({
  walletdiv: {
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    padding: "20px 15px",
    '& svg': {
      position: "absolute",
      right: "24px",
      fontSize: "80px",
      top: "9px",
      color: "#3c076a40",
      transform: "rotate(-20deg)",
    },
    '& h6': {
      color: "#FABE25",
    },

    "& a": {
      textdecoration:"none",
  },
    
      "& h1": {
        fontSize: "24px",
        fontWeight: "600",
        lineHeight: "67px",
        letterSpacing: "3px",
        display: "inline-block",
        color: "#fff",
        [theme.breakpoints.down("lg")]: {
            fontSize: "24px",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "24px",
            lineHeight: "40px",
        },
    },



    "&:hover": {
      '& .wallet_box': {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
      '& .wallet_box:first-child': {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
    },
  },
  bannerBox: {
    backgroundImage: "url('../images/banner.svg')",
    position: "relative",
    padding: " 50px 0px",
    zIndex: " 1",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
 
  },
  textbox: {
    "& h1": {
      fontSize: "45px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#FABE25",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
       
    },
    },
    "& h5": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#fff",
      marginBottom: "10px",
    },
    "& p": {
      fontSize: "16px",
      color: "#fff",
      width: "100%",
      textAlign: "left",
      marginTop:"20px",
    },
    "& div": {
      "& button": {
        "&:last-child": {
          marginLeft: "20px",
        },
      },
    },
  },
  tokenGraph: {
maxWidth:"500px",
  },
  teambox: {
    padding: "40px 0 10px",

  },
}));

const TeamCard = [
  {
    image: "images/3.png",
    name: "Assassins Bandits",
    post: "Co-founder",
  },
  {
    image: "images/3.png",
    name: "Assassins Bandits",
    post: "Co-Founder ",
  },
  {
    image: "images/3.png",
    name: "DT ",
    post: "Lead 3D Designer",
  },

  {
    image: "images/3.png",
    name: "Assassins Bandits",
    post: "Game Development",
  },
  {
    image: "images/3.png",
    name: "Assassins Bandits",
    post: "Blockchain Developer",
  },
  {
    image: "images/3.png",
    name: "Assassins Bandits",
    post: "Cyber Security",
  },
];
export default function Dashboard(props) {
  var classes = useStyles();
  return (
    <>
      <Box className={classes.bannerBox}>
      <Container maxWidth="lg" align="center">

        {/*  */}
        <Grid container align="center">
          <Grid item xs={12} md={12}>
            <Box className={classes.textbox} mt={2}>
           
              <Typography variant="h1">ABOUT KINGSALE</Typography>
              <Typography variant="body2" style={{marginTop:"40px"}}>
                Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services. Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services.Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services. Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services.
              </Typography>

              <Typography variant="body2">
                Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services. Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services.Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services. Started in June 2020, IDO King Sale provides an ever-growing suite of decentralized services. The objective is to bring value to the DeFi space as a whole by delivering disruptive, flexible and audited technology. Strenghten your project and reward your communities using our services.
              </Typography>

            </Box>
          </Grid>    
        </Grid>

        <Box mt={7}>
        <Box className={classes.textbox}>
            <Typography variant="h1">Tokenomics Graph</Typography>
        </Box>
            <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box mt={2}>
              <img src="images/tokengraph.png" alt="images" width="100%" className={classes.tokenGraph}/>
              </Box>
         
            </Grid>
        </Grid>
          </Box>

        <Box className={classes.teambox}>
        <Box className={classes.textbox} mt={5} mb={5}>
            <Typography variant="h1">Meet The Team</Typography></Box>
            <Grid container spacing={3}>
            {TeamCard.map((data, i) => {
            return (
              <Grid item xs={12} sm={6} md={2} key={i}>
                <Team data={data} index={i} />
              </Grid>
            );
          })}
        </Grid>
          </Box>
          </Container>
      </Box>
    </>
  );
}
