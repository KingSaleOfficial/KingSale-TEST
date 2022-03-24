import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  withStyles,
  FormHelperText,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { UserContext } from "src/context/User";
import Web3 from "web3";
import axios from "axios";
import ApiConfig from "src/config/apiConfig";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import ContractABI from "./ABI/ContractABI.json";
import ApeContractABI from "./ABI/ApeContractABI.json";
import DataLoading from "src/components/Loaders/DataLoading";
import { toast } from "react-toastify";
import moment from "moment";
import NoDataFound from "src/components/NoDataFound/NoDataFound";
import { useWeb3React } from "@web3-react/core";
import apiConfig from "src/config/apiConfig";

const contractAdd = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
const ApeContractAddress = "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6";
const APIKEY = "9B66RMEHZ3WVVZRKIG98KDE7W2T2IMGT94";

const useStyles = makeStyles((theme) => ({
  textbox: {
    mint: {
      fontSize: "14px ",
      border: "1px solid #E8424C",
      background: "#E8424C",
      fontWeight: 600,
      height: "44px ",
      color: "#FFFFFF",
      minWidth: "150px ",
      borderRadius: "50px",
      boxShadow: "none ",
      cursor: "pointer",
      [theme.breakpoints.down("xs")]: {
        height: "45px ",
        minWidth: "120px ",
      },
      "&:hover": {
        borderColor: "#E8424C",
        background: "#E8424C",
      },
    },
    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
    "& h2": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
      "@media (max-width: 767px)": {
        fontSize: "30px",
      },
    },
    "& h3": {
      fontSize: "35px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
      "@media (max-width: 767px)": {
        fontSize: "23px",
        lineHeight: "30px",
      },
    },
    "& h5": {
      fontSize: "30px",
      fontWeight: "500",
      color: "#fff",
      marginBottom: "10px",
      marginTop: "15px",
    },
    "& h6": {
      color: "#9F9F9F",
      marginBottom: "10px",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
      // maxWidth: "600px",
    },
    "& label": {
      fontSize: "16px",
      color: "#fff",
      // maxWidth: "600px",
    },
    "& div": {
      "& button": {
        "&:last-child": {
          //   marginLeft: "20px",
        },
      },
    },
  },

  inputBox: {
    width: "100%",
    height: "45px",
    background: "#090c16",
    border: "1px solid #8a8b8b",
    color: "#fff",
    padding: "7px",
  },

  inputBox: {
    width: "100%",
    height: "50px",
    background: "#090c16",
    border: "1px solid #8a8b8b",
    borderRadius: "5px",
    color: "#fff",
    padding: "7px",
    marginRight: "14px",

    "&:focus-visible": {
      outline: "none",
    },

    "@media (max-width: 767px)": {
      width: "100%",
    },
  },

  CircularProgressbar: {
    height: "100px",
    width: "100px",
    stroke: "#fff",
    position: "relative",

    "& .CircularProgressbar-path": {
      stroke: "#f6a52d",
      strokeLinecap: "round",
      transition: "stroke-dashoffset 0.5s ease 0s",
    },

    "&.CircularProgressbar-text": {
      fill: "#ffffff",
      fontSize: "20px",
      dominantBaseline: "middle",
      textAnchor: "middle",
    },

    "& svg": {
      display: "flex",
      alignItems: "center",
      justyfycontent: "center",
    },
    "& .CircularProgressbar-text": {
      alignItems: "center",
      position: "absolute",
      transform: "translate(0% , 4%)",
      fill: "#ffffff",
    },
  },
  textBox: {
    fontSize: "15px",
    color: "#fff",
    fontWeight: "bold",
  },
  textBox1: {
    fontSize: "15px",
    color: "#fff",
  },
  textBox2: {
    fontSize: "15px",
    color: "#fff",
    marginTop: "20px",
  },
  tableBox: {
    padding: "90px 0 30px",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 0 30px",
    },
  },
  CircularButton: {
    alignItems: "center",
  },
  searchBox: {
    alignItems: "center",
  },
}));

