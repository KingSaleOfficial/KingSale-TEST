import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  Typography,
  TextField,
  Grid,
} from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import DoneIcon from "@material-ui/icons/Done";
import moment from "moment";
import { getContract, getWeb3Obj, swichNetworkHandler } from "src/utils";
import LiquidityLockerABI from "src/abis/LiquidityLockerABI.json";
import IERC20ABI from "src/abis/IERC20ABI.json";
import { liquidityLockerAddress, ACTIVE_NETWORK } from "src/constants";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import axios from "axios";
import apiConfig from "src/config/apiConfig";
import { DateTimePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    padding: "25px",
    transition: "0.5s",
    textAlign: "left",
    background: "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border: "1px solid #b6852e",
    transition: "0.5s",
    borderRadius: "10px",
    backdropFilter: "blur(42px)",
    "& p": {
      fontSize: "16px !important",
      color: "#b8b8b8",
      marginTop: "15px",
    },
    "& label": {
      fontSize: "15px !important",
      lineHeight: "24px",
      color: "#7e7f81 !important",
    },
  },
  connectCard: {
    display: " flex",
    alignItems: "center",
    borderRadius: "5px",
    marginTop: "7px",
    color: "#fff",
    textDecoration: "none",
    "& img": {
      // width: "50px",
      height: "40px",
      borderRadius: "50%",
      marginRight: "15px",
    },
  },
}));

