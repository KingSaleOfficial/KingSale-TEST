import React, { useContext, useState, useEffect } from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import KingShibaStakingABI from "src/abis/KingShibaStakingABI.json";
import { getContract, getWeb3Obj, swichNetworkHandler } from "src/utils";
import { useWeb3React } from "@web3-react/core";
import IERC20ABI from "src/abis/IERC20ABI.json";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import NoDataFound from "src/components/NoDataFound/NoDataFound";
import { ACTIVE_NETWORK } from "src/constants";

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
    "& p": {
      fontSize: "13px",
      fontWeight: "500",
      color: "#deaa26",
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
  TokenName: {
    position: "absolute",
    right: "10px",
    top: "26px",
  },
  StakeBox: {
    "& .MuiFormControl-root": {
      maxWidth: "135px",
    },
  },
}));

export default function Items() {
  var classes = useStyles();
  const user = useContext(UserContext);
  const [stakeList, setStakeList] = useState([]);
  const [filterName, setFilterName] = useState("Increasing");

  useEffect(() => {
    let list = user.liveStakingPools;
    if (filterName == "Increasing") {
      list.sort(function (a, b) {
        return a.APY - b.APY;
      });
    } else if (filterName == "Decreasing") {
      list.sort(function (a, b) {
        return b.APY - a.APY;
      });
    }

    setStakeList(list);
  }, [user.liveStakingPools, filterName]);

  return (
    <Box>
      <Box className={classes.textbox} mt={5} mb={5} align='center'>
        <Typography variant='h2'>Live staking pools</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box>
            <Select
              onChange={(e) => setFilterName(e.target.value)}
              labelId='label'
              id='select'
              value={filterName}
              fullWidth
            >
              <MenuItem value='Increasing'>Increasing APR</MenuItem>
              <MenuItem value='Decreasing'>Decreasing APR</MenuItem>
            </Select>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box className={classes.Buttonbox} mt={0} align='right'>
            {/* <Button
              variant='contained'
              color='primary'
              className={classes.rewardbutton}
              component={Link}
              to='/app/reward-staking'
            >
              Reward
            </Button> */}
          </Box>
        </Grid>
      </Grid>
      {stakeList.length === 0 && (
        <Box textAlign='center' mt={5}>
          <NoDataFound />{" "}
        </Box>
      )}
      <Grid container spacing={3}>
        {stakeList.map((data, i) => {
          return (
            <Grid item xs={12} sm={4} md={3} key={i}>
              <LiveStakeCard data={data} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export function LiveStakeCard({ data }) {
  var classes = useStyles();
  const user = useContext(UserContext);
  const [stakeAmount, setStakeAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { account, library, chainId } = useWeb3React();
  const history = useHistory();
  const stakeHandler = async (data) => {
    if (chainId === ACTIVE_NETWORK) {
      if (stakeAmount != "" && Number(stakeAmount) > 0) {
        try {
          setIsLoading(true);
          const web3 = await getWeb3Obj();
          const contractObj = getContract(
            data.createdAddress,
            KingShibaStakingABI,
            library,
            account
          );
          const approveContract = getContract(
            data.stakedToken,
            IERC20ABI,
            library,
            account
          );

          const balanceOf = await approveContract.balanceOf(account);
          const balanceOfWei = web3.utils.fromWei(balanceOf.toString());
          const isFrozen = await contractObj.isFrozen();
          if (Number(balanceOfWei) >= Number(stakeAmount)) {
            if (isFrozen == false) {
              const appRes = await approveContract.approve(
                data.createdAddress,
                web3.utils.toWei(stakeAmount.toString())
              );
              await appRes.wait();

              const res = await contractObj.deposit(
                web3.utils.toWei(stakeAmount.toString())
              );
              await res.wait();
              toast.success("Success");
              // user.getStakingListBlockChainHandler();
            } else {
              toast.error("Withdraw is frozen");
            }
          } else {
            toast.error("Not enough balance");
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log("ERROR", error);
          toast.error(error.message);
        }
      } else {
        toast.error("Please enter valid amount");
      }
    } else {
      swichNetworkHandler();
    }
  };

  return (
    <Box className={classes.mainBox} mt={5} mb={2}>
      <Box
        className={classes.CoinBox}
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push({
            pathname: "/app/withDraw-stake",
            search: data.createdAddress,
            hash: data._id,
          });
        }}
      >
        <img
          className={classes.cardimg}
          src={data?.poolImage ? data?.poolImage : "images/logo_2.png"}
          alt='images'
        />
        <Box className={classes.TokenName}>
          <Typography variant='h5' className='wow bounceInRight'>
            {data.stakedTokenName}
          </Typography>
          <Typography variant='body2' className='wow bounceInRight'>
            {data.rewardTokenName}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.mainBoxShade}></Box>
      <Box className={classes.apyBox}>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={8}>
            <Typography variant='h4'>APY: </Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h5'>~ {data.APY}%</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='h4'>Your Reward: </Typography>
          </Grid>
          <Grid item xs={4} align='right'>
            <Typography variant='h5'>
              {Number(data.pendingReward).toFixed(4)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              className={classes.StakeBox}
            >
              <label className={classes.labeltext} for='fname'>
                Stake
              </label>

              <TextField
                inputProps={{
                  readOnly: isLoading,
                }}
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                type='number'
                onChange={(e) => setStakeAmount(e.target.value)}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box mt={2}>
              <Button
                onClick={() => {
                  if (user.isLogin) {
                    stakeHandler(data);
                  } else {
                    user.connectWallet();
                  }
                }}
                variant='contained'
                color='primary'
                fullWidth
                disabled={isLoading}
              >
                {user.isLogin ? "Stake" : "Connect Wallet"}{" "}
                {isLoading && <ButtonCircularProgress />}
              </Button>
            </Box>
            {/* <Box mt={2}>
              <Button
                variant='contained'
                color='primary'
                className={classes.rewardbutton}
                component={Link}
                to={{
                  pathname: "/app/withDraw-stake",
                  search: data.createdAddress,
                  hash: data._id,
                }}
                style={{ marginRight: "7px" }}
                fullWidth
                disabled={isLoading}
              >
                WithDraw
              </Button>
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
