import React from "react";
import {
    Box,
    Container,
    makeStyles,
    Typography,
    Grid,
} from "@material-ui/core";
import StakingCard from "../../components/StakingCard";
const useStyles = makeStyles((theme) => ({
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
                        {Token.map((data, i) => {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={i}
                                    className="walletSet"
                                >
                                    <StakingCard data={data} type="card" index={i} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