function Roadmap(props) {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account, library, chainId } = useWeb3React();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    contractAddress: "",
    beneficiaryAddres: "",
    lockTime: moment().format("YYYY-MM-DDTHH:mm"),
    lockAmount: 20,
  });

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, settotalSupply] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [lockPriceByPer, setLockPriceByPer] = useState(0);
  const _onInputChange = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.value };
    setFormData(temp);
  };
  const _onInputChangeById = (value, id) => {
    const temp = { ...formData, [id]: value };
    setFormData(temp);
  };
  const submitHandler = async () => {
    if (chainId == ACTIVE_NETWORK) {
      setIsSubmit(true);
      const web3 = await getWeb3Obj();

      try {
        if (
          formData.contractAddress !== "" &&
          account !== "" &&
          web3.utils.isAddress(account) &&
          web3.utils.isAddress(formData.contractAddress) &&
          formData.lockAmount !== "" &&
          moment(formData.lockTime).unix() > moment().unix() &&
          Number(formData.lockAmount) > 0
        ) {
          setIsUpdating(true);

          const weiLockPrice1 =
            (parseInt(formData.lockAmount) / 100) * parseFloat(totalSupply);
          const weiLockPrice = web3.utils.toWei(weiLockPrice1.toString());

          const contract = getContract(
            liquidityLockerAddress,
            LiquidityLockerABI,
            library,
            account
          );

          const tokenRegistry = await contract.tokenRegistry(
            formData.contractAddress
          );

          if (Number(tokenRegistry.amount.toString()) > 0) {
            if (tokenRegistry.beneficiary != account) {
              setIsUpdating(false);
              toast.error("Cannot change beneficiary for this token");
              return;
            }
          }

          const contractERC = getContract(
            formData.contractAddress,
            IERC20ABI,
            library,
            account
          );
          const appRes = await contractERC.approve(
            liquidityLockerAddress,
            weiLockPrice
          );
          await appRes.wait();
          const lockTokensRes = await contract.lockTokens(
            formData.contractAddress,
            account,
            moment(formData.lockTime).unix(),
            weiLockPrice
          );
          await lockTokensRes.wait();
          toast.success("Success");
          await addLiquidityLockerHandler();
          setIsSubmit(false);
        } else {
          if (web3.utils.isAddress(account)) {
            toast.error("Please enter valid beneficiary address");
          } else if (web3.utils.isAddress(formData.contractAddress)) {
            toast.error("Please enter valid pair address");
          }
        }
        setIsUpdating(false);
      } catch (error) {
        setIsUpdating(false);
        toast.error(error.message);
        console.log("ERROR", error);
      }
    } else {
      swichNetworkHandler();
    }
  };

  const addLiquidityLockerHandler = async () => {
    try {
      const weiLockPrice1 =
        (parseInt(formData.lockAmount) / 100) * parseFloat(totalSupply);
      const res = await axios.post(
        apiConfig.addLiquidityLocker,
        {
          contractAddress: formData.contractAddress,
          beneficiaryAddress: account,
          lockAmount: weiLockPrice1,
          tokenName: tokenName,
          tokenSymbol: tokenSymbol,
          endTime: formData.lockTime,
        },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
    } catch (error) {}
  };

  const getTokenAddressDetails = async () => {
    try {
      const web3 = await getWeb3Obj();
      const dataRes = web3.utils.isAddress(formData.contractAddress);
      if (dataRes) {
        const contract = getContract(
          formData.contractAddress,
          IERC20ABI,
          library,
          account
        );
        if (window.ethereum) {
          const decimals = await contract.decimals();
          setDecimals(decimals);

          const name = await contract.name();
          setTokenName(name);

          const symbol = await contract.symbol();
          setTokenSymbol(symbol);

          const totalSupply = await contract.balanceOf(account);
          settotalSupply(web3.utils.fromWei(totalSupply.toString()));
        }
      } else {
        setDecimals();
        setTokenName();
        setTokenSymbol();
        settotalSupply();
        toast.warn("Please enter valid address");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    if (formData.contractAddress && formData.contractAddress.length > 10) {
      getTokenAddressDetails(cancelTokenSource);
    }

    return () => {
      cancelTokenSource.cancel();
    };
  }, [formData.contractAddress]);

  useEffect(() => {
    const weiLockPrice1 =
      (parseInt(formData.lockAmount) / 100) * parseFloat(totalSupply);

    setLockPriceByPer(weiLockPrice1);
  }, [formData.lockAmount, totalSupply]);

  return (
    <Box pt={2} pb={6}>
      <Box className={classes.mainBox}>
        <Box className={classes.connectCard}>
          <img src='images/fav_1.png' alt='logo' />
          <Box>
            <Typography variant='h5'>KingLock Liquidity</Typography>
          </Box>
        </Box>
        <Typography variant='body2'>
          Use the locker to prove to investors you have locked liquidity. If you
          are not a token developer, this section is almost definitely not for
          you.
        </Typography>
        <Typography variant='body2'>Our lockers offer</Typography>
        <ul class='tokenSpecsList'>
          <li>
            <DoneIcon />
            Lock splitting
          </li>
          <li>
            <DoneIcon />
            Liquidity Migration
          </li>
          <li>
            <DoneIcon />
            Relocking
          </li>
          <li>
            <DoneIcon />
            Lock ownership transfer
          </li>
        </ul>
        <Grid spacing={1} container>
          <Grid item xs={12} sm={12}>
            <Box mt={2}>
              <label>
                Enter the PancakeSwap pair address youd like to lock liquidity
                for
              </label>
              <TextField
                placeholder='Pair Address'
                disabled={isUpdating}
                id='outlined-basic'
                variant='outlined'
                fullWidth
                name='contractAddress'
                value={formData.contractAddress}
                onChange={_onInputChange}
                error={isSubmit && formData.contractAddress === ""}
                helperText={
                  isSubmit &&
                  formData.contractAddress === "" &&
                  "Please enter address"
                }
              />
              <small>e.g. Oxabgs1254....2411</small>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={1}>
              <label>Token Name</label>
              <TextField
                readOnly
                disabled={isUpdating}
                id='outlined-basic'
                variant='outlined'
                fullWidth
                value={tokenName}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={1}>
              <label>Token Symbol</label>
              <TextField
                disabled={isUpdating}
                id='outlined-basic'
                variant='outlined'
                fullWidth
                readOnly
                value={tokenSymbol}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <label>Your Balance</label>
              <TextField
                readOnly
                disabled={isUpdating}
                id='outlined-basic'
                variant='outlined'
                fullWidth
                value={totalSupply}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <label>Decimals</label>
              <TextField
                readOnly
                disabled={isUpdating}
                id='outlined-basic'
                variant='outlined'
                fullWidth
                value={decimals}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <label>Beneficiary Account </label>
              <TextField
                disabled={isUpdating}
                id='outlined-basic'
                variant='outlined'
                fullWidth
                name='beneficiaryAddres'
                value={account}
                // onChange={_onInputChange}
                inputProps={{ readOnly: true }}
              />
              <small>e.g. Oxabgs1254....2411</small>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <label>Unlock Time </label>
              <DateTimePicker
                inputVariant='outlined'
                value={formData.lockTime}
                fullWidth
                onChange={(date) => _onInputChangeById(date, "lockTime")}
                minDate={moment().format("YYYY-MM-DDTHH:mm")}
              />
              {/* <TextField
                disabled={isUpdating}
                type='datetime-local'
                id='outlined-basic'
                variant='outlined'
                fullWidth
                name='lockTime'
                value={formData.lockTime}
                onChange={_onInputChange}
                inputProps={{
                  min: moment().format("YYYY-MM-DDTHH:mm"),
                }}
                error={
                  isSubmit && moment(formData.lockTime).unix() < moment().unix()
                }
                helperText={
                  isSubmit &&
                  moment(formData.lockTime).unix() < moment().unix() &&
                  "Please select valid date"
                }
              /> */}
            </Box>
          </Grid>
        </Grid>

        <Box mt={2}>
          <label>Lock Amount ({Number(lockPriceByPer).toFixed(2)})</label>
          {/* <TextField
            disabled={isUpdating}
            id="outlined-basic"
            variant="outlined"
            fullWidth
            type="number"
            name="lockAmount"
            value={formData.lockAmount}
            onChange={_onInputChange}
            error={
              isSubmit &&
              (formData.lockAmount === "" || Number(formData.lockAmount) <= 0)
            }
            helperText={
              isSubmit && formData.lockAmount === ""
                ? "Please enter amount"
                : formData.lockAmount !== "" && Number(formData.lockAmount) <= 0
                ? "Enter valid amount"
                : null
            }
          /> */}
          <Slider
            defaultValue={50}
            min={0}
            step={10}
            marks
            aria-label='Always visible'
            valueLabelDisplay='auto'
            name='lockAmount'
            value={formData.lockAmount}
            onChange={(e, v) => {
              const temp = {
                ...formData,
                ["lockAmount"]: v,
              };
              setFormData(temp);
            }}
            style={{ color: "#fabc12" }}
          />
        </Box>

        <Box align='center' mt={3}>
          {account && user.isLogin ? (
            <Button
              disabled={isUpdating}
              onClick={submitHandler}
              variant='contained'
              color='primary'
            >
              Submit {isUpdating && <ButtonCircularProgress />}
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
        </Box>
      </Box>
    </Box>
  );
}

export default Roadmap;
