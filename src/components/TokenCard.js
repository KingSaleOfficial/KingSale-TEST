import React from "react";
import {
    Box, Typography,
} from "@material-ui/core";
// import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    mainBox: {
        background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
        border:"1px solid #b6852e",
        backdropFilter: "blur(42px)",
        padding: "20px 20px ",
        position: "relative",
        borderRadius: "0 30px 0 0",
        height:" 100%",
        overflow: "hidden",
        transition: "0.5s",
        "&:hover": {
            transform: "translateY(-10px)",
        },
        "& h4": {
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "10px",
            color: "#fff",
        },
       "& figure":{
           margin:"0",
           marginBottom: "20px",
           height: "50px",
        "& img": {
            maxHeight:"50px",
        },
       },
        "& p": {
            fontSize: "14px",
            color: "#939393",
        },
        "& a": {
            fontSize: "15px",
            textDecoration: "underline",
            color: "#F6A52D",
            position: "absolute",
            bottom: "20px",
            left:"20px",
        },
    },
}));
export default function TokenCard(props) {
    const classes = useStyles();
    const { data } = props;
    return (
        <Box className={classes.mainBox} align="left">
          <figure>  <img src={data.icon} alt="icons" /></figure>
            <Typography variant="h4">{data.name}</Typography>
            <Typography variant="body2">{data.discription}</Typography>
            {/* <Link to="#">Check more details</Link> */}
        </Box>
    );
}
