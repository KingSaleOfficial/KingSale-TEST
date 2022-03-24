import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { UserContext } from "src/context/User";
import {
  getWeb3ContractObject,
  getWeb3Obj,
  getContract,
  swichNetworkHandler,
} from "src/utils";
import KingShibaStakingABI from "src/abis/KingShibaStakingABI.json";
import { useWeb3React } from "@web3-react/core";
import IERC20ABI from "src/abis/IERC20ABI.json";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import NoDataFound from "src/components/NoDataFound/NoDataFound";
import { ACTIVE_NETWORK } from "src/constants";
import { toast } from "react-toastify";
import DataLoading from "src/components/Loaders/DataLoading";
import axios from "axios";
import apiConfig from "src/config/apiConfig";
import { calculateTimeLeft } from "src/services";
import moment from "moment";

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
  },

  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
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
    justifyContent: "space-between",
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

export default function Dashboard(props) {
  var classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const location = useLocation();
  const user = useContext(UserContext);
  const [createdAddress, setCreatedAddress] = useState("");
  const [stakeDetails, setStakeDetails] = useState();
  const [userStakeAmount, setUserStakeAmount] = useState(0);
  const [totalStakingTokens, setTotalStakingTokens] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [stakeId, setStakeId] = useState();
  const [poolDetailsAPI, setPoolDetailsAPI] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState();
  const [endTime, setEndTime] = useState();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [stakeAmount, setStakeAmount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.search) {
      const ids = location.search.split("?");
      const stakeids = location.hash.split("#");
      if (stakeids[1]) {
        setStakeId(stakeids[1]);
      }
      if (ids[1]) {
        setCreatedAddress(ids[1]);
      }
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (endTime && Number(endTime) >= moment().unix()) {
        setTimeLeft(calculateTimeLeft(new Date(parseInt(endTime) * 1000)));
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (account) {
      if (createdAddress && createdAddress.length > 10) {
        const stakeData = user.stackingPoolList.filter(
          (data) => data.createdAddress == createdAddress
        );
        if (stakeData.length > 0) {
          setStakeDetails(stakeData[0]);
          getUserStakeDetails(stakeData[0]);
        }
      }
    }
  }, [createdAddress, user.liveStakingPools, account]);

  const getUserStakeDetails = async () => {
    try {
      console.log("createdAddress", createdAddress);

      const stackContractobj = await getWeb3ContractObject(
        KingShibaStakingABI,
        createdAddress
      );

      const userInfo = await stackContractobj.methods.userInfo(account).call();
      console.log("userInfo", userInfo);

      const totalStakingTokensL = await stackContractobj.methods
        .totalStakingTokens()
        .call();
      const web3 = await getWeb3Obj();
      setEndTime(Number(userInfo.nextWithdrawUntil));
      setUserStakeAmount(web3.utils.fromWei(userInfo.amount.toString()));
      setTotalStakingTokens(web3.utils.fromWei(totalStakingTokensL.toString()));
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const withdrwaHandler = async () => {
    if (chainId === ACTIVE_NETWORK) {
      try {
        setIsUpdating("withdraw");
        const web3 = await getWeb3Obj();
        const contractObj = getContract(
          stakeDetails.createdAddress,
          KingShibaStakingABI,
          library,
          account
        );

        const approveContract = getContract(
          stakeDetails.stakedToken,
          IERC20ABI,
          library,
          account
        );
        const isFrozen = await contractObj.isFrozen();
        const canWithdraw = await contractObj.canWithdraw(account);

        //   const balanceOf = await approveContract.balanceOf(account);
        //   const balanceOfWei = web3.utils.fromWei(balanceOf.toString());
        if (
          Number(withdrawAmount) > 0 &&
          Number(withdrawAmount) <= Number(userStakeAmount)
        ) {
          if (canWithdraw) {
            if (Number(userStakeAmount) > 0) {
              if (isFrozen == false) {
                const appRes = await approveContract.approve(
                  stakeDetails.createdAddress,
                  web3.utils.toWei(userStakeAmount.toString())
                );
                await appRes.wait();

                const res = await contractObj.withdraw(
                  web3.utils.toWei(userStakeAmount.toString())
                );
                await res.wait();
                toast.success("Success");
                getUserStakeDetails(stakeDetails);
              } else {
                toast.error("Withdraw is frozen");
              }
            } else {
              toast.error("Not enough balance");
            }
          } else {
            toast.error("Not enough withdraw time");
          }
        } else {
          toast.error("Please enter valid data");
        }
        setIsUpdating();
      } catch (error) {
        setIsUpdating();
        console.log("ERROR", error);
        toast.error(error.message);
      }
    } else {
      swichNetworkHandler();
    }
  };

  const emergencyWithdrawHandler = async () => {
    try {
      setIsUpdating("emergencyWithdraw");

      const contractObj = getContract(
        stakeDetails.createdAddress,
        KingShibaStakingABI,
        library,
        account
      );

      const res = await contractObj.emergencyWithdraw();
      await res.wait();
      toast.success("Success");
      setIsUpdating();
    } catch (error) {
      setIsUpdating();
      toast.error(error.message);
    }
  };

  const viewStackingHandler = async () => {
    try {
      const res = await axios.get(apiConfig.viewStacking + stakeId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setPoolDetailsAPI(res.data.result);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (stakeId && stakeId != "" && user.isLogin) {
      viewStackingHandler();
    }
  }, [stakeId, user.isLogin]);

  const harvestHandler = async (data) => {
    if (chainId === ACTIVE_NETWORK) {
      try {
        setIsUpdating("harvest");
        const web3 = await getWeb3Obj();
        const contractObj = getContract(
          createdAddress,
          KingShibaStakingABI,
          library,
          account
        );

        const stakedToken = await contractObj.stakedToken();
        const approveContract = getContract(
          stakedToken,
          IERC20ABI,
          library,
          account
        );

        const balanceOf = await approveContract.balanceOf(account);
        const balanceOfWei = web3.utils.fromWei(balanceOf.toString());
        const isFrozen = await contractObj.isFrozen();
        if (isFrozen == false) {
          const appRes = await approveContract.approve(
            createdAddress,
            web3.utils.toWei("0")
          );
          await appRes.wait();

          const res = await contractObj.deposit(web3.utils.toWei("0"));
          await res.wait();
          toast.success("Success");
          // user.getStakingListBlockChainHandler();
        } else {
          toast.error("Withdraw is frozen");
        }

        setIsUpdating();
      } catch (error) {
        setIsUpdating();
        console.log("ERROR", error);
        toast.error(error.message);
      }
    } else {
      swichNetworkHandler();
    }
  };

  const stakeHandler = async (data) => {
    if (chainId === ACTIVE_NETWORK) {
      if (stakeAmount != "" && Number(stakeAmount) > 0) {
        try {
          setIsUpdating("stake");
          const web3 = await getWeb3Obj();
          const contractObj = getContract(
            createdAddress,
            KingShibaStakingABI,
            library,
            account
          );
          const approveContract = getContract(
            stakeDetails.stakedToken,
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
                createdAddress,
                web3.utils.toWei(stakeAmount.toString())
              );
              await appRes.wait();

              const res = await contractObj.deposit(
                web3.utils.toWei(stakeAmount.toString())
              );
              await res.wait();
              toast.success("Success");
              getUserStakeDetails();
              // user.getStakingListBlockChainHandler();
            } else {
              toast.error("Withdraw is frozen");
            }
          } else {
            toast.error("Not enough balance");
          }
          setIsUpdating();
        } catch (error) {
          setIsUpdating();
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
    <>
      <Box className={classes.bannerBox}>
        <Container maxWidth='lg' align='left'>
          {!account && (
            <Box mt={5} textAlign='center'>
              <Button
                onClick={user.connectWallet}
                variant='contained'
                color='primary'
              >
                Connect Wallet
              </Button>
            </Box>
          )}
          {stakeDetails ? (
            <Grid container spacing={5} justifyContent='center'>
              <Grid item xs={12} sm={6}>
                <Box className={classes.mainBox} mt={5} mb={5}>
                  <Container maxWidth='md' align='center'>
                    <Box className={classes.textbox}>
                      <Typography variant='h1'>Withdraw</Typography>
                    </Box>
                  </Container>
                  <Box className={classes.CoinBox}>
                    <Box display={"flex"}>
                      <img
                        className={classes.cardimg}
                        src={
                          poolDetailsAPI?.poolImage
                            ? poolDetailsAPI?.poolImage
                            : "images/logo_2.png"
                        }
                        alt='images'
                      />
                      <Typography variant='h5' className='wow bounceInRight'>
                        {stakeDetails.stakedTokenName}
                      </Typography>
                      <Typography variant='body2' className='wow bounceInRight'>
                        &nbsp;({stakeDetails.rewardTokenName})
                      </Typography>
                    </Box>
                    <Box textAlign={"right"}>
                      {endTime && Number(endTime) >= moment().unix() ? (
                        <Box textAlign='center' mb={1}>
                          <Typography variant='body2' style={{ color: "#fff" }}>
                            Ends In
                          </Typography>
                          <Typography variant='body2' style={{ color: "#fff" }}>
                            {timeLeft.days}d : {timeLeft.hours}h :{" "}
                            {timeLeft.minutes}m : {timeLeft.seconds}s
                          </Typography>
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                  <Box className={classes.apyBox}>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={10}>
                        <Typography variant='h4'>APY</Typography>
                      </Grid>
                      <Grid item xs={2} align='right'>
                        <Typography variant='h5'>
                          ~ {stakeDetails.APY}%
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={10}>
                        <Typography variant='h4'>Balance</Typography>
                      </Grid>
                      <Grid item xs={2} align='right'>
                        <Typography variant='h5'>
                          {Number(stakeDetails.pendingReward).toFixed(4)}
                        </Typography>
                      </Grid> */}
                      <Grid item xs={10}>
                        <Typography variant='h4'>Your Stake</Typography>
                      </Grid>
                      <Grid item xs={2} align='right'>
                        <Typography variant='h5'>{userStakeAmount}</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant='h4'>Total Stake Token</Typography>
                      </Grid>
                      <Grid item xs={2} align='right'>
                        <Typography variant='h5'>
                          {totalStakingTokens}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Typography variant='h4' style={{ color: "#F6A52D" }}>
                          Your Reward :{" "}
                          {Number(stakeDetails.pendingReward).toFixed(4)}
                        </Typography>
                        <Typography
                          variant='h4'
                          style={{ color: "#fff" }}
                        ></Typography>
                      </Grid>

                      <Grid item xs={12} md={6} align='right'>
                        <TextField
                          inputProps={{
                            readOnly: isUpdating,
                          }}
                          id='outlined-basic'
                          variant='outlined'
                          placeholder='Withdraw Amount'
                          fullWidth
                          type='number'
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                      </Grid>

                      <Grid item xs={12} md={6} align='right'>
                        {account && user.isLogin ? (
                          <Button
                            onClick={withdrwaHandler}
                            variant='contained'
                            color='primary'
                            disabled={isUpdating}
                          >
                            Withdraw{" "}
                            {isUpdating == "withdraw" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        ) : (
                          <Button
                            onClick={user.connectWallet}
                            variant='contained'
                            color='primary'
                          >
                            Connect Wallet
                          </Button>
                        )}
                      </Grid>

                      {account && user.isLogin && (
                        <Grid item xs={12} md={6} align='right'>
                          <TextField
                            inputProps={{
                              readOnly: isUpdating,
                            }}
                            id='outlined-basic'
                            variant='outlined'
                            placeholder='Stake Amount'
                            fullWidth
                            type='number'
                            value={stakeAmount}
                            onChange={(e) => setStakeAmount(e.target.value)}
                          />
                        </Grid>
                      )}
                      {account && user.isLogin && (
                        <Grid item xs={12} md={6} align='right'>
                          <Button
                            onClick={stakeHandler}
                            variant='contained'
                            color='primary'
                            disabled={isUpdating}
                          >
                            Stake{" "}
                            {isUpdating == "stake" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid>
                      )}
                      <Grid
                        item
                        xs={12}
                        md={12}
                        align='center'
                        style={{ borderBottom: "1px solid" }}
                      ></Grid>

                      <Grid item xs={12} md={6} align='center'>
                        {account && user.isLogin && (
                          <Button
                            onClick={harvestHandler}
                            variant='contained'
                            color='primary'
                            disabled={isUpdating}
                          >
                            Harvest{" "}
                            {isUpdating == "harvest" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        )}
                      </Grid>
                      <Grid item xs={12} md={6} align='center'>
                        {account && user.isLogin && (
                          <Button
                            onClick={emergencyWithdrawHandler}
                            variant='contained'
                            color='primary'
                            disabled={isUpdating}
                          >
                            Emergency Withdraw{" "}
                            {isUpdating == "emergencyWithdraw" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <Box>{account && <DataLoading />}</Box>
          )}
        </Container>
      </Box>
    </>
  );
}
