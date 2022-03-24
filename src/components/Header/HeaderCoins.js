import React from "react";
import {
  Box,
  Typography,
  makeStyles,
  Link as MaterilUILink,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { BsBellFill } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
// import useStyles from "./styles";
import { AiOutlineRise } from "react-icons/ai";
import { useContext } from "react";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
const Token = [
  {
    count: "#1",
    token: "Shiba",
    icon: "images/logo_2.png",
  },
  {
    count: "#1",
    token: "Shiba",
    icon: "images/logo_2.png",
  },
  {
    count: "#1",
    token: "Shiba",
    icon: "images/logo_2.png",
  },
  {
    count: "#1",
    token: "Shiba",
    icon: "images/logo_2.png",
  },
  {
    count: "#1",
    token: "Shiba",
    icon: "images/logo_2.png",
  },
  {
    count: "#1",
    token: "Shiba",
    icon: "images/logo_2.png",
  },
];
const useStyles = makeStyles((theme) => ({
  marqueAndText: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    "& h5": {
      fontSize: "16px",
      color: "#fff",
      marginRight: "5px",
      marginLeft: "10px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  },
  mainmenus: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  marquee: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& h4": {
      fontSize: "14px",
      color: "#989898",
      marginRight: "5px",
      fontWeight: "600",
    },
    "& h5": {
      fontSize: "14px",
      color: "#F6A52D",
      marginRight: "5px",
      marginLeft: "0px",
      textTransform: "uppercase",
    },
    "& img": {
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      marginRight: "15px",
    },
  },
  coinPrice: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    whiteSpace: "nowrap",
    "& span": {
      color: "#000",
      padding: "1px 5px",
    },
    "& h4": {
      fontSize: "14px",
      color: "#fff",
      marginRight: "5px",
      fontWeight: "600",
    },
  },
}));

const stopMarque = () => {
  document.getElementById("marqueHeader").stop();
};
const startMarque = () => {
  document.getElementById("marqueHeader").start();
};

export default function HeaderCoins(props) {
  var classes = useStyles();
  const user = useContext(UserContext);
  const { account } = useWeb3React();
  const history = useHistory();
  return (
    <Box className={classes.mainmenus}>
      <Box className={classes.marqueAndText}>
        <Typography variant='h5'>
          <AiOutlineRise />
          Trending
        </Typography>
        <marquee
          style={{ color: "red", fontSize: "3em" }}
          scrollamount='3'
          id='marqueHeader'
          onMouseOver={stopMarque}
          onMouseOut={startMarque}
        >
          <Box className={classes.marquee}>
            {user.trendingPresaleList.map((data, i) => {
              return (
                <>
                  <Typography variant='h4'>#{i + 1}</Typography>
                  <Typography
                    variant='h5'
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history.push({
                        pathname: "/app/launched-detail",
                        search: data.presaleAddress,
                        hash: data._id,
                      })
                    }
                  >
                    {data.title}
                  </Typography>
                </>
              );
            })}
          </Box>
        </marquee>
      </Box>
      <Link className={classes.navLinks} to='/app/notification'>
        <BsBellFill
          style={{ fontSize: "20px", color: "#fff", margin: "0 15px" }}
        />
      </Link>
      <MaterilUILink
        className={classes.navLinks}
        target='_blank'
        href='https://twitter.com/KingSaleFinance'
      >
        <FaTwitter
          style={{ fontSize: "16px", color: "#fff", margin: "0 5px" }}
        />
      </MaterilUILink>
      <MaterilUILink
        className={classes.navLinks}
        target='_blank'
        href='https://t.me/KINGSALEcommunity'
      >
        <FaTelegramPlane
          style={{ fontSize: "16px", color: "#fff", margin: "0 15px 0 5px" }}
        />
      </MaterilUILink>

      <Box className={classes.coinPrice}>
        <span>
          <img
            src='images/header_logo.png'
            style={{ maxWidth: "25px" }}
            alt='logo'
          />
        </span>
        <Typography variant='h4'>${user.kingShibaPrice}</Typography>
      </Box>
    </Box>
  );
}
