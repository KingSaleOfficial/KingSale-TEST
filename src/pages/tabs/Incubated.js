import React from "react";
import Slider from "react-slick";
import { makeStyles, Box, Typography } from "@material-ui/core";
// import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import IOSSlider from "./IOSSlider";

const useStyles = makeStyles((theme) => ({
  root: {},
  incubcontentbox: {
    width: "100%",
    backgroundColor: "#212226",
    borderRadius: "15px",
    transform: "translateY(0px)",
    transitionDuration: "0.3s",
  },
  timemainbox: {
    width: "100%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    padding: "10px 10px",
    "& p": {
      color: "#9F9F9F",
      padding: "0px 5px",
      border: "0.2px solid #9F9F9F",
      borderRadius: "15px",
    },
  },
  timebox: {
    marhin: "auto",
    border: "0.2px solid #fff",
    borderRadius: "15px",
  },
  profile: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  profilecircle: {
    width: "75px",
    height: "75px",
    border: "0.05px solid #FABE25",
    borderRadius: "50%",
    margin: "auto",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  profiledata: {
    paddingLeft: "15px",
    "& h6": {
      color: "#9F9F9F",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
    },
  },
  rangedatabox: {
    margin: "auto",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  rangedata: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  datanum: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    "& h6": {
      color: "#9F9F9F",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
    },
  },
  bottombox: {
    width: "100%",
    borderTop: "1px solid #9F9F9F",
    "& p": {
      color: "#9F9F9F",
      padding: "5px 20px",
    },
  },
}));

const data = [
  {
    name: "XYZ Token Sale",
    date: "10 Dec,2021",
    liquidityLock: "33%",
    maxspeed: "2.5 BNB",
    softcap: "5.0 BNB",
  },
  {
    name: "idoalksnc",
    date: "10 Dec,2021",
    liquidityLock: "32%",
    maxspeed: "2.5 BNB",
    softcap: "0.1 BNB",
  },
  {
    name: "idoalksnc",
    date: "10 Dec,2021",
    liquidityLock: "33%",
    maxspeed: "2.5 BNB",
    softcap: "1.0 BNB",
  },
  {
    name: "TestingMonday",
    date: "01 Nov,2021",
    liquidityLock: "30%",
    maxspeed: "2.5 BNB",
    softcap: "0.1 BNB",
  },
  {
    name: "TestingDiwali",
    date: "01 Nov,2021",
    liquidityLock: "30%",
    maxspeed: "2.5 BNB",
    softcap: "0.1 BNB",
  },
  {
    name: "API Testing",
    date: "01 Nov,2021",
    liquidityLock: "33%",
    maxspeed: "2.5 BNB",
    softcap: "0.1 BNB",
  },
];

function Incubated() {
  const classes = useStyles();

  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          // centerPadding: "20px",
          // autoplay: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          // centerPadding: "20px",

          autoplay: false,
        },
      },
    ],
  };
  //   const PreviousBtn = (props) => {
  //     const { className, onClick } = props;
  //     return (
  //       <div className={className} onClick={onClick}>
  //         <ArrowBackIos style={{ color: "gray", fontSize: "20px" }} />
  //       </div>
  //     );
  //   };
  //   const NextBtn = (props) => {
  //     const { className, onClick } = props;
  //     return (
  //       <div className={className} onClick={onClick}>
  //         <ArrowForwardIos style={{ color: "gray", fontSize: "20px" }} />
  //       </div>
  //     );
  //   };

  return (
    <div className={classes.root}>
      <Slider {...settings} style={{ width: "100%" }}>
        {data.map((element) => {
          return (
            <Box className={classes.incubcontentbox}>
              <Box className={classes.timemainbox}>
                <Box style={{ paddingRight: "10px" }}>
                  <Typography variant="body1">Duration 1 Days</Typography>
                </Box>
                <Typography variant="body1">Starts In a Month</Typography>
              </Box>

              {/* Profile Box */}
              <Box className={classes.profile}>
                <Box padding="10px">
                  <Box className={classes.profilecircle}>
                    <img src="images/pool-1.png" alt="" />
                  </Box>
                </Box>
                <Box className={classes.profiledata}>
                  <Typography variant="h6">{element.name}</Typography>
                  <Typography variant="body1">{element.date}</Typography>
                </Box>
              </Box>
              <Box className={classes.rangedatabox}>
                <Box className={classes.rangedata}>
                  <Box className={classes.datanum}>
                    <Typography variant="body1">Liquidiy Lock</Typography>
                    <Typography variant="h6">
                      {element.liquidityLock}
                    </Typography>
                  </Box>
                  <Box className={classes.datanum}>
                    <Typography variant="body1">Max Spend</Typography>
                    <Typography variant="h6">{element.maxspeed}</Typography>
                  </Box>
                  <Box className={classes.datanum}>
                    <Typography variant="body1">Soft Cap</Typography>
                    <Typography variant="h6">{element.softcap}</Typography>
                  </Box>
                </Box>
                <Box style={{ width: "80%" }}>
                  <IOSSlider />
                </Box>
                <Box className={classes.bottombox}>
                  <Typography variant="body1">0/20 BNB</Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Slider>
    </div>
  );
}

export default Incubated;