export default function BestSeller() {
  const classes = useStyles();
  const { chainId } = useWeb3React();
  const auth = useContext(UserContext);
  const web3 = (window.web3 = new Web3(window.ethereum));
  const [contractAddress, setContractAddress] = useState("");
  const [contractData, setContractData] = useState();
  const [isSniffITLoading, SetisSniffITLoading] = useState(false);
  const [isTrackItLoading, setIsTrackItLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [liquidityScan, setLiquidityScan] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [contractScan, setContractScan] = useState(0);
  const [holderCount, setHolderCount] = useState(0);
  const [contractList, setContractList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const [isErrorInContract, setIsErrorInContract] = useState(false);
  const [topTenHoldersSum, setTopTenHoldersSum] = useState(0);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [notValid, setNotValid] = useState(false);
  const [totalDiviser, setTotalDiviser] = useState(0);
  const [isErrorInContractScan, setIsErrorInContractScan] = useState(false);
  const [estimateGasPrice, setEstimateGasPrice] = useState();
  const [buySellFeePercentage, setbBuySellFeePercentage] = useState();
  const [auditReportDoc, setAuditReportDoc] = useState();
  const [highIssueList, setHighIssueList] = useState([]);
  const checkContractHandler = async () => {
    if (contractAddress !== "") {
      try {
        setContractData();
        SetisSniffITLoading(true);
        setIsErrorInContract("");
        setIsErrorInContractScan(false);
        const res = await axios.post(
          ApiConfig.humanSummary,
          {
            contractAddress: contractAddress,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        console.log("res.data.result", res);
        if (res.data.statusCode === 200) {
          console.log("res.data.result", res);

          let I = 0.5,
            H = 6,
            M = 3,
            L = 1,
            exl = 1,
            exH = 1,
            exM = 1,
            exL = 1;

          const ISC = parseFloat(res.data.result.numberOfInformationalIssue);
          const HSC = parseFloat(res.data.result.numberOfHighIssue);
          const MSC = parseFloat(res.data.result.numberOfMediunIssue);
          const LSC = parseFloat(res.data.result.numberOfLowIssue);

          if (parseFloat(res.data.result.numberOfInformationalIssue) === 0) {
            exl = 0;
          }

          if (parseFloat(res.data.result.numberOfHighIssue) === 0) {
            exH = 0;
          }

          if (parseFloat(res.data.result.numberOfMediunIssue) === 0) {
            exM = 0;
          }
          if (parseFloat(res.data.result.numberOfLowIssue) === 0) {
            exL = 0;
          }

          let TC = ISC + HSC + MSC + LSC;
          console.log("TC", TC);

          let contractScan =
            100 -
            (((ISC / TC) * I +
              (HSC / TC) * H +
              (MSC / TC) * M +
              (LSC / TC) * L) /
              (I * exl + H * exH + M * exM + L * exL)) *
              100;

          console.log("contractScan", contractScan);

          setContractScan(parseFloat(contractScan).toFixed(2));
          setContractData(res.data.result);
        } else {
          let resObj = {
            numberOfHighIssue: "0",
            numberOfInformationalIssue: "0",
            numberOfLowIssue: "0",
            numberOfMediunIssue: "0",
            numberOfOptimizationIssue: "0",
            sourceCode: "",
          };
          setIsErrorInContractScan(true);
          setContractScan(0);
          setContractData(resObj);
          if (res.data.responseMessage) {
            setContractScan(0);
            setIsErrorInContractScan(true);
            setContractData(resObj);
            setIsErrorInContract(res.data.responseMessage);
          } else {
            setContractScan(0);
            setIsErrorInContractScan(true);
            setContractData(resObj);
            setIsErrorInContract(res.data.responseMessage);
          }
        }
        SetisSniffITLoading(false);
      } catch (error) {
        let resObj = {
          numberOfHighIssue: "0",
          numberOfInformationalIssue: "0",
          numberOfLowIssue: "0",
          numberOfMediunIssue: "0",
          numberOfOptimizationIssue: "0",
          sourceCode: "",
        };

        setContractScan(0);
        setContractData(resObj);
        setIsErrorInContractScan(true);
        setIsErrorInContract(error.message);
        SetisSniffITLoading(false);
        console.log("ERROR", error);
      }
    } else {
      toast.error("Please enter address");
    }
  };

  const getMoreHolders = async (pageNumber) => {
    try {
      const res = await axios.get(
        `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${contractAddress}&page=${pageNumber}&offset=10000&apikey=${APIKEY}`
      );

      let holdersList = res.data.result;
      return holdersList;
    } catch (error) {
      console.log("ERROR", error);
      return [];
    }
  };

  const getHoldersCount = async (address) => {
    setIsUpdatingData(true);
    setTopTenHoldersSum(0);
    setHolderCount(0);
    const web3 = (window.web3 = new Web3(window.ethereum));
    let totalHolderList = [];

    let hList = [];
    let pageNumber = 2;
    try {
      const res = await axios.get(
        `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${contractAddress}&page=1&offset=10000&apikey=${APIKEY}`
      );
      totalHolderList = hList = res.data.result;
      if (res.data.result.length == 10000) {
        while (hList.length == 10000) {
          hList = await getMoreHolders(pageNumber);
          pageNumber = pageNumber + 1;
          totalHolderList = totalHolderList.concat(hList);
        }
      }
      const holdersListSorted = await totalHolderList.sort((a, b) => {
        return (
          parseFloat(b.TokenHolderQuantity) - parseFloat(a.TokenHolderQuantity)
        );
      });
      let sum = 0;
      let count = 0;
      let length =
        holdersListSorted.length > 25 ? 25 : holdersListSorted.length;
      for (let i = 0; i < length; i++) {
        const isContract = await web3.eth.getCode(
          holdersListSorted[i].TokenHolderAddress
        );
        if (
          isContract === "0x" &&
          holdersListSorted[i].TokenHolderAddress.toLowerCase() !=
            address.toLowerCase() &&
          holdersListSorted[i].TokenHolderAddress.toLowerCase() !=
            contractAddress.toLowerCase() &&
          holdersListSorted[i].TokenHolderAddress.toLowerCase() !=
            "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F".toLowerCase() &&
          holdersListSorted[i].TokenHolderAddress.toLowerCase() !=
            "0x10ED43C718714eb63d5aA57B78B54704E256024E".toLowerCase() &&
          holdersListSorted[i].TokenHolderAddress.toLowerCase() !=
            "0x000000000000000000000000000000000000dead" &&
          holdersListSorted[i].TokenHolderAddress.toLowerCase() !=
            "0x0000000000000000000000000000000000000000"
        ) {
          count++;
          sum = sum + parseFloat(holdersListSorted[i].TokenHolderQuantity);
          if (count === 10) {
            break;
          }
        }
      }

      setTopTenHoldersSum(sum);
      setHolderCount(parseInt(totalHolderList.length));
      setIsUpdatingData(false);
    } catch (error) {
      setIsUpdatingData(false);

      console.log("ERROR", error);
    }
  };

  const getMaxTotalSupply = async (contractTest) => {
    setTotalSupply(0);

    setTotalDiviser(0);
    let diviser = 1e18;
    try {
      await contractTest.methods
        .decimals()
        .call({ from: auth.walletAddress })
        .then(async (res) => {
          diviser = "1".padEnd(parseInt(res) + 1, 0);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log("ERROR", error);
    }

    try {
      const res = await axios.get(
        `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${APIKEY}`
      );
      setTotalDiviser(res.data.result);
      setTotalSupply(parseFloat(res.data.result) / parseFloat(diviser));
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getLiquidityScanHandler = async () => {
    setOwnerAddress("");
    setNotValid(false);
    setLiquidityScan(0);
    if (auth.walletAddress !== "") {
      try {
        const contract = new web3.eth.Contract(ContractABI, contractAdd);

        await contract.methods
          .getPair(
            contractAddress,
            "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
          )
          .call({ from: auth.walletAddress })
          .then(async (result) => {
            if (result == "0x0000000000000000000000000000000000000000") {
              await getLiquidityScanHandlerAPE();
            } else {
              await liquidityScanHanlder(result);
            }
          });
      } catch (error) {
        await getLiquidityScanHandlerAPE();
        console.log("----ERROR", error);
      }
    } else {
    }
  };

  const getLiquidityScanHandlerAPE = async () => {
    try {
      const contract = new web3.eth.Contract(
        ApeContractABI,
        ApeContractAddress
      );

      await contract.methods
        .getPair(contractAddress, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c")
        .call({ from: auth.walletAddress })
        .then(async (result) => {
          await liquidityScanHanlder(result);
        });
    } catch (error) {
      console.log("----ERROR", error);
    }
  };

  const liquidityScanHanlder = async (result) => {
    console.log("RESULT", result);
    getMaxTotalSupply(0);
    getHoldersCount(result);
    try {
      const getABI = await axios.get(
        `https://api.bscscan.com/api?module=contract&action=getabi&address=${contractAddress}&apikey=${APIKEY}`
      );

      const contractTest = new web3.eth.Contract(
        JSON.parse(getABI.data.result),
        contractAddress
      );
      getMaxTotalSupply(contractTest);
      await contractTest.methods
        .owner()
        .call({ from: auth.walletAddress })
        .then(async (owner) => {
          setOwnerAddress(owner);
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log("ERROR", error);
    }

    try {
      const res = await axios.get(
        `https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${result}&page=1&offset=10000&apikey=${APIKEY}`
      );
      // if (res.data.status === '1') {
      const holdersData = res.data.result;
      const holdersListSorted = await holdersData.sort((a, b) => {
        return (
          parseFloat(b.TokenHolderQuantity) - parseFloat(a.TokenHolderQuantity)
        );
      });
      let maxAddress;
      let sum = 0;
      let length = holdersListSorted.length > 5 ? 5 : holdersListSorted.length;
      for (let i = 0; i < length; i++) {
        const isContract = await web3.eth.getCode(
          holdersListSorted[i].TokenHolderAddress
        );
        if (
          isContract != "0x" ||
          holdersListSorted[i].TokenHolderAddress.toLowerCase() ===
            "0x000000000000000000000000000000000000dead" ||
          holdersListSorted[i].TokenHolderAddress.toLowerCase() ===
            "0x0000000000000000000000000000000000000000"
        ) {
          maxAddress = holdersListSorted[i];
          const checkRes = await axios.get(
            `https://api.bscscan.com/api?module=contract&action=getabi&address=${maxAddress.TokenHolderAddress}&apikey=${APIKEY}`
          );
          if (checkRes.data.status !== "0") {
            const finalRes = await axios.get(
              `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${result}&apikey=${APIKEY}`
            );
            const liquidityScanRes =
              (parseFloat(maxAddress.TokenHolderQuantity) /
                parseFloat(finalRes.data.result)) *
              100;
            sum = sum + liquidityScanRes;
            // setTotalSupply(parseFloat(finalRes.data.result) / 1e18);
          } else {
            const finalRes = await axios.get(
              `https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${result}&apikey=${APIKEY}`
            );
            const liquidityScanRes =
              (parseFloat(maxAddress.TokenHolderQuantity) /
                parseFloat(finalRes.data.result)) *
              100;
            sum = sum + liquidityScanRes;
            if (i === 0 && isContract !== "0x") {
              try {
                const res = await axios.post(
                  ApiConfig.humanSummary,
                  {
                    contractAddress: holdersListSorted[i].TokenHolderAddress,
                  },
                  {
                    headers: {
                      token: sessionStorage.getItem("token"),
                    },
                  }
                );

                console.log("res.data.result", res);
                if (res.data.responseCode === 200) {
                  if (res.res.data.result.sourceCode !== "") {
                    setNotValid(true);
                  }
                }
              } catch (error) {
                console.log("ERROR", error);
              }
            }
          }
        }
      }

      setLiquidityScan(parseFloat(sum).toFixed(2));
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const addContractDetailsHandler = async () => {
    if (contractData) {
      try {
        setIsTrackItLoading(true);
        const res = await axios.post(
          ApiConfig.addContract,
          {
            contractAddress: contractAddress,
            numberOfOptimizationIssue:
              contractData.numberOfOptimizationIssue.toString(),
            numberOfInformationalIssue:
              contractData.numberOfInformationalIssue.toString(),
            numberOfLowIssue: contractData.numberOfLowIssue.toString(),
            numberOfMediunIssue: contractData.numberOfMediunIssue.toString(),
            numberOfHighIssue: contractData.numberOfHighIssue.toString(),
            maxSupply: totalSupply.toString(),
            holders: holderCount.toString(),
            contractScan: contractScan.toString(),
            holdersScan:
              topTenHoldersSum && totalDiviser
                ? parseFloat((topTenHoldersSum / totalDiviser) * 100).toFixed(2)
                : "0",
            liquidityScan: liquidityScan.toString(),
          },
          {
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        );
        if (res.data.statusCode == 200) {
          toast.success(res.data.responseMessage);
        } else {
          toast.error(res.data.responseMessage);
        }
        setIsTrackItLoading(false);
        listContractDetailsHandler();
      } catch (error) {
        toast.error(error.message);
        setIsTrackItLoading(false);
        console.log("error", error);
      }
    }
  };

  const listContractDetailsHandler = async () => {
    try {
      setIsLoading(true);
      setContractList();
      const res = await axios.get(ApiConfig.contractList, {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        setContractList(res.data.result);
      } else {
        setContractList([]);
      }
      setIsLoading(false);
    } catch (error) {
      listContractDetailsHandler();
      console.log("error", error);
    }
  };

  const BSCgetEstimateGasPriceHandler = async () => {
    try {
      const res = await axios.get(apiConfig.BSCgetEstimateGasPrice, {
        params: {
          contractAddress: contractAddress,
        },
      });
      if (res.data.statusCode === 200) {
        setEstimateGasPrice(res.data.result);
      } else {
        setEstimateGasPrice();
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const buySellBSCFeePercentageHandler = async () => {
    try {
      const res = await axios.get(apiConfig.buySellBSCFeePercentage, {
        params: {
          contractAddress: contractAddress,
        },
      });
      if (res.data.statusCode === 200) {
        setbBuySellFeePercentage(res.data.result);
      } else {
        setbBuySellFeePercentage();
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const auditReportHandler = async () => {
    try {
      const res = await axios.post(apiConfig.auditReport, {
        contractAddress: contractAddress,
      });
      if (res.data.statusCode === 200) {
        setAuditReportDoc(res.data.result);
      } else {
        setAuditReportDoc();
      }
    } catch (error) {
      setAuditReportDoc();

      console.log("ERROR", error);
    }
  };

  const handleSaveToPCAll = () => {
    const fileData = `${auditReportDoc}`;
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${"contract"}.txt`;
    link.href = url;
    link.click();
  };

  useEffect(() => {
    if (auth.isLogin) {
      listContractDetailsHandler();
    }
  }, [auth.isLogin]);

  const contractIssueListHandler = async () => {
    try {
      setHighIssueList([]);
      const res = await axios.post(apiConfig.contractIssueList, {
        contractAddress: contractAddress,
      });
      console.log("res", res);
      if (res.data.statusCode === 200) {
        const list = res.data.result;
        // let newArr = [];
        // for (let i = 0; list.length - 1; i++) {
        //   const data = list[i];
        //   const keys = Object.keys(data);
        //   const issueValue = data[keys[0]];
        //   if (issueValue > 0) {
        //     newArr.push(data);
        //   }
        // }
        console.log("list", list);

        setHighIssueList(list);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <Box className={classes.bannerBox}>
      <Container maxWidth='lg' align='center'>
        <Box className={classes.textbox} mt={5} mb={5}>
          <Typography variant='h2'>Contract Sniffer</Typography>
        </Box>

        <Box mt={5}>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12} sm={8} md={7} lg={5}>
              <Box mt={2} mb={3} className={classes.searchBox}>
                <input
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value.trim())}
                  placeholder='Enter contract address or Solidity contract'
                  type='text'
                  placeholder='Search Address'
                  fullwidth
                  className={classes.inputBox}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={5} lg={3} align='left'>
              <Button
                variant='contained'
                color='secondary'
                className={classes.sniffe_button}
                disabled={isSniffITLoading || isUpdatingData}
                onClick={() => {
                  if (auth.isLogin) {
                    if (chainId == 56) {
                      contractIssueListHandler();
                      checkContractHandler();
                      getLiquidityScanHandler();
                      BSCgetEstimateGasPriceHandler();
                      buySellBSCFeePercentageHandler();
                      auditReportHandler();
                    } else {
                      toast.warn("Please swich to Smart Chain");
                    }
                  } else {
                    auth.connectWallet();
                  }
                }}
              >
                {auth.isLogin ? "Sniff-it" : "Connect Wallet"}
                {(isSniffITLoading || isUpdatingData) && (
                  <ButtonCircularProgress />
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
        {isErrorInContractScan && (
          <Box display='flex' justifyContent='center'>
            <FormHelperText error>
              {"Impossible to scan the smart contract code"}
            </FormHelperText>
          </Box>
        )}

        <Box mt={3} mb={5}>
          {!isErrorInContractScan && (
            <>
              {contractData && !isUpdatingData ? (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} align='left'>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={6}>
                        <Typography variant='h5' className={classes.textBox}>
                          Ownership Renouncement
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h6' className={classes.textBox1}>
                          {ownerAddress ==
                          "0x0000000000000000000000000000000000000000"
                            ? "Renounced"
                            : "Not Renounced"}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h5' className={classes.textBox}>
                          Max Total Supply
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h6' className={classes.textBox1}>
                          {totalSupply && Math.ceil(totalSupply)}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h5' className={classes.textBox}>
                          Holders
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h6' className={classes.textBox}>
                          {holderCount} Holders
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h5' className={classes.textBox}>
                          Estimate Gas Price
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant='h6' className={classes.textBox}>
                          {estimateGasPrice}
                        </Typography>
                      </Grid>
                      {buySellFeePercentage &&
                        buySellFeePercentage["Buy Taxation"] >= 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography
                                variant='h5'
                                className={classes.textBox}
                              >
                                Buy Taxation
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant='h6'
                                className={classes.textBox}
                              >
                                {buySellFeePercentage["Buy Taxation"]}%
                              </Typography>
                            </Grid>{" "}
                          </>
                        )}
                      {buySellFeePercentage &&
                        buySellFeePercentage["Sell Taxation"] >= 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography
                                variant='h5'
                                className={classes.textBox}
                              >
                                Sell Taxation
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant='h6'
                                className={classes.textBox}
                              >
                                {buySellFeePercentage["Sell Taxation"]}%
                              </Typography>
                            </Grid>{" "}
                          </>
                        )}
                      {buySellFeePercentage &&
                        buySellFeePercentage["Buy Gas Fee"] >= 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography
                                variant='h5'
                                className={classes.textBox}
                              >
                                Buy Gas Fee
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant='h6'
                                className={classes.textBox}
                              >
                                {buySellFeePercentage["Buy Gas Fee"]}
                              </Typography>
                            </Grid>{" "}
                          </>
                        )}
                      {buySellFeePercentage &&
                        buySellFeePercentage["Sell Gas Fee"] >= 0 && (
                          <>
                            <Grid item xs={6}>
                              <Typography
                                variant='h5'
                                className={classes.textBox}
                              >
                                Sell Gas Fee
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                variant='h6'
                                className={classes.textBox}
                              >
                                {buySellFeePercentage["Sell Gas Fee"]}
                              </Typography>
                            </Grid>
                          </>
                        )}
                      {!isErrorInContractScan && (
                        <>
                          <Grid item xs={6}>
                            <Typography
                              variant='h5'
                              className={classes.textBox}
                            >
                              High issue
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant='h6'
                              className={classes.textBox1}
                            >
                              {contractData && contractData.numberOfHighIssue}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant='h5'
                              className={classes.textBox}
                            >
                              Medium issue
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant='h6'
                              className={classes.textBox1}
                            >
                              {contractData && contractData.numberOfMediunIssue}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant='h5'
                              className={classes.textBox}
                            >
                              Low issue
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant='h6'
                              className={classes.textBox1}
                            >
                              {contractData && contractData.numberOfLowIssue}
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={6} align='right'>
                    <Grid container spacing={2}>
                      <Grid item xs={6} sm={4} align='center'>
                        <Box>
                          <CircularProgressbar
                            className={classes.CircularProgressbar}
                            value={contractScan}
                            text={`${contractScan}%`}
                            style={{ width: "80%" }}
                          />
                          <Typography
                            variant='h6'
                            className={classes.textBox2}
                            align='center'
                          >
                            Contract Scan
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} align='center'>
                        <Box>
                          <CircularProgressbar
                            className={classes.CircularProgressbar}
                            value={
                              topTenHoldersSum &&
                              totalDiviser &&
                              parseFloat(
                                (topTenHoldersSum / totalDiviser) * 100
                              ).toFixed(2)
                            }
                            text={`${
                              topTenHoldersSum &&
                              totalDiviser &&
                              parseFloat(
                                (topTenHoldersSum / totalDiviser) * 100
                              ).toFixed(2)
                            }%`}
                          />
                          <Typography
                            variant='h6'
                            className={classes.textBox2}
                            align='center'
                          >
                            Holders Scan
                          </Typography>
                          <Typography
                            variant='h6'
                            className={classes.textBox2}
                            align='center'
                            style={{ marginTop: "0px", color: "#9F9F9F" }}
                          >
                            Top 10 Holders Own
                          </Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={6} sm={4} align='center'>
                        <Box>
                          <CircularProgressbar
                            className={classes.CircularProgressbar}
                            value={liquidityScan && liquidityScan}
                            text={`${liquidityScan && liquidityScan}%`}
                          />
                          <Typography
                            variant='h6'
                            className={classes.textBox2}
                            align='center'
                          >
                            Liquidity Scan
                          </Typography>

                          {notValid && (
                            <Typography>
                              Highest LP holder address is not from a verified
                              source
                            </Typography>
                          )}
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12} align='center'>
                        <Box className={classes.CircularButton} mt={2}>
                          {auth.isLogin ? (
                            <>
                              <Button
                                variant='contained'
                                color='secondary'
                                disabled={isTrackItLoading || !contractData}
                                onClick={() => addContractDetailsHandler()}
                              >
                                Track It!{" "}
                                {isTrackItLoading && <ButtonCircularProgress />}
                              </Button>{" "}
                              &nbsp;&nbsp;
                              {auditReportDoc && (
                                <Button
                                  variant='contained'
                                  color='secondary'
                                  onClick={() => handleSaveToPCAll()}
                                >
                                  Download Report
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button
                              variant='contained'
                              color='secondary'
                              onClick={() => auth.connectWallet()}
                            >
                              Connect Wallet
                            </Button>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Box style={{ color: "#fff" }}>
                          {contractData &&
                            highIssueList &&
                            highIssueList.length === 0 &&
                            Number(contractData.numberOfHighIssue) > 0 && (
                              <Box textAlign='left' mt={1}>
                                <Typography>
                                  Loading high issue data{" "}
                                  <ButtonCircularProgress />
                                </Typography>
                              </Box>
                            )}

                          {highIssueList &&
                            highIssueList.length > 0 &&
                            contractData &&
                            Number(contractData.numberOfHighIssue) > 0 && (
                              <Box
                                textAlign='left'
                                mt={1}
                                style={{
                                  border: "1px solid",
                                  padding: "5px 15px",
                                }}
                              >
                                <Typography paragraph>High issue</Typography>
                                {highIssueList &&
                                  highIssueList.map((data, i) => {
                                    const keys = Object.keys(data);
                                    const issueValue = data[keys[0]];
                                    return (
                                      <Typography style={{ color: "#E8424C" }}>
                                        {issueValue > 0
                                          ? `- ${data[keys[1]]}`
                                          : null}
                                      </Typography>
                                    );
                                  })}
                              </Box>
                            )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Box display='flex' justifyContent='center'>
                  {isErrorInContract && isErrorInContract !== "" ? (
                    <FormHelperText error>{isErrorInContract}</FormHelperText>
                  ) : isSniffITLoading || isUpdatingData ? (
                    <DataLoading />
                  ) : (
                    <Typography>
                      Please enter contract address and click on 'SNIFF-IT!'
                      button to see details{" "}
                      {chainId != 56 && (
                        <span style={{ color: "#E8424C" }}>
                          (Please swich to Smart Chain Mainnet)
                        </span>
                      )}
                    </Typography>
                  )}
                </Box>
              )}
            </>
          )}
          <Box className={classes.tableBox}>
            <Grid container spacing={3} alignItems='center'>
              <Grid item xs={12} sm={12}>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label='customized table'
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell> Overall Score</TableCell>
                        <TableCell align=''>Last Checked</TableCell>
                        <TableCell align=''>Contract Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contractList &&
                        contractList.map((data, i) => {
                          let overAllScore =
                            (parseFloat(data.contractScan) +
                              parseFloat(data.holdersScan) +
                              parseFloat(data.liquidityScan)) /
                            3;
                          return (
                            <TableRow key={i}>
                              <TableCell>
                                {" "}
                                {parseFloat(overAllScore).toFixed(2)}
                              </TableCell>
                              <TableCell align=''>
                                {moment(data.updatedAt).format(
                                  "DD-MM-YYYY HH:mm A"
                                )}
                              </TableCell>
                              <TableCell align=''>
                                {data.contractAddress}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {(!contractList ||
                  (contractList && contractList.length === 0)) && (
                  <Box textAlign='center' mt={5}>
                    <NoDataFound />{" "}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
