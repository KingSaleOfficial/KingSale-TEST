import React, { useContext } from "react";
import { Box, Typography, makeStyles, Button, Link } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import useStyles from "./styles";
import { AiOutlineRise } from "react-icons/ai";
import { UserContext } from "src/context/User";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  marqueAndText: {
    padding: "0 15px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    "& h5": {
      fontSize: "20px",
      color: "#fff",
      marginRight: "5px",
      marginLeft: "10px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  },
  mainmenus: {
    margin: "60px 0",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "135px",
    border: "1px solid transparent",
    borderRadius: "25px",
    backgroundImage:
      "linear-gradient(rgb(16 16 16 / 71%), rgb(26 29 40)), linear-gradient(rgb(52 63 98), rgb(34 43 80))",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
    position: "relative",
  },
  marquee: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    // alignItems: "center",
    "& h4": {
      fontSize: "17px",
      color: "#989898",
      marginRight: "5px",
      fontWeight: "600",
    },
    "& h5": {
      fontSize: "17px",
      color: "#F6A52D",
      marginRight: "5px",
      marginLeft: "0px",
      textTransform: "uppercase",
    },
    "& img": {
      width: "18px",
      height: "18px",
      borderRadius: "50%",
      marginRight: "15px",
    },
  },
  createbutton: {
    // "@media (max-width: 1024px)": {
    //   marginTop:"10px",
    //   },
    "&:hover": {
      textDecoration: "none",
    },
    "@media (max-width: 767px)": {
      // marginTop: "10px",
    },
  },
}));

const stopMarque = () => {
  document.getElementById("marquePromoted").stop();
};
const startMarque = () => {
  document.getElementById("marquePromoted").start();
};
export default function HomeCoins(props) {
  var classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  return (
    <Box className={classes.mainmenus}>
      <Box style={{ width: "100%" }}>
        <Box className={classes.marqueAndText}>
          <Typography variant='h5'>
            <AiOutlineRise /> Promoted
          </Typography>
          <marquee
            style={{ color: "red", fontSize: "3em" }}
            scrollamount='3'
            id='marquePromoted'
            onMouseOver={stopMarque}
            onMouseOut={startMarque}
          >
            <Box className={classes.marquee}>
              {user.promoteList.map((data, i) => {
                return (
                  <>
                    <Typography variant='h4'>{`#${i + 1}`}</Typography>
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
                    <img
                      src={
                        data?.presaleImage
                          ? data?.presaleImage
                          : "images/logo_2.png"
                      }
                      className={classes.marqueImg}
                      alt=''
                    />
                  </>
                );
              })}
            </Box>
          </marquee>
        </Box>
        {/* <Box align='center' mt={3}>
          <Button
            variant='contained'
            color='primary'
            className={classes.createbutton}
            component={Link}
            target='_blank'
            href='https://www.google.com/'
          >
            Promote my pre sale/project
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
}
