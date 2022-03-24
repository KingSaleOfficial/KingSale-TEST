import React, { useState } from "react";
import {
    Box,
    Container,
    makeStyles,
    Typography,
    Grid,
    Button
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MyStake from "./MyStake";
import LiveStake from "./LiveStake";
import Withdraw from "./Withdraw";
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

    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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
            fontSize: "25px",
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

export default function Dashboard(props) {
    var classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tabview, setTabView] = useState("My");
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>
            <Box className={classes.bannerBox}> 
            <Container maxWidth="lg" align="left">
                    <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Box className={classes.Buttonbox} mt={5} align="right">
                        {/* <Button variant="contained" color="primary" className={classes.rewardbutton}
                            component={Link}
                            to="/app/create-stake">Create Stake 
                        </Button> */}
                        <Button variant="contained" color="primary" className={classes.rewardbutton}
                            component={Link}
                            to="/app/reward-staking">Reward 
                        </Button>

                        </Box>
                    </Grid>
                    </Grid>
                </Container>    
                <Container maxWidth="lg" align="left">
                    <Grid container spacing={5} justifyContent="center">
                    <Grid item xs={12} sm={12}>
                    <Box className="TabButtonsBox">
              {/* <Button
                className={tabview === "Live" ? "active" : " "}
                onClick={() => setTabView("Live")}
              >
               Live Stakes
              </Button> */}
              <Button
                className={tabview === "My" ? "active" : " "}
                onClick={() => setTabView("My")}
              >
                My Stakes
              </Button>
              <Button
                className={tabview === "WithDraw" ? "active" : " "}
                onClick={() => setTabView("WithDraw")}
              >
               WithDraw
              </Button>
             
             
            </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
            <Box className="TabButtonsContant">
              {/* {tabview === "Live" ? <LiveStake /> : ""} */}
              {tabview === "My" ? <MyStake /> : ""}
              {tabview === "WithDraw" ? <Withdraw /> : ""}
            
            </Box>
            </Grid> 
                 
                <Grid item xs={12} sm={6}>
                            <Box className={classes.mainBox} mt={5} mb={5}>
                                    <Container maxWidth="md" align="center">
                                                <Box className={classes.textbox}>
                                                    <Typography variant="h1">Withdraw</Typography>
                                                </Box>
                                    </Container>
                                    <Box className={classes.CoinBox}>
                         <img className={classes.cardimg} src="images/logo_2.png" alt="images"/>   
                        <Typography variant="h5" className="wow bounceInRight"> KingSale
                        </Typography>
                                </Box>
                        <Box className={classes.mainBoxShade}></Box>
                        <Box className={classes.apyBox}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={10}>
                                    <Typography variant="h4">APY</Typography>
                                </Grid>
                                <Grid item xs={2} align="right">
                                <Typography variant="h5">~ 0.00%</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h4">Gain Balance</Typography>
                                </Grid>
                                <Grid item xs={2} align="right">
                                <Typography variant="h5">0 GAIN</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h4">Your Stake</Typography>
                                </Grid>
                                <Grid item xs={2} align="right">
                                <Typography variant="h5">0 GAIN</Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h4" style={{ color: "#F6A52D", }}>Your Reward :</Typography>
                                    <Typography variant="h4" style={{ color: "#fff", }}>Gain 0</Typography>
                                </Grid>
                                <Grid item xs={8} align="right">
                                <Button variant="contained" color="primary">
                                Withdraw
                                    </Button>
                                </Grid>
                            </Grid>
                    
                        </Box>
                    </Box>
                </Grid>

               
                    </Grid>
                    </Container>
           
            </Box>
        </>
    );
}
