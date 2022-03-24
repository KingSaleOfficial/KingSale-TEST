import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  makeStyles,
  Grid,
  FormHelperText,
} from "@material-ui/core";
import moment from "moment";
import Web3 from "web3";
import { KingShibaStakingData } from "src/abis/KingShibaStakingData";
import KingShibaStakingABI from "src/abis/KingShibaStakingABI.json";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import { getContract, getWeb3Obj, swichNetworkHandler } from "src/utils";
import IERC20ABI from "src/abis/IERC20ABI.json";
import axios from "axios";
import apiConfig from "src/config/apiConfig";
import { UserContext } from "src/context/User";
import { ACTIVE_NETWORK, explorerURL } from "src/constants";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import { DateTimePicker } from "@material-ui/pickers";
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};

export const uploadContractHandler = async (account, cb) => {
  const web3 = (window.web3 = new Web3(window.ethereum));
  var nfttokenContract = new web3.eth.Contract(KingShibaStakingABI);

  await nfttokenContract
    .deploy({
      data: KingShibaStakingData,
      arguments: [],
    })
    .send(
      {
        from: account,
        gas: "4700000",
      },
      function (e, contract) {
        if (
          contract &&
          contract.address &&
          typeof contract.address !== "undefined"
        ) {
        }
      }
    )
    .on("error", function (error) {
      console.log("ERROR", error);
      toast.error(error.message);
      cb({
        status: false,
        address: null,
      });
    })
    .on("transactionHash", function (transactionHash) {})
    .on("receipt", async function (receipt) {
      cb({
        status: true,
        address: receipt.contractAddress,
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
      toast.error(error.message);
      cb({
        status: false,
        address: null,
      });
    });
};

const useStyles = makeStyles((theme) => ({
  StakeBox: {
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    background:
      "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    padding: "20px 15px",

    "& h6": {
      color: "#FABE25",
    },
    "& label": {
      marginBottom: "5px",
      display: "block",
      color: "#9F9F9F",
      padding: "0",
      lineHeight: "33px",
      fontSize: "14px",
      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },

    // '& span': {

    //   color: "#9F9F9F",
    // padding: "0",
    // lineHeight: "10px",
    // fontSize: "12px",
    // transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // },

    "& h1": {
      fontSize: "50px",
      fontWeight: "600",
      lineHeight: "67px",
      letterSpacing: "3px",
      display: "inline-block",
      color: "#fff",
      [theme.breakpoints.down("lg")]: {
        fontSize: "46px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
        lineHeight: "40px",
      },
    },

    "&:hover": {
      "& .wallet_box": {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
      "& .wallet_box:first-child": {
        opacity: "1",
        top: "30%",
        right: "-60px",
      },
    },
  },
  box: {
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    background: "#f6a52d4d",
    position: "absolute",
    top: "100%",
    right: "-150px",
    transition: "0.5s all",
  },

  textbox: {
    "& h1": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "76px",
      color: "#FABE25",
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& p": {
      fontSize: "18px",
      color: "#fff",
    },
  },

  tableBox: {
    padding: "50px 0 30px",
  },
  bottomtext: {
    color: "#9F9F9F",
    display: "block",
    padding: "0",
    fontSize: "12px",
    transition:
      "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    /* line-height: 33px; */
    marginBottom: "5px",
    marginTop: "8px",
  },
}));

function CreateStake(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const { account, library, chainId } = useWeb3React();
  const [createdAddress, setCreatedAddress] = useState("");
  const [updatingData, setUpdatingData] = useState();
  const [isDeployed, setIsDeployed] = useState(false);
  const [poolCreateFees, setPoolCreateFees] = useState("");
  const [poolImage, setPoolImage] = useState("");
  const [poolImage64, setPoolImage64] = useState("");
  const [formData, setFormData] = useState({
    userStackAddress: "",
    rewardCurrencyAddress: "",
    rewardSupply: "", // APPROVE,
    rewardsPerBlock: "",
    startTime: moment().format("YYYY-MM-DDTHH:mm"),
    expireTime: moment().add(1, "hours").format("YYYY-MM-DDTHH:mm"),
    withdrawInterval: 1,
  });

  const _onInputChange = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.value };
    setFormData(temp);
  };

  const _onInputChangeById = (value, id) => {
    const temp = { ...formData, [id]: value };
    setFormData(temp);
  };

  const deployContract = async () => {
    setIsSubmit(true);
    if (chainId == ACTIVE_NETWORK) {
      const web3 = await getWeb3Obj();
      if (
        formData.userStackAddress != "" &&
        formData.rewardCurrencyAddress != "" &&
        formData.rewardSupply != "" &&
        formData.withdrawInterval != "" &&
        formData.rewardsPerBlock != "" &&
        Number(formData.rewardSupply) > 0 &&
        Number(formData.rewardsPerBlock) > 0 &&
        Number(formData.withdrawInterval) > 0 &&
        web3.utils.isAddress(formData.userStackAddress) &&
        web3.utils.isAddress(formData.rewardCurrencyAddress) &&
        moment(formData.expireTime).unix() >
          moment(formData.startTime).unix() &&
        poolImage64 !== ""
      ) {
        try {
          setUpdatingData("deploy");

          const approveContract = getContract(
            formData.rewardCurrencyAddress,
            IERC20ABI,
            library,
            account
          );

          const balanceOf = await approveContract.balanceOf(account);
          const balanceOfWei = web3.utils.fromWei(balanceOf.toString());
          console.log("balanceOfWei", balanceOfWei);
          if (Number(balanceOfWei) > Number(formData.rewardSupply)) {
            await uploadContractHandler(account, (result) => {
              if (result.status && result.address) {
                console.log(`${explorerURL}/address/${result.address}`);
                // window.open(`${explorerURL}/address/${result.address}`);
                setCreatedAddress(result.address);
                setIsDeployed(true);
              } else {
                setCreatedAddress("");
                setIsDeployed(false);
              }
            });
            setUpdatingData();
          } else {
            toast.error("Low Balance");
            setUpdatingData();
          }
        } catch (error) {
          setUpdatingData();
          setCreatedAddress("");
          setIsDeployed(false);
          console.log("ERROR", error);
        }
      } else {
        if (!web3.utils.isAddress(formData.userStackAddress)) {
          toast.error("Enter valid stack address");
        } else if (!web3.utils.isAddress(formData.rewardCurrencyAddress)) {
          toast.error("Enter valid reward currency address");
        } else {
          toast.error("Please enter valid data");
        }
      }
    } else {
      swichNetworkHandler();
    }
  };

  const createStackingAPIHandler = async () => {
    try {
      const res = await axios.post(
        apiConfig.createStacking,
        {
          stackAddress: formData.userStackAddress,
          rewardAddress: formData.rewardCurrencyAddress,
          poolImage: poolImage64,
          createdAddress,
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
      console.log("res", res);
      user.getStackingListAPIHandler();
    } catch (error) {
      console.log("EROR", error);
    }
  };

  const initializeHandler = async () => {
    if (chainId == ACTIVE_NETWORK) {
      if (createdAddress && createdAddress.length > 0) {
        try {
          setUpdatingData("create");

          const web3 = await getWeb3Obj();

          const approveContract = getContract(
            formData.rewardCurrencyAddress,
            IERC20ABI,
            library,
            account
          );

          const res = await approveContract.approve(
            createdAddress,
            web3.utils.toWei(formData.rewardSupply)
          );
          await res.wait();

          const contractObj = getContract(
            createdAddress,
            KingShibaStakingABI,
            library,
            account
          );

          const poolFees = await contractObj.poolFees();

          const currentBlockNumber = await web3.eth.getBlock("latest");

          const startTimeDiff =
            moment(formData?.startTime).diff(moment()) / 1000;
          const endTimeDiff =
            moment(formData?.expireTime).diff(moment()) / 1000;

          const startBlock =
            Number(startTimeDiff) / 3 + currentBlockNumber.number;
          const endBlock = Number(endTimeDiff) / 3 + currentBlockNumber.number;
          console.log("startBlock", parseInt(startBlock));
          console.log("endBlock", parseInt(endBlock));

          const initializeRes = await contractObj.initialize(
            formData.userStackAddress,
            formData.rewardCurrencyAddress,
            web3.utils.toWei(
              Number(Number(formData.rewardsPerBlock) / 105120)
                .toFixed(18)
                .toString()
            ),
            parseInt(startBlock),
            parseInt(endBlock),
            web3.utils.toWei(formData.rewardSupply),
            0,
            Number(formData.withdrawInterval) * 60 * 60,
            {
              value: poolFees.toString(),
            }
          );
          await initializeRes.wait();
          createStackingAPIHandler();
          toast.success("Success");
          setUpdatingData();
          setIsDeployed(false);
        } catch (error) {
          console.log("ERROR", error);
          toast.error(error.message);
          setUpdatingData();
          setIsDeployed(false);
        }
      } else {
        toast.error("Please deploy contract");
      }
    } else {
      swichNetworkHandler();
    }
  };

  const getPoolFeesHandler = async () => {
    try {
      const web3 = await getWeb3Obj();
      const contractObj = getContract(
        createdAddress,
        KingShibaStakingABI,
        library,
        account
      );
      const poolFees = await contractObj.poolFees();
      setPoolCreateFees(web3.utils.fromWei(poolFees.toString()));
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (createdAddress && createdAddress.length > 10) {
      getPoolFeesHandler();
    }
  }, [createdAddress]);

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Box mt={5}>
      <Box className={classes.textbox} align='center'>
        <Typography variant='h1'> Create Stake</Typography>
      </Box>
      <Container maxWidth='lg' align='left'>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box mt={2} className={classes.StakeBox}>
              <label className={classes.labeltext} for='fname'>
                Token Users will Stake
              </label>

              <TextField
                name='userStackAddress'
                value={formData.userStackAddress}
                onChange={_onInputChange}
                error={isSubmit && formData.userStackAddress === ""}
                helperText={
                  isSubmit &&
                  formData.userStackAddress === "" &&
                  "Please enter address"
                }
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                fullWidth
                inputProps={{
                  readOnly: isDeployed || updatingData,
                }}
              />
              <Typography variant='caption' className={classes.bottomtext}>
                The token users can stake to earn rewards from the rewards pool
                you've provided.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={2} className={classes.StakeBox}>
              <label className={classes.labeltext} for='fname'>
                Reward Currency{" "}
              </label>

              <TextField
                name='rewardCurrencyAddress'
                value={formData.rewardCurrencyAddress}
                onChange={_onInputChange}
                error={isSubmit && formData.rewardCurrencyAddress === ""}
                helperText={
                  isSubmit &&
                  formData.rewardCurrencyAddress === "" &&
                  "Please enter address"
                }
                id='outlined-basic'
                variant='outlined'
                placeholder=''
                fullWidth
                inputProps={{
                  readOnly: isDeployed || updatingData,
                }}
              />
              <Typography variant='caption' className={classes.bottomtext}>
                The token you will send the staking contract for users to earn
                for staking
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box mt={2} className={classes.StakeBox}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} className='mainBox'>
                    <label className={classes.labeltext} for='fname'>
                      Rewards Supply
                    </label>

                    <TextField
                      type='number'
                      name='rewardSupply'
                      value={formData.rewardSupply}
                      onChange={_onInputChange}
                      error={
                        isSubmit &&
                        (formData.rewardSupply === "" ||
                          Number(formData.rewardSupply) <= 0)
                      }
                      helperText={
                        isSubmit && formData.rewardSupply === ""
                          ? "Please enter data"
                          : isSubmit && Number(formData.rewardSupply) <= 0
                          ? "Please enter valid data"
                          : null
                      }
                      id='outlined-basic'
                      variant='outlined'
                      placeholder=''
                      fullWidth
                      inputProps={{
                        readOnly: isDeployed || updatingData,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} className='mainBox'>
                    <label className={classes.labeltext} for='fname'>
                      APY % (Rewards Per Block :{" "}
                      {Number(formData.rewardsPerBlock) > 0
                        ? Number(Number(formData.rewardsPerBlock) / 105120)
                            .toFixed(6)
                            .toString()
                        : 0}
                      )
                    </label>

                    <TextField
                      type='number'
                      name='rewardsPerBlock'
                      value={formData.rewardsPerBlock}
                      onChange={_onInputChange}
                      error={
                        isSubmit &&
                        (formData.rewardsPerBlock === "" ||
                          Number(formData.rewardsPerBlock) <= 0)
                      }
                      helperText={
                        isSubmit && formData.rewardsPerBlock === ""
                          ? "Please enter address"
                          : isSubmit && Number(formData.rewardsPerBlock) <= 0
                          ? "Please enter valid data"
                          : null
                      }
                      id='outlined-basic'
                      variant='outlined'
                      placeholder=''
                      fullWidth
                      inputProps={{
                        readOnly: isDeployed || updatingData,
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} className='mainBox'>
                    <label className={classes.labeltext} for='fname'>
                      When should pool start?
                    </label>
                    <DateTimePicker
                      inputVariant='outlined'
                      value={formData.startTime}
                      fullWidth
                      onChange={(date) => _onInputChangeById(date, "startTime")}
                      minDate={moment().format("YYYY-MM-DDTHH:mm")}
                      readOnly={isDeployed || updatingData}
                    />

                    {/* <TextField
                      name='startTime'
                      value={formData.startTime}
                      onChange={_onInputChange}
                      type='datetime-local'
                      id='outlined-basic'
                      variant='outlined'
                      placeholder=''
                      fullWidth
                      inputProps={{
                        min: moment().format("YYYY-MM-DDTHH:mm"),
                        readOnly: isDeployed || updatingData,
                      }}
                    /> */}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mt={2} className='mainBox'>
                    <label className={classes.labeltext} for='fname'>
                      When should pool expire?
                    </label>

                    <DateTimePicker
                      inputVariant='outlined'
                      value={formData.expireTime}
                      fullWidth
                      onChange={(date) =>
                        _onInputChangeById(date, "expireTime")
                      }
                      minDate={moment(formData.startTime).format(
                        "YYYY-MM-DDTHH:mm"
                      )}
                      readOnly={isDeployed || updatingData}
                    />

                    {/* <TextField
                      name='expireTime'
                      value={formData.expireTime}
                      onChange={_onInputChange}
                      type='datetime-local'
                      id='outlined-basic'
                      variant='outlined'
                      placeholder=''
                      fullWidth
                      inputProps={{
                        min: moment(formData.startTime).format(
                          "YYYY-MM-DDTHH:mm"
                        ),
                        readOnly: isDeployed || updatingData,
                      }}
                      error={
                        isSubmit &&
                        moment(formData.expireTime).unix() <=
                          moment(formData.startTime).unix()
                      }
                      helperText={
                        isSubmit &&
                        moment(formData.expireTime).unix() <=
                          moment(formData.startTime).unix() &&
                        "Pool expire time shound be greater then start time"
                      }
                    /> */}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box mt={2} className='mainBox'>
                    <label className={classes.labeltext} for='fname'>
                      Withdraw Interval (In Hours)
                    </label>

                    <TextField
                      type='number'
                      name='withdrawInterval'
                      value={formData.withdrawInterval}
                      onChange={_onInputChange}
                      error={
                        isSubmit &&
                        (formData.withdrawInterval === "" ||
                          Number(formData.withdrawInterval) <= 0)
                      }
                      helperText={
                        isSubmit && formData.withdrawInterval === ""
                          ? "Please enter data"
                          : isSubmit && Number(formData.withdrawInterval) <= 0
                          ? "Please enter valid data"
                          : null
                      }
                      id='outlined-basic'
                      variant='outlined'
                      placeholder=''
                      fullWidth
                      inputProps={{
                        readOnly: isDeployed || updatingData,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <label className={classes.labeltext} for='fname'>
                    Select Image
                  </label>
                  <Box mt={2} className='mainBox'>
                    <input
                      accept='image/*'
                      style={{ display: "none" }}
                      id='raised-button-file'
                      multiple
                      type='file'
                      onChange={(e) => {
                        setPoolImage(URL.createObjectURL(e.target.files[0]));
                        getBase64(e.target.files[0], (result) => {
                          setPoolImage64(result);
                        });
                      }}
                    />
                    <label htmlFor='raised-button-file'>
                      <Button
                        disabled={isDeployed || updatingData}
                        variant='contained'
                        color='secondary'
                        component='span'
                        size='small'
                      >
                        CHOOSE FILE
                      </Button>
                    </label>
                    {isSubmit && poolImage == "" && (
                      <FormHelperText error>Please select Image</FormHelperText>
                    )}
                  </Box>
                </Grid>
                {poolImage && (
                  <Grid item xs={12} sm={3}>
                    <Box mt={2} className='mainBox'>
                      <img height={150} src={poolImage} alt='' />
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} sm={12}>
                  <Box textAlign='center'>
                    {account && user.isLogin ? (
                      <Box mt={2} className='mainBox'>
                        <Button
                          onClick={deployContract}
                          variant='contained'
                          color='primary'
                          disabled={isDeployed || updatingData}
                        >
                          Deploy{" "}
                          {updatingData && updatingData === "deploy" && (
                            <ButtonCircularProgress />
                          )}
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          onClick={initializeHandler}
                          variant='contained'
                          color='primary'
                          disabled={!isDeployed || updatingData}
                        >
                          Create Stake Pool
                          {updatingData && updatingData === "create" && (
                            <ButtonCircularProgress />
                          )}
                        </Button>
                      </Box>
                    ) : (
                      <Box mt={2} className='mainBox'>
                        <Button
                          onClick={user.connectWallet}
                          variant='contained'
                          color='primary'
                        >
                          Connect Wallet
                        </Button>
                      </Box>
                    )}

                    <Box mt={1}>
                      {poolCreateFees && (
                        <Typography
                          variant='caption'
                          className={classes.bottomtext}
                        >
                          Create Stake Fee: {poolCreateFees}BNB
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CreateStake;
