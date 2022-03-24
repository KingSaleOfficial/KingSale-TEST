import React, { useContext } from "react";
import { Typography, Box, makeStyles, Grid, Button } from "@material-ui/core";
import { UserContext } from "src/context/User";
import NoDataFound from "src/components/NoDataFound/NoDataFound";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border: "1px solid #b6852e",
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
    "& label": {
      fontSize: "15px",
      fontWeight: "700",
      color: "#ffffffcf",
      display: "block",
      marginBottom: "7px",
    },
  },
  inputBox: {
    border: "none",
    height: "30px",
    width: "100%",
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
      fontSize: "19px",
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
    "& h2": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
  },
  Buttonbox: {
    "@media (max-width: 767px)": {
      textAlign: "center",
    },
  },
  rewardbutton: {
    "@media (max-width: 767px)": {
      minWidth: "120px",
    },
  },
}));

export default function Items() {
  var classes = useStyles();
  const user = useContext(UserContext);
  return (
    <Box>
      <Box className={classes.textbox} mt={5} mb={5} align='center'>
        <Typography variant='h2'>Finished staking pools</Typography>
      </Box>

      {user.FinishedStakingPools.length === 0 && (
        <Box textAlign='center' mt={5}>
          <NoDataFound />{" "}
        </Box>
      )}

      <Grid container spacing={3}>
        {user.FinishedStakingPools.map((data, i) => {
          return (
            <Grid item xs={12} sm={4} md={3} key={i}>
              <FinishedStakeCard data={data} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export const FinishedStakeCard = ({ data, isFinishHidden }) => {
  var classes = useStyles();
  const history = useHistory();

  return (
    <Box
      className={classes.mainBox}
      mt={5}
      mb={2}
      style={{ cursor: "pointer" }}
      onClick={() => {
        history.push({
          pathname: "/app/withDraw-stake",
          search: data.createdAddress,
          hash: data._id,
        });
      }}
    >
      <Box className={classes.CoinBox}>
        <img
          className={classes.cardimg}
          src={data?.poolImage ? data?.poolImage : "images/logo_2.png"}
          alt='images'
        />
        <Typography variant='h5' className='wow bounceInRight'>
          {data.stakedTokenName}
        </Typography>
        <Typography variant='body2' className='wow bounceInRight'>
          &nbsp;({data.rewardTokenName})
        </Typography>
      </Box>
      <Box className={classes.mainBoxShade}></Box>
      <Box className={classes.apyBox}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={8}>
            <Typography variant='h4'>APY</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h5'>~ {data.APY}%</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='h4'>Your Reward</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h5'>
              {Number(data.pendingReward).toFixed(4)}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='h4'>Earned</Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h5'>{data.rewardDebt}</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            {!isFinishHidden && (
              <Box mt={2}>
                <Button variant='contained' color='primary' fullWidth disabled>
                  Finished
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
