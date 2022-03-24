import React from "react";
import {
    Box,
    Container,
    makeStyles,
    Typography,
    Grid,
    Button
} from "@material-ui/core";
import StakingCard from "../../components/StakingCard";
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
        borderRadius: "10px",
        minHeight: "250px",
        overflow: "hidden",
        position: "relative",
        background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
        border:"1px solid #b6852e",
        transition: "0.5s",
        borderRadius: "30px 0px 0 0",
        backdropFilter: "blur(42px)",

        // padding: "20px 20px 50px",
        // overflow: "hidden",
        // position: "relative",
        // background: "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
        // transition: "0.5s",
        // borderRadius: "0 30px 0 0",
        // backdropFilter: "blur(42px)",

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
            width: "40px",
            height: "40px",
            borderRadius: "50%",
        },
    },
    apyBox: {
        padding: "20px",
        "& h4": {
            fontSize: "15px",
            fontWeight: "700",
            color: "#ffffffab",
        },
        "& h5": {
            fontSize: "15px",
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
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    viewLink: {
        paddingTop: "10px",
        textDecoration: "underline",
        color: "#f6a52d",
        display: 'flex',
        alignItems: "center",
        fontSize:"12px",
        justifyContent: "flex-end",
        "& link":{
            marginLeft:"2px",
        },
    },
    inputBox: {
        border: "none",
        height: "30px",
        width:"100%",
        background: "rgba(141, 137, 137, 0.2)",
        border: "none",

    },
    DialogBox: {
        // minHeight: "250px",
        // overflow: "hidden",
        // position: "relative",
        // background: "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
        // transition: "0.5s",
        // backdropFilter: "blur(42px)",
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
    cardimg: {
        // height: "95px",
        // width: "88px",
        marginBottom: "-15px",
    },
    bannerBox: {
        position: "relative",
        padding: " 20px 0px",
        zIndex: " 1",
    },
    textbox: {
        "& h1": {
            fontSize: "40px",
            fontWeight: "bold",
            lineHeight: "76px",
            color: "#FABE25",
        },
        "& p": {
            fontSize: "18px",
            color: "#fff",
        },
    },
}));
const Token = [
    {
        icon: "images/icons/1.svg",
        name: "Fees",
        discription: "$300 USD in King Shiba token to deploy pre sale contract 0% Token tax to ensure no malicious token dumping like Pink Sale and Dx-Sale   3% Contribution token Fee on each pre sale",
    },
    {
        icon: "images/icons/1.svg",
        name: "King Swap",
        discription: "Instant access to claim and swap your tokens conveniently through our pre sale page",
    },
    {
        icon: "images/icons/1.svg",
        name: "Token distribution",
        discription: "Token distribution checker",
    },
    {
        icon: "images/icons/1.svg",
        name: "Community",
        discription: "Community vote on project safety",
    },

];
export default function Dashboard(props) {
    var classes = useStyles();
    return (
        <>
            <Box className={classes.bannerBox}>
                <Container maxWidth="md" align="center">
                    <Box className={classes.textbox}>
                        <Typography variant="h1">Staking</Typography>
                        <Typography variant="body2">Trending KINGSTAKE Deployed staking contracts</Typography>
                    </Box>
                </Container>
                <Box style={{padding: "90px 0",}}>
                    <Grid container spacing={5} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                    <Box className={classes.mainBox} >
            <Box className={classes.mainBoxShade}></Box>
            <label>New</label>
            <Box className={classes.nameBox}>
                <Box>
                    <Typography variant="h4">MemePad</Typography>
                    <Typography variant="h4" style={{ color: "#F6A52D", }}>Meme</Typography>
                </Box>
                {/* <img src="images/icon.png" alt="" /> */}
            </Box>
            <Box className={classes.apyBox}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10}>
                        <Typography variant="h4">Accured tokens per share</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                    <Typography variant="h5">0</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h4">Total Staked</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                    <Typography variant="h5">0.00</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h4">APY</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                    <Typography variant="h5">1234</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h4" style={{ color: "#F6A52D", }}>Start earning</Typography>
                    </Grid>
                    <Grid item xs={7}>
                    <Button variant="contained" color="primary" fullWidth>
                           Stake
                        </Button>
                    </Grid>
                   
              
                </Grid>
          
            </Box>
        </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                    <Box className={classes.mainBox} >
            <Box className={classes.mainBoxShade}></Box>
            <label>New</label>
            <Box className={classes.nameBox}>
                <Box>
                    <Typography variant="h4">MemePad</Typography>
                    <Typography variant="h4" style={{ color: "#F6A52D", }}>Meme</Typography>
                </Box>
                {/* <img src="images/icon.png" alt="" /> */}
            </Box>
            <Box className={classes.apyBox}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={10}>
                        <Typography variant="h4">Accured tokens per share</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                    <Typography variant="h5">0</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h4">Total Staked</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                    <Typography variant="h5">0.00</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h4">APY</Typography>
                    </Grid>
                    <Grid item xs={2} align="right">
                    <Typography variant="h5">1234</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="h4" style={{ color: "#F6A52D", }}>Start earning</Typography>
                    </Grid>
                    <Grid item xs={7}>
                    <Button variant="contained" color="primary" fullWidth>
                           Stake
                        </Button>
                    </Grid>
                   
              
                </Grid>
          
            </Box>
        </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
