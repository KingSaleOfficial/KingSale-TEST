import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  makeStyles,
  Button,
  Typography,
  TextField,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import moment from "moment";
import {
  getContract,
  getWeb3Obj,
  sortAddress,
  swichNetworkHandler,
} from "src/utils";
import LiquidityLockerABI from "src/abis/LiquidityLockerABI.json";
import IERC20ABI from "src/abis/IERC20ABI.json";
import { liquidityLockerAddress, ACTIVE_NETWORK } from "src/constants";
import { useWeb3React } from "@web3-react/core";
import { UserContext } from "src/context/User";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import apiConfig from "src/config/apiConfig";
import axios from "axios";
import { FiCopy } from "react-icons/fi";
import { copyTextByValue } from "src/services";
import DataLoading from "src/components/Loaders/DataLoading";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    borderRadius: "10px",
    minHeight: "250px",
    overflow: "hidden",
    position: "relative",
    padding: "25px",
    transition: "0.5s",
    textAlign: "left",
    background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border:"1px solid #b6852e",
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
      width: "50px",
      height: "50px",
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
  const [pairAddress, setpairAddress] = useState("");
  const [contractList, setContractList] = useState([]);
  const [value, setValue] = React.useState("All");
  const [isLoading, setIsLoading] = React.useState(false);

  const submitHandler = async () => {
    if (chainId == ACTIVE_NETWORK) {
      setIsSubmit(true);
      if (pairAddress !== "") {
        try {
          setIsUpdating(true);
          const web3 = await getWeb3Obj();
          const contract = getContract(
            liquidityLockerAddress,
            LiquidityLockerABI,
            library,
            account
          );
          const contractERC = getContract(
            pairAddress,
            IERC20ABI,
            library,
            account
          );

          const balanceOf = await contractERC.balanceOf(liquidityLockerAddress);
          const tokenRegistry = await contract.tokenRegistry(pairAddress);
          if (account == tokenRegistry.beneficiary) {
            if (Number(balanceOf.toString()) > 0) {
              if (
                moment().unix() > Number(tokenRegistry.releaseTime.toString())
              ) {
                const releaseRes = await contract.release(pairAddress);
                await releaseRes.wait();
                toast.success("Success");
              } else {
                toast.error("Current time is before release time");
              }
            } else {
              toast.error("No tokens to release");
            }
          } else {
            toast.error("Not a beneficiary");
          }
          setIsUpdating(false);
        } catch (error) {
          setIsUpdating(false);
          toast.error(error.message);
          console.log("ERROR", error);
        }
      }
    } else {
      swichNetworkHandler();
    }
  };

  const liquidityLockerListHandler = async (beneficiaryAddress) => {
    try {
      setContractList([]);
      setIsLoading(true);

      const res = await axios.get(apiConfig.tokenLockerList, {
        params: {
          beneficiaryAddress: beneficiaryAddress,
        },
      });
      if (res.data.statusCode === 200) {
        setContractList(res.data.result);
      } else {
        setContractList([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      liquidityLockerListHandler(value == "All" ? undefined : account);
    }
  }, [account, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box pt={2} pb={6}>
      <Box className={classes.mainBox}>
        <Typography variant='h4' style={{ color: "#fff" }}>
          Withdraw
        </Typography>
        <Box mt={2}>
          <label>Enter the token address</label>
          <TextField
            disabled={isUpdating}
            onChange={(e) => setpairAddress(e.target.value)}
            error={isSubmit && pairAddress == ""}
            helperText={isSubmit && pairAddress == "" && "Please enter address"}
            id='outlined-basic'
            variant='outlined'
            placeholder='Pair Address'
            fullWidth
          />
          <small>e.g. Oxabgs1254....2411</small>
        </Box>
        <Box align='center' mt={3}>
          {account && user.isLogin ? (
            <Button
              onClick={submitHandler}
              disabled={isUpdating}
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
        <Box mt={2}>
          <Box mb={1} textAlign='right'>
            <Button
              style={
                value == "All"
                  ? { color: "white", borderBottom: "2px solid white" }
                  : { color: "white" }
              }
              onClick={() => {
                setValue("All");
              }}
            >
              All
            </Button>
            <Button
              style={
                value == "My"
                  ? { color: "white", borderBottom: "2px solid white" }
                  : { color: "white" }
              }
              onClick={() => {
                setValue("My");
              }}
            >
              My Lock
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <TableCell align='right'> Token Name</TableCell>
                  <TableCell align='right'>Contract Address</TableCell>
                  <TableCell align='right'>lockAmount</TableCell>
                  <TableCell align='right'>Lock Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contractList &&
                  contractList.map((data, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align='right'>
                          {" "}
                          {data.tokenName} ({data.tokenSymbol})
                        </TableCell>
                        <TableCell align='right'>
                          {sortAddress(data.contractAddress)}
                          <FiCopy
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              copyTextByValue(data.contractAddress);
                            }}
                          />
                        </TableCell>
                        <TableCell align='right'>{data.lockAmount}</TableCell>
                        <TableCell align='right'>
                          {moment(data.endTime).format("DD-MM-YYYY hh:mm A")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {isLoading && <DataLoading />}
      </Box>
    </Box>
  );
}

export default Roadmap;
