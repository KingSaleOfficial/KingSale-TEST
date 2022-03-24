import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  Button,
  withStyles,
  Select,
  MenuItem,
  Chip,
} from "@material-ui/core";
import { FaDiscord, FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import Index from "./Tab/Index";
import { GoVerified } from "react-icons/go";
import { RiGlobalLine, RiTelegramLine } from "react-icons/ri";
import { TiSocialTwitterCircular } from "react-icons/ti";
import PoolDetailsTable from "./PoolDetailsTable";
import DonutChart from "./DonutChart";
import { useLocation } from "react-router-dom";
import {
  getContract,
  getWeb3ContractObject,
  getWeb3Obj,
  swichNetworkHandler,
} from "src/utils";
import KingShibaIDOPresaleABI from "src/abis/KingShibaIDOPresaleABI.json";
import {
  ACTIVE_NETWORK,
  textDeadAddress,
  deadAddress,
  factoryContractAdress,
  maxPromote,
  getPromoteFees,
} from "src/constants";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";
import moment from "moment";
import IERC20ABI from "../../abis/IERC20ABI.json";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import DataLoading from "src/components/Loaders/DataLoading";
import axios from "axios";
import apiConfig from "src/config/apiConfig";
import KingShibaIDOFactoryABI from "src/abis/KingShibaIDOFactoryABI.json";
import KingShibaIDOInfoABI from "src/abis/KingShibaIDOInfoABI.json";
import { AiOutlineFileSearch } from "react-icons/ai";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { calculateTimeLeft } from "src/services";
import { ethers } from "ethers";
import XLSX from "xlsx";

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
  technologies: {
    background: "#ECECEC",
    borderRadius: "10px",
    maxHeight: "300px",
    "& img": {
      maxHeight: "300px",
    },
  },

  amount: {
    "& label": {
      color: "#353840",
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "33px",
    },
  },
  amountdiv: {
    maxWidth: "100%",
    height: "60px",
    border: "1px solid #00ffab",
    borderRadius: " 5px",
    display: "flex",
    padding: "0 20px",
    alignItems: "center",
    fontSize: "45px",
  },

  inputfile: {
    background: "#ECECEC",
    borderRadius: "10px",
    position: "relative",
    border: "2px dashed #DDD9D9",
    boxSizing: "border-box",
    cursor: "pointer",
    padding: "10px",

    "& input": {
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      opacity: "0",
      position: "absolute",
      cursor: "pointer",
    },

    "& img": {
      padding: "26px",
    },

    "& p": {
      fontSize: "9px",
      fontWeight: "normal",
      padding: "9px",
      lineHeight: "17px",
      textAlign: "center",
      color: "#595C62",
      marginTop: "-17px",
    },
  },

  mainBox: {
    padding: "30px 30px 30px",
    overflow: "hidden",
    position: "relative",
      background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
      border:"1px solid #b6852e",
    transition: "0.5s",
    backdropFilter: "blur(42px)",
    borderRadius: "10px",

    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
    },
    "& h5": {
      fontSize: "14px",
      color: "#9F9F9F",
    },
    "& h6": {
      fontSize: "14px",
      lineHeight: "22px",
      color: "#FABE25",
    },
    "& p": {
      color: "#fff",
      width: "100%",
      fontSize: "16px",
      maxWidth: "600px",
      // maxWidth: "600px",
    },
    "& small": {
      fontSize: "12px",
      color: "#6c757d!important",
      // maxWidth: "600px",
    },
    "& label": {
      color: "#9F9F9F",
      padding: "0",
      fontSize: "14px",
      transition:
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    },
  },
  selectbox: {
    width: "100%",
    border: "2px solid #FABE25",
    height: "37px",
    borderRadius: "5px",
    background: "#18131d",
    color: "#9F9F9F",
    fontSize: "14px",
    padding: "5px",
  },

  buttonright: {
    fontSize: "14px ",
    border: "1px solid #E8424C",
    background: "#E8424C",
    fontWeight: 600,
    height: "44px ",
    borderRadius: "50px",
    color: "#FFFFFF",
    minWidth: "150px ",
    boxShadow: "none ",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      height: "45px ",
      minWidth: "120px ",
    },
    "&:hover": {
      borderColor: "#E8424C",
      backgroundColor: "#E8424C",
      border: "2px solid #fff",
    },
  },
  nameBox: {
    // display: "flex",
    // justifyContent: "space-between",
    // padding: "20px 20px 30px",
    // borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
    "& h4": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
    },
    // "& p": {
    //     fontSize: "12px",
    //     color: "#fff",
    // },
    "& img": {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  },
  inputBox: {
    width: "100%",
    height: "40px",
    borderRadius: "50px",
    background: "#090c16",
    border: "1px solid #fff",
    color: "#fff",
    padding: "7px",
  },

  copy: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: " 0px 4px 8px rgb(0 0 0 / 12%)",
    border: "1px solid #fabe25",
    color: "#fff",
    paddingTop: "13px",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50px",
    bottom: "-26px",
    [theme.breakpoints.down("xs")]: {
      right: "10px",
      width: "90%",
    },
    "& svg": {
      fontSize: "30px",
    },

    "& p": {
      color: "#fff",
      fontSize: "14px",
      [theme.breakpoints.down("md")]: {
        fontSize: "7px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "8px",
      },
    },
  },
  dexBox: {
    "& span": {
      color: "#fff !important",
    },
  },
  upvote: {
    height: "40px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    border: "1px solid green",
    "&:hover": {
      backgroundColor: "green",
    },
    "& svg": {
      marginRight: "10px",
    },
  },
  downvote: {
    height: "40px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    border: "1px solid red",
    "&:hover": {
      backgroundColor: "red",
    },
    "& svg": {
      marginRight: "10px",
    },
  },
  voteBox: {
    backgroundColor: " #090b16",
    border: "1px solid #3c3b3b",
    padding: "20px",
    textAlign: "center",
    margin: "20px 0",
    "& h2": {
      fontWeight: "600",
      color: "#a09c9c",
    },
  },
}));

export default function BestSeller() {
  const classes = useStyles();
  const { account, library, chainId } = useWeb3React();
  const user = useContext(UserContext);
  const location = useLocation();
  const [presaleAddress, setPresaleAddress] = useState();
  const [staticTextData, setStaticTextData] = useState();
  const [allWeiValues, setAllWeiValues] = useState();
  const [staticData, setStaticData] = useState();
  const [poolData, setPoolData] = useState();
  const [buyAmount, setBuyAmount] = useState();
  const [userToeknBalance, setUserToeknBalance] = useState(0);
  const [isClaimed, setIsClaimed] = useState(false);
  const [userInvestments, setUserInvestments] = useState(0);
  const [isWhiteListed, setIsWhiteListed] = useState(false);
  const [updatingButtonName, setUpdatingButtonName] = useState();
  const [promoteButtonName, setpromoteButtonName] = useState(false);
  const [VerifyButtonName, setVerifyButtonName] = useState(false);
  const [totalSupply, settotalSupply] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [poolAPIDetails, setPoolAPIDetails] = useState();
  const [poolId, setPoolId] = useState();
  const [adminWalletAddress, setAdminWalletAddress] = useState();
  const [presaleBalanceOf, setPresateBalanceOf] = useState(0);
  const [promoteList, setPromoteList] = useState([]);
  const [promoteFees, setPromoteFees] = useState(0);
  const [isPromoteOpen, setIsPromoteOpen] = useState(false);
  const [promoteEndTime, setPromoteEndTime] = useState("1");
  const [isPromote, setIsPromote] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timeStartLeft, setTimeStartLeft] = useState(calculateTimeLeft());
  const [whiteListAddress, setWhiteListAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [whitelistAddressSheet, setWhitelistAddressSheet] = useState([]);
  const [isWhitelistOpen, SetIsWhitelistOpen] = useState(false);
  useEffect(() => {
    if (location.search) {
      const ids = location.search.split("?");
      const idHash = location.hash.split("#");
      console.log("idHash", idHash);
      if (ids[1]) setPresaleAddress(ids[1]);
      if (idHash[1]) setPoolId(idHash[1]);
    }
  }, [location]);

  const getOwnerAddress = async () => {
    try {
      const web3 = await getWeb3Obj();

      const contract = new web3.eth.Contract(
        KingShibaIDOFactoryABI,
        factoryContractAdress
      );
      const poolDataListing = await contract.methods.KINGSHIBAIDO().call();
      const poolListingObj = new web3.eth.Contract(
        KingShibaIDOInfoABI,
        poolDataListing
      );

      const owner = await poolListingObj.methods.owner().call();

      console.log("contractcontractcontract", poolListingObj.methods);
      console.log("owner", owner);
      setAdminWalletAddress(owner);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (account) {
      getOwnerAddress();
    }
  }, [account]);

  const poolDetailsAPIHandler = async () => {
    try {
      const res = await axios.get(apiConfig.viewPresale + poolId, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (res.data.statusCode === 200) {
        console.log("----", res.data.result);
        setPoolAPIDetails(res.data.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (poolId) {
      poolDetailsAPIHandler();
    }
  }, [poolId, user.isLogin]);

  const getPoolDetailsHandler = async () => {
    try {
      const contract = await getWeb3ContractObject(
        KingShibaIDOPresaleABI,
        presaleAddress
      );
      const calls = [
        {
          name: "ammLiquidityAdded",
        },
        {
          name: "ammLiquidityPercentageAllocation",
        },
        {
          name: "kingShibaIDODevAddress",
        },

        {
          name: "presaleCancelled",
        },
        {
          name: "investmentToken",
        },
        {
          name: "onlyWhitelistedAddressesAllowed",
        },

        {
          name: "totalInvestorsCount",
        },
      ];
      let poolMoreData = {};

      for (let i = 0; i < calls.length; i++) {
        poolMoreData[calls[i].name] = await contract.methods[
          calls[i].name
        ]().call();
      }

      console.log("poolData", poolMoreData);
      setPoolData(poolMoreData);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getPoolDetailsOfWeiValues = async () => {
    try {
      const contract = await getWeb3ContractObject(
        KingShibaIDOPresaleABI,
        presaleAddress
      );
      const web3 = await getWeb3Obj();
      let weiToETHValues = {};

      const calls = [
        {
          name: "minInvestInWei",
        },
        {
          name: "maxInvestInWei",
        },
        {
          name: "tokenPriceInWei",
        },
        {
          name: "ammListingPriceInWei",
        },

        {
          name: "tokensLeft",
        },
        {
          name: "totalTokens",
        },
        {
          name: "totalCollectedWei",
        },
        {
          name: "hardCapInWei",
        },
        {
          name: "softCapInWei",
        },
      ];

      for (let i = 0; i < calls.length; i++) {
        const weiValue = await contract.methods[calls[i].name]().call();
        weiToETHValues[calls[i].name] = Number(
          web3.utils.fromWei(weiValue.toString(), "ether")
        );
      }
      setAllWeiValues(weiToETHValues);
      console.log("allWeiValues", weiToETHValues);
      setIsLoading(false);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getPoolStaticDataHandler = async () => {
    try {
      const contract = await getWeb3ContractObject(
        KingShibaIDOPresaleABI,
        presaleAddress
      );
      let staticDate = {};
      const calls = [
        {
          name: "closeTime",
        },
        {
          name: "openTime",
        },
        {
          name: "ammLPTokensLockDurationInDays",
        },

        {
          name: "token",
        },
        {
          name: "ammLiquidityAddingTime",
        },

        {
          name: "presaleCreatorAddress",
        },
        {
          name: "unsoldTokensDumpAddress",
        },
      ];

      for (let i = 0; i < calls.length; i++) {
        staticDate[calls[i].name] = await contract.methods[
          calls[i].name
        ]().call();
      }
      setStaticData(staticDate);
      console.log("staticData", staticDate);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getPoolTextData = async () => {
    try {
      const contract = await getWeb3ContractObject(
        KingShibaIDOPresaleABI,
        presaleAddress
      );
      const web3 = await getWeb3Obj();
      let textDate = {};

      const calls = [
        {
          name: "saleTitle",
        },
        {
          name: "linkTelegram",
        },
        {
          name: "linkDiscord",
        },
        {
          name: "linkTwitter",
        },
        {
          name: "linkWebsite",
        },
      ];

      for (let i = 0; i < calls.length; i++) {
        const textvalue = await contract.methods[calls[i].name]().call();
        textDate[calls[i].name] =
          textvalue === textDeadAddress ? "" : web3.utils.hexToAscii(textvalue);
      }
      console.log("staticTextData", textDate);
      setStaticTextData(textDate);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getUserPoolDetails = async () => {
    try {
      const web3 = await getWeb3Obj();
      const contract = getContract(
        presaleAddress,
        KingShibaIDOPresaleABI,
        library,
        account
      );
      const tokenContract = getContract(
        staticData?.token,
        IERC20ABI,
        library,
        account
      );
      const whitelistedAddresses = await contract.whitelistedAddresses(account);
      console.log("whitelistedAddresses", whitelistedAddresses);
      const investments = await contract.investments(account);
      const claimed = await contract.claimed(account);
      const balanceOf = await tokenContract.balanceOf(account);
      const PresateBalanceOfL = await tokenContract.balanceOf(presaleAddress);
      console.log(
        "PresateBalanceOfL",
        Number(web3.utils.fromWei(PresateBalanceOfL.toString()))
      );

      setPresateBalanceOf(
        Number(web3.utils.fromWei(PresateBalanceOfL.toString()))
      );

      setUserToeknBalance(Number(web3.utils.fromWei(balanceOf.toString())));
      setUserInvestments(Number(web3.utils.fromWei(investments.toString())));
      setIsClaimed(claimed);
      setIsWhiteListed(whitelistedAddresses);
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  //propomote
  const promoteHandler = async (isPromote) => {
    try {
      //approvePresale
      setpromoteButtonName(true);
      const formData = new FormData();
      const response = await axios({
        method: "PUT",
        url: apiConfig.approvePresale,

        headers: {
          token: sessionStorage.getItem("token"),
        },
        // data: formData,
        data: {
          presaleId: poolId,
          isPromote,
        },
      }).then(async (response) => {
        if (response.data.statusCode === 200) {
          toast.success(response.data.responseMessage);
          setpromoteButtonName(false);
          poolDetailsAPIHandler();
          // listRuleEventfun();
          user.poolListingData();
        } else if (response.data.statusCode === 403) {
          setpromoteButtonName(false);
          toast.error(response.data.responseMessage);
        } else {
          toast.error(response.data.responseMessage);
          setpromoteButtonName(false);
          // setIsUpdating1(false);
        }
      });
    } catch (error) {
      setpromoteButtonName(false);
      toast.error(error);
    }
  };
  const VerifyHandler = async (isVerify) => {
    setVerifyButtonName(true);
    try {
      const response = await axios({
        method: "PUT",
        url: apiConfig.approvePresale,

        headers: {
          token: sessionStorage.getItem("token"),
        },
        // data: formData,
        data: {
          presaleId: poolId,
          isVerify,
        },
      }).then(async (response) => {
        if (response.data.statusCode === 200) {
          toast.success(response.data.responseMessage);
          setVerifyButtonName(false);
          poolDetailsAPIHandler();
          user.poolListingData();
        } else if (response.data.statusCode === 403) {
          setVerifyButtonName(false);
          toast.error(response.data.responseMessage);
        } else {
          toast.error(response.data.responseMessage);
          setVerifyButtonName(false);
        }
      });
    } catch (error) {
      toast.error(error);
      setVerifyButtonName(false);
    }
  };
  useEffect(() => {
    if (account && staticData?.token && chainId === ACTIVE_NETWORK) {
      getUserPoolDetails();
    }
  }, [account, staticData, chainId]);

  useEffect(() => {
    if (presaleAddress) {
      console.log("presaleAddress", presaleAddress);
      getPoolDetailsHandler();
      getPoolDetailsOfWeiValues();
      getPoolStaticDataHandler();
      getPoolTextData();
    }
  }, [presaleAddress]);

  const investmentTokenHandelr = async () => {
    let currentTimeStamp = moment().unix();

    try {
      const totalInvestmentInWei = userInvestments + Number(buyAmount);
      console.log("totalInvestmentInWei", totalInvestmentInWei);
      if (chainId == ACTIVE_NETWORK) {
        if (Number(buyAmount) > 0) {
          if (Number(currentTimeStamp) >= Number(staticData?.openTime)) {
            if (Number(currentTimeStamp) < Number(staticData?.closeTime)) {
              if (
                allWeiValues?.totalCollectedWei < allWeiValues?.hardCapInWei
              ) {
                if (allWeiValues?.tokensLeft > 0) {
                  if (
                    totalInvestmentInWei >= allWeiValues?.minInvestInWei ||
                    allWeiValues?.totalCollectedWei <=
                      allWeiValues?.hardCapInWei - 1
                  ) {
                    if (
                      allWeiValues?.maxInvestInWei === 0 ||
                      totalInvestmentInWei < allWeiValues?.maxInvestInWei
                    ) {
                      if (
                        !poolData?.onlyWhitelistedAddressesAllowed ||
                        isWhiteListed
                      ) {
                        if (!poolData?.presaleCancelled) {
                          const web3 = await getWeb3Obj();
                          console.log("...", buyAmount.toString());

                          console.log(
                            "..",
                            web3.utils.toWei(buyAmount.toString())
                          );
                          const contract = getContract(
                            presaleAddress,
                            KingShibaIDOPresaleABI,
                            library,
                            account
                          );
                          console.log("contract", contract);

                          setUpdatingButtonName("invest");

                          if (
                            poolData &&
                            poolData.investmentToken === deadAddress
                          ) {
                            console.log("if");
                            const res = await contract.invest(0, {
                              value: web3.utils.toWei(buyAmount.toString()),
                            });
                            await res.wait();
                          } else if (
                            poolData &&
                            poolData.investmentToken !== deadAddress
                          ) {
                            const contractERC = getContract(
                              poolData.investmentToken,
                              IERC20ABI,
                              library,
                              account
                            );
                            console.log("contractERC", contractERC);
                            const resApp = await contractERC.approve(
                              presaleAddress,
                              web3.utils.toWei(buyAmount.toString())
                            );
                            await resApp.wait();

                            console.log("else");
                            const res = await contract.invest(
                              web3.utils.toWei(buyAmount.toString())
                            );
                            await res.wait();
                          }

                          setUpdatingButtonName();
                          updatePoolData();

                          console.log("DONE");
                        } else {
                          toast.error("Presale is cancelled");
                        }
                      } else {
                        toast.error("Address not whitelisted");
                      }
                    } else {
                      toast.error("Max investment reached");
                    }
                  } else {
                    toast.error("Min investment not reached");
                  }
                } else {
                  toast.error("No token left");
                }
              } else {
                toast.error("Hard cap reached");
              }
            } else {
              toast.error("Closed");
            }
          } else {
            toast.error("Not yet opened");
          }
        } else {
          toast.error("Please enter valid amount");
        }
      } else {
        swichNetworkHandler();
      }
    } catch (error) {
      console.log("ERROR", error);
      toast.error(error.message);
      setUpdatingButtonName();
    }
  };

  //cliamToken
  const claimTokenHandler = async () => {
    if (account) {
      if (poolData?.ammLiquidityAdded) {
        if (!poolData?.onlyWhitelistedAddressesAllowed || isWhiteListed) {
          if (!poolData?.presaleCancelled) {
            if (userInvestments > 0) {
              if (!isClaimed) {
                try {
                  setUpdatingButtonName("claim");
                  const web3 = await getWeb3Obj();

                  const contract = getContract(
                    presaleAddress,
                    KingShibaIDOPresaleABI,
                    library,
                    account
                  );
                  const res = await contract.claimTokens();
                  await res.wait();
                  setUpdatingButtonName();
                  updatePoolData();
                  toast.success("Success");
                } catch (error) {
                  toast.error(error.message);
                  console.log(error);
                  setUpdatingButtonName();
                }
              } else {
                toast.error("Already claimed or refunded");
              }
            } else {
              toast.error("Not an investor");
            }
          } else {
            toast.error("Presale is cancelled");
          }
        } else {
          toast.error("Address not whitelisted");
        }
      } else {
        toast.error("Liquidity not yet added");
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };

  //RefundToken
  const refundTokenHandler = async (e) => {
    if (account) {
      let currentTimeStamp = moment().unix();
      if (currentTimeStamp >= Number(staticData?.openTime)) {
        if (currentTimeStamp >= Number(staticData?.closeTime)) {
          if (allWeiValues?.softCapInWei > 0) {
            if (allWeiValues?.totalCollectedWei < allWeiValues?.softCapInWei) {
              if (!poolData?.onlyWhitelistedAddressesAllowed || isWhiteListed) {
                if (userInvestments > 0) {
                  if (!isClaimed) {
                    try {
                      setUpdatingButtonName("refund");
                      const web3 = await getWeb3Obj();

                      const contract = getContract(
                        presaleAddress,
                        KingShibaIDOPresaleABI,
                        library,
                        account
                      );
                      const res = await contract.getRefund();
                      await res.wait();
                      setUpdatingButtonName();
                      toast.success("Success");
                      updatePoolData();
                    } catch (error) {
                      setUpdatingButtonName();
                      toast.error(error.message);
                      console.log(error);
                    }
                  } else {
                    toast.error("Already claimed or refunded");
                  }
                } else {
                  toast.error("Not an investor");
                }
              } else {
                toast.error("Address not whitelisted");
              }
            } else {
              toast.error("Soft cap reached");
            }
          } else {
            toast.error("No soft cap");
          }
        } else {
          toast.error("Not yet closed");
        }
      } else {
        toast.error("Not yet opened");
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };

  //whiteListedAddress
  const setAllAddressesAllowed = async (status) => {
    if (account) {
      try {
        setUpdatingButtonName("whitelist");
        const contract = getContract(
          presaleAddress,
          KingShibaIDOPresaleABI,
          library,
          account
        );
        const res = await contract.setOnlyWhitelistedAddressesAllowed(status);
        await res.wait();
        toast.success("Success");
        setUpdatingButtonName();
        getPoolDetailsHandler();
      } catch (error) {
        setUpdatingButtonName();
        toast.error(error.message);
        console.log(error);
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };

  const cancelAndTransferTokensToPresaleCreatorHandler = async (status) => {
    if (account) {
      if (!poolData?.presaleCancelled) {
        if (!poolData?.ammLiquidityAdded) {
          try {
            setUpdatingButtonName("cancel");
            const contract = getContract(
              presaleAddress,
              KingShibaIDOPresaleABI,
              library,
              account
            );
            const res =
              await contract.cancelAndTransferTokensToPresaleCreator();
            await res.wait();
            toast.success("Success");
            setUpdatingButtonName();
            getPoolDetailsHandler();
          } catch (error) {
            setUpdatingButtonName();
            toast.error(error.message);
            console.log(error);
          }
        } else {
          toast.error("Liquidity already added");
        }
      } else {
        toast.error("Presale is cancelled");
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };

  //lostandlist
  const mianLockAndListHandler = async (e) => {
    if (account) {
      try {
        setUpdatingButtonName("lockList");
        const contract = getContract(
          presaleAddress,
          KingShibaIDOPresaleABI,
          library,
          account
        );

        const res = await contract.addLiquidityAndLockLPTokens();
        await res.wait();
        toast.success("Success");
        setUpdatingButtonName();
        updatePoolData();
      } catch (error) {
        setUpdatingButtonName();
        toast.error(error.message);
        console.log(error);
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };

  const lockAndListHandler = async (e) => {
    let currentTimeStamp = moment().unix();
    if (account) {
      if (!poolData?.presaleCancelled) {
        if (allWeiValues?.totalCollectedWei > 0) {
          if (!poolData?.ammLiquidityAdded) {
            if (
              !poolData?.onlyWhitelistedAddressesAllowed ||
              isWhiteListed ||
              staticData?.presaleCreatorAddress.toLowerCase() ==
                account.toLowerCase()
            ) {
              if (
                allWeiValues?.totalCollectedWei >=
                  allWeiValues?.hardCapInWei - 1 &&
                currentTimeStamp < staticData?.ammLiquidityAddingTime
              ) {
                if (
                  staticData?.presaleCreatorAddress.toLowerCase() ==
                  account.toLowerCase()
                ) {
                  await mianLockAndListHandler();
                } else {
                  toast.error("Not presale creator");
                }
              } else if (
                currentTimeStamp > parseInt(staticData?.ammLiquidityAddingTime)
              ) {
                if (
                  staticData?.presaleCreatorAddress.toLowerCase() ==
                    account.toLowerCase() ||
                  userInvestments > 0
                ) {
                  if (
                    allWeiValues?.totalCollectedWei >=
                    allWeiValues?.softCapInWei
                  ) {
                    await mianLockAndListHandler();
                  } else {
                    toast.error("Soft cap not reached");
                  }
                } else {
                  toast.error("Not presale creator or investor");
                }
              } else {
                toast.error("Liquidity adding time not reached yet");
              }
            } else {
              toast.error("Not whitelisted or not presale creator");
            }
          } else {
            toast.error("Liquidity already added");
          }
        } else {
          toast.error("Total eth raised should be greater than 0");
        }
      } else {
        toast.error("Presale is cancelled");
      }
    } else {
      toast.error("Please connect your wallet");
    }
  };

  const updatePoolData = async () => {
    getPoolDetailsHandler();
    getPoolDetailsOfWeiValues();
    getPoolStaticDataHandler();
    getUserPoolDetails();
  };

  const upvoteDownVoteAPIHandler = async (endPoint) => {
    if (user.isLogin) {
      try {
        const res = await axios.post(
          apiConfig[endPoint],
          {
            _id: poolId,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        if (res.data.responseCode === 200 || res.data.statusCode === 200) {
          toast.success(res.data.responseMessage);
          poolDetailsAPIHandler();
        } else {
          toast.warn(res.data.responseMessage);
        }
      } catch (error) {
        toast.error(error.message);
        console.log("ERROR", error);
      }
    } else {
      toast.error("Please login");
    }
  };

  const collectAdminFeesHandler = async () => {
    try {
      if (poolData?.ammLiquidityAdded) {
        if (!poolData?.presaleCancelled) {
          setUpdatingButtonName("collectAdminFees");
          const contract = getContract(
            presaleAddress,
            KingShibaIDOPresaleABI,
            library,
            account
          );
          const res = await contract.collectAdminFees();
          await res.wait();
          toast.success("Success");
          setUpdatingButtonName();
        } else {
          toast.error("Presale cancelled");
        }
      } else {
        toast.error("Liquidity not yet added");
      }
    } catch (error) {
      setUpdatingButtonName();
      console.log("ERROR", error);
    }
  };

  const getPromoteListhandler = async () => {
    try {
      const res = await axios.get(apiConfig.promoteList);
      if (res.data.statusCode === 200) {
        setPromoteList(res.data.result);
      } else {
        setPromoteList([]);
      }
    } catch (error) {
      setPromoteList([]);
    }
  };

  useEffect(() => {
    getPromoteListhandler();
  }, []);

  useEffect(() => {
    if (promoteList.length < maxPromote && isPromoteOpen) {
      setIsPromote(true);
    } else {
      if (isPromoteOpen) {
        const listByDateSort = promoteList.sort(
          (a, b) =>
            moment(b.promoteEndTime).unix() - moment(a.promoteEndTime).unix()
        );
        setIsPromote(false);
        toast.warn(
          `Slot not available, Slot will be available on ${moment(
            listByDateSort[listByDateSort.length - 1].promoteEndTime
          ).format("DD-MM-YYYY HH:mm A")}`
        );
        setIsPromoteOpen(false);
      } else {
        setIsPromote(false);
      }
    }
  }, [promoteList, isPromoteOpen]);

  useEffect(() => {
    const promoteFees = getPromoteFees(promoteEndTime);
    setPromoteFees(promoteFees);
  }, [promoteEndTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        staticData?.closeTime &&
        staticData?.openTime &&
        Number(staticData?.openTime) < moment().unix() &&
        Number(staticData?.closeTime) > moment().unix()
      ) {
        setTimeLeft(
          calculateTimeLeft(new Date(parseInt(staticData?.closeTime) * 1000))
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        staticData?.closeTime &&
        staticData?.openTime &&
        Number(staticData?.openTime) > moment().unix()
      ) {
        setTimeStartLeft(
          calculateTimeLeft(new Date(parseInt(staticData?.openTime) * 1000))
        );
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const promotePresaleHandler = async () => {
    try {
      setUpdatingButtonName("promotePresale");
      const web3 = await getWeb3Obj();
      const cnotractObj = await getContract(
        presaleAddress,
        KingShibaIDOPresaleABI,
        library,
        account
      );
      let balance = await cnotractObj.provider.getBalance(account);

      balance = web3.utils.fromWei(balance.toString());
      if (Number(balance) > Number(promoteFees)) {
        console.log("adminWalletAddress", adminWalletAddress);
        console.log("balance", balance);
        console.log("cnotractObj", cnotractObj);
        console.log(
          "promoteFees",
          ethers.utils.parseEther(promoteFees.toString())
        );

        console.log("cnotractObj.signer", cnotractObj.signer);

        const tx = await cnotractObj.signer.sendTransaction({
          to: adminWalletAddress,
          value: ethers.utils.parseEther(promoteFees.toString()),
        });
        console.log("tx", tx);
        await tx.wait();

        const res = await axios.put(
          apiConfig.approvePresaleUser,
          {
            presaleId: poolId,
            promoteEndTime: moment().add(Number(promoteEndTime), "days"),
            isPromote: isPromote,
          },
          {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          }
        );
        if (res.data.statusCode === 200) {
          toast.success("Success");
          poolDetailsAPIHandler();
        } else {
          toast.error(res.data.responseMessage);
        }
        setUpdatingButtonName();
      } else {
        toast.error("Low Balance");
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
      setUpdatingButtonName();
    }
  };

  const setWhiteListAddressHandler = (value) => {
    setWhiteListAddress(value);
  };

  useEffect(() => {
    if (selectedFile && selectedFile !== "") {
      selectXls();
    }
  }, [selectedFile]);

  const selectXls = () => {
    const file = selectedFile;
    if (file) {
      var fileReader = new FileReader();
      fileReader.onload = function (event) {
        var data = event.target.result;

        var workbook = XLSX.read(data, {
          type: "binary",
        });

        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[workbook.SheetNames[0]],
          { raw: false }
        );
        let newData = [];
        rowObject.forEach((data) => {
          newData.push(data.address);
        });
        console.log("newData", newData);

        setWhitelistAddressSheet(newData);
      };
      fileReader.readAsBinaryString(file);
    }
  };

  const addwhitelistedAddressesHandler = async () => {
    try {
      if (whiteListAddress != "" || whitelistAddressSheet.length > 0) {
        if (window.ethereum) {
          const web3 = await getWeb3Obj();

          const addListText = whiteListAddress
            ? whiteListAddress.split(",")
            : [];
          const addList = addListText.concat(whitelistAddressSheet);
          for (var i = 0; i < addList.length; i++) {
            const dataRes = web3.utils.isAddress(addList[i]);
            if (!dataRes) {
              break;
            }
          }

          if (i === addList.length) {
            setUpdatingButtonName("addwhitelistedAddresses");
            const contract = getContract(
              presaleAddress,
              KingShibaIDOPresaleABI,
              library,
              account
            );
            const res = await contract.addwhitelistedAddresses(addList);
            await res.wait();
            toast.success("Success");
            setUpdatingButtonName();
          } else {
            toast.error(
              `Please enter valid address in whitelisted addresses, ${
                i + 1
              } number address is wrong `
            );
          }
        }
      }
    } catch (error) {
      setUpdatingButtonName();
      toast.error(error.message);
    }
  };

  return (
    <Box className={classes.bannerBox}>
      <Dialog
        open={isPromoteOpen && isPromote}
        onClose={() => setIsPromoteOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
        maxWidth='md'
      >
        <DialogTitle id='alert-dialog-title'></DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ maxWidth: "450px" }}
          >
            <label>* Promote End Time (Since Current Time)</label>
            <Select
              name='promoteEndTime'
              value={promoteEndTime}
              onChange={(e) => setPromoteEndTime(e.target.value)}
              labelId='label'
              id='select'
              fullWidth
            >
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
            </Select>
            <small style={{ fontSize: "12px", color: "#a09b9b" }}>
              Promote pool fee:{promoteFees}BNB
            </small>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button
            onClick={() => setIsPromoteOpen(false)}
            color='primary'
            style={{ color: "rgb(250, 190, 37" }}
            disabled={updatingButtonName}
          >
            Cancel
          </Button>
          <Button
            onClick={() => promotePresaleHandler()}
            color='primary'
            autoFocus
            style={{ color: "#fff" }}
            disabled={updatingButtonName}
          >
            Submit{" "}
            {updatingButtonName === "promotePresale" && (
              <ButtonCircularProgress />
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isWhitelistOpen}
        onClose={() => SetIsWhitelistOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'></DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ maxWidth: "450px" }}
          >
            <Grid spacing={1} container>
              <Grid item xs={12} sm={12}>
                <Box>
                  <label>
                    Whitelisted Addresses (Comma-separated) &nbsp;&nbsp;
                    <a href='images/address.xlsx' download='proposed_file_name'>
                      Download Template
                    </a>
                  </label>
                  <TextField
                    value={whiteListAddress}
                    onChange={(e) => setWhiteListAddressHandler(e.target.value)}
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Example only: 0xEd27E5c6CFc27b0b244c1fB6f9AE076c3eb7C10B,0x41238D4738493aA266Fc41838a0A230E75fb5beb'
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box textAlign='center'>
                  <Typography variant='h6'>Or</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Box>
                  <input
                    accept='.xlsx'
                    id='myfile'
                    type='file'
                    style={{ display: "none" }}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  <label htmlFor='myfile' style={{ width: "100%" }}>
                    <Button
                      fullWidth
                      variant='contained'
                      component='span'
                      color='primary'
                      size='large'
                    >
                      Select xlsx File
                    </Button>
                  </label>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button
            onClick={() => SetIsWhitelistOpen(false)}
            color='primary'
            style={{ color: "rgb(250, 190, 37" }}
            disabled={updatingButtonName}
          >
            Cancel
          </Button>
          <Button
            onClick={() => addwhitelistedAddressesHandler()}
            color='primary'
            autoFocus
            style={{ color: "#fff" }}
            disabled={updatingButtonName}
          >
            Submit{" "}
            {updatingButtonName === "addwhitelistedAddresses" && (
              <ButtonCircularProgress />
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading ? (
        <DataLoading />
      ) : (
        <>
          <Box className={classes.textbox} mt={5} mb={5}>
            <Typography variant='h2' align='center'>
              Launchpad Detail
            </Typography>
          </Box>
          <Box mt={5} className={classes.amount}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={7}>
                <Box my={3} className={`${classes.mainBox} mainBox`}>
                  <Box mt={3} mb={3}>
                    <Box
                      display='flex'
                      alignItems='center'
                      justifyContent='flex-start'
                    >
                      <figure style={{ marginLeft: "0" }}>
                        <img
                          src={
                            poolAPIDetails?.presaleImage
                              ? poolAPIDetails?.presaleImage
                              : "images/logo_2.png"
                          }
                          alt=' '
                          style={{ width: "100px" }}
                        />
                      </figure>
                      <Box>
                        <Box display='flex'>
                          <Typography variant='h2'>
                            {" "}
                            {staticTextData?.saleTitle}{" "}
                            {/* {poolAPIDetails?.isVerify && (
                              <GoVerified style={{ color: "#349c13" }} />
                            )} */}
                          </Typography>
                          <Box mt={2} ml={2} display='flex'>
                            {poolAPIDetails?.isVerify && (
                              <Chip
                                size='small'
                                label='Verified'
                                Filled
                                style={{
                                  backgroundColor: "#d1fae5",
                                  fontWeight: "bold",
                                  marginLeft: 4,
                                }}
                              />
                            )}{" "}
                            {staticData?.closeTime &&
                              staticData?.openTime &&
                              Number(staticData?.openTime) >
                                moment().unix() && (
                                <Chip
                                  size='small'
                                  label='Upcoming'
                                  Filled
                                  style={{
                                    backgroundColor: "#d29813",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    marginLeft: 4,
                                  }}
                                />
                              )}{" "}
                            {staticData?.closeTime &&
                              staticData?.openTime &&
                              Number(staticData?.openTime) < moment().unix() &&
                              Number(staticData?.closeTime) >
                                moment().unix() && (
                                <Chip
                                  size='small'
                                  label='Sale Live'
                                  Filled
                                  style={{
                                    backgroundColor: "#10b981",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    marginLeft: 4,
                                  }}
                                />
                              )}{" "}
                            {staticData?.closeTime &&
                              staticData?.openTime &&
                              Number(staticData?.closeTime) <
                                moment().unix() && (
                                <Chip
                                  size='small'
                                  label='Sale Ended'
                                  Filled
                                  style={{
                                    backgroundColor: "#E8424C",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    marginLeft: 4,
                                  }}
                                />
                              )}
                          </Box>
                        </Box>
                        {staticTextData && staticTextData.linkTwitter && (
                          <a href={staticTextData.linkTwitter} target='_blank'>
                            {" "}
                            <TiSocialTwitterCircular
                              style={{
                                fontSize: "25px",
                                color: "#fff",
                                margin: "0 5px",
                              }}
                            />{" "}
                          </a>
                        )}
                        {staticTextData && staticTextData.linkTelegram && (
                          <a href={staticTextData.linkTelegram} target='_blank'>
                            {" "}
                            <RiTelegramLine
                              style={{
                                fontSize: "22px",
                                color: "#fff",
                                margin: "0 5px 0 5px",
                              }}
                            />{" "}
                          </a>
                        )}
                        {staticTextData && staticTextData.linkWebsite && (
                          <a href={staticTextData.linkWebsite} target='_blank'>
                            {" "}
                            <RiGlobalLine
                              style={{
                                fontSize: "22px",
                                color: "#fff",
                                margin: "0 5px 0 5px",
                              }}
                            />{" "}
                          </a>
                        )}
                        {staticTextData && staticTextData.linkDiscord && (
                          <a href={staticTextData.linkDiscord} target='_blank'>
                            {" "}
                            <FaDiscord
                              style={{
                                fontSize: "22px",
                                color: "#fff",
                                margin: "0 7px 0 5px",
                              }}
                            />{" "}
                          </a>
                        )}
                        {poolAPIDetails && poolAPIDetails.pooCoinURL && (
                          <a href={poolAPIDetails.pooCoinURL} target='_blank'>
                            {" "}
                            <img
                              src='images/poocoin.png'
                              style={{ width: "22px" }}
                            />{" "}
                          </a>
                        )}
                        <Typography variant='body2'></Typography>
                      </Box>
                    </Box>
                  </Box>
                  <PoolDetailsTable
                    user={user}
                    staticTextData={staticTextData}
                    poolData={poolData}
                    staticData={staticData}
                    allWeiValues={allWeiValues}
                    presaleAddress={presaleAddress}
                    presaleBalanceOf={presaleBalanceOf}
                    settotalSupplyParent={(data) => settotalSupply(data)}
                  />
                  {staticData &&
                    account &&
                    staticData.presaleCreatorAddress.toLowerCase() ==
                      account.toLowerCase() && (
                      <Box className={classes.mainBox} mt={3}>
                        <Grid container spacing={1}>
                          {/* <Grid item sm={12} md={6}>
                          <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={updatingButtonName}
                            onClick={claimTokenHandler}
                          >
                            Claim Token{" "}
                            {updatingButtonName === "claim" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid> */}
                          {/* <Grid item sm={12} md={6}>
                          <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={updatingButtonName}
                            onClick={refundTokenHandler}
                          >
                            Get Refund{" "}
                            {updatingButtonName === "refund" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid> */}
                          {staticData &&
                            staticData.presaleCreatorAddress.toLowerCase() ==
                              account.toLowerCase() && (
                              <Grid item sm={12} md={6}>
                                <Button
                                  fullWidth
                                  variant='contained'
                                  color='primary'
                                  disabled={updatingButtonName}
                                  onClick={() => setAllAddressesAllowed(true)}
                                >
                                  Whitelisted Addresses{" "}
                                  {updatingButtonName === "whitelist" && (
                                    <ButtonCircularProgress />
                                  )}
                                </Button>
                              </Grid>
                            )}
                          {staticData &&
                            poolData &&
                            (staticData.presaleCreatorAddress.toLowerCase() ==
                              account.toLowerCase() ||
                              poolData?.kingShibaIDODevAddress == account) && (
                              <Grid item sm={12} md={6}>
                                <Button
                                  fullWidth
                                  variant='contained'
                                  color='primary'
                                  disabled={updatingButtonName}
                                  onClick={() =>
                                    cancelAndTransferTokensToPresaleCreatorHandler(
                                      true
                                    )
                                  }
                                >
                                  Cancel Presale
                                  {updatingButtonName === "cancel" && (
                                    <ButtonCircularProgress />
                                  )}
                                </Button>
                              </Grid>
                            )}
                          {/* <Grid item sm={12} md={6}>
                          <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            disabled={updatingButtonName}
                            onClick={() => lockAndListHandler(true)}
                          >
                            Finalize Pool{" "}
                            {updatingButtonName === "lockList" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid> */}
                          {/* {account &&
                          adminWalletAddress &&
                          account == adminWalletAddress && (
                            <Grid item sm={12} md={6}>
                              <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                disabled={updatingButtonName}
                                onClick={collectAdminFeesHandler}
                              >
                                Collect Admin Fees{" "}
                                {updatingButtonName === "collectAdminFees" && (
                                  <ButtonCircularProgress />
                                )}
                              </Button>
                            </Grid>
                          )} */}
                          {staticData &&
                            poolAPIDetails &&
                            staticData.presaleCreatorAddress.toLowerCase() ==
                              account.toLowerCase() &&
                            !poolAPIDetails?.isPromote && (
                              <Grid item sm={12} md={6}>
                                <Button
                                  fullWidth
                                  variant='contained'
                                  color='primary'
                                  onClick={() => {
                                    setIsPromoteOpen(true);
                                  }}
                                >
                                  Promote
                                </Button>
                              </Grid>
                            )}

                          {staticData &&
                            poolAPIDetails &&
                            staticData.presaleCreatorAddress.toLowerCase() ==
                              account.toLowerCase() && (
                              <Grid item sm={12} md={6}>
                                <Button
                                  fullWidth
                                  variant='contained'
                                  color='primary'
                                  onClick={() => {
                                    SetIsWhitelistOpen(true);
                                  }}
                                >
                                  Whitelist
                                </Button>
                              </Grid>
                            )}
                        </Grid>
                      </Box>
                    )}
                  {account &&
                    user?.userData?.userType == "Admin" &&
                    poolAPIDetails?.verifyRequest && (
                      <Box className={classes.mainBox} mt={3}>
                        <Grid container spacing={1}>
                          {poolAPIDetails?.verifyRequest && (
                            <Grid item sm={12} md={6}>
                              <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                disabled={VerifyButtonName}
                                onClick={() => {
                                  VerifyHandler(
                                    poolAPIDetails.isVerify ? "false" : "true"
                                  );
                                }}
                              >
                                {poolAPIDetails.isVerify
                                  ? "Unverify"
                                  : "Verify"}{" "}
                                {VerifyButtonName && <ButtonCircularProgress />}
                              </Button>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    )}
                </Box>
              </Grid>

              <Grid item xs={12} sm={5}>
                <Box className={classes.mainBox} mt={3}>
                  <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12}>
                      {staticData?.closeTime &&
                        staticData?.openTime &&
                        Number(staticData?.openTime) < moment().unix() &&
                        Number(staticData?.closeTime) > moment().unix() && (
                          <Box textAlign='center' mb={1}>
                            <Typography variant='body2'>
                              Presale Ends In
                            </Typography>
                            <Typography>
                              {timeLeft.days}d : {timeLeft.hours}h :{" "}
                              {timeLeft.minutes}m : {timeLeft.seconds}s
                            </Typography>
                          </Box>
                        )}
                      {staticData?.closeTime &&
                        staticData?.openTime &&
                        Number(staticData?.openTime) > moment().unix() && (
                          <Box textAlign='center' mb={1}>
                            <Typography variant='body2'>
                              Presale Starts In
                            </Typography>
                            <Typography>
                              {timeStartLeft.days}d : {timeStartLeft.hours}h :{" "}
                              {timeStartLeft.minutes}m : {timeStartLeft.seconds}
                              s
                            </Typography>
                          </Box>
                        )}
                      <Box>
                        <label>
                          * Amount (max {allWeiValues?.maxInvestInWei})
                        </label>
                        <TextField
                          value={buyAmount}
                          onChange={(e) => setBuyAmount(e.target.value)}
                          id='outlined-basic'
                          variant='outlined'
                          fullWidth
                          type='number'
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box align='center'>
                        {account ? (
                          <Button
                            variant='contained'
                            color='primary'
                            disabled={updatingButtonName}
                            onClick={investmentTokenHandelr}
                          >
                            Buy{" "}
                            {updatingButtonName === "invest" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={user.connectWallet}
                          >
                            Connect Wallet
                          </Button>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h5' className={classes.textBox}>
                        Status
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align='right'>
                      <Typography variant='h6' className={classes.textBox1}>
                        {poolData && staticData && allWeiValues
                          ? poolData?.presaleCancelled
                            ? "Cancelled"
                            : Number(staticData?.openTime) < moment().unix() &&
                              Number(staticData?.closeTime) > moment().unix()
                            ? "Open"
                            : Number(staticData?.openTime) > moment().unix()
                            ? "Not Opened"
                            : poolData?.ammLiquidityAdded
                            ? "Locked and Listed"
                            : Number(staticData?.closeTime) < moment().unix() &&
                              allWeiValues?.softCapInWei >
                                allWeiValues?.totalCollectedWei
                            ? "Failed"
                            : "Closed"
                          : null}{" "}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h5' className={classes.textBox}>
                        Total Raised
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align='right'>
                      <Typography variant='h6' className={classes.textBox}>
                        {allWeiValues?.totalCollectedWei}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h5' className={classes.textBox}>
                        Sale type
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align='right'>
                      <Typography variant='h6' className={classes.textBox}>
                        Public
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h5' className={classes.textBox}>
                        Minimum Buy
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align='right'>
                      <Typography variant='h6' className={classes.textBox1}>
                        {allWeiValues?.minInvestInWei}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h5' className={classes.textBox}>
                        Maximum Buy
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align='right'>
                      <Typography variant='h6' className={classes.textBox1}>
                        {allWeiValues?.maxInvestInWei}
                      </Typography>
                    </Grid>
                  </Grid>
                  {account && (
                    <Box
                      // className={classes.mainBox}
                      mt={2}
                    >
                      <Grid container spacing={1}>
                        <Grid item sm={12} md={4}>
                          <Button
                            fullWidth
                            variant='outlined'
                            color='primary'
                            disabled={updatingButtonName}
                            onClick={claimTokenHandler}
                          >
                            Claim Token{" "}
                            {updatingButtonName === "claim" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid>
                        <Grid item sm={12} md={4}>
                          <Button
                            fullWidth
                            variant='outlined'
                            color='primary'
                            disabled={updatingButtonName}
                            onClick={refundTokenHandler}
                          >
                            Get Refund{" "}
                            {updatingButtonName === "refund" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid>
                        <Grid item sm={12} md={4}>
                          <Button
                            fullWidth
                            variant='outlined'
                            color='primary'
                            disabled={updatingButtonName}
                            onClick={() => lockAndListHandler(true)}
                          >
                            Finalize Pool{" "}
                            {updatingButtonName === "lockList" && (
                              <ButtonCircularProgress />
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </Box>
                <DonutChart
                  user={user}
                  staticTextData={staticTextData}
                  poolData={poolData}
                  staticData={staticData}
                  allWeiValues={allWeiValues}
                  presaleAddress={presaleAddress}
                  presaleBalanceOf={presaleBalanceOf}
                  totalSupply={totalSupply}
                />
                <Box className={classes.mainBox} mt={3}>
                  <>
                    <Typography
                      variant='h4'
                      align='center'
                      style={{ fontWeight: "600", color: " #fff" }}
                    >
                      Validation
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box className={classes.voteBox}>
                          <label>Confidence</label>
                          <Typography variant='h2'>
                            {poolAPIDetails &&
                            (Number(poolAPIDetails.downVoteCount) > 0 ||
                              Number(poolAPIDetails.upVoteCount) > 0)
                              ? Number(
                                  (Number(poolAPIDetails.upVoteCount) /
                                    (Number(poolAPIDetails.downVoteCount) +
                                      Number(poolAPIDetails.upVoteCount))) *
                                    100
                                ).toFixed(2)
                              : 0}
                            %
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box className={classes.voteBox}>
                          <label>Total Vote</label>
                          <Typography variant='h2'>
                            {poolAPIDetails
                              ? Number(poolAPIDetails.downVoteCount) +
                                Number(poolAPIDetails.upVoteCount)
                              : 0}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} align='center'>
                        {" "}
                        <Button
                          className={classes.upvote}
                          onClick={() => {
                            upvoteDownVoteAPIHandler("upVotePresale");
                          }}
                        >
                          {" "}
                          <FaThumbsUp />
                          Up
                        </Button>
                      </Grid>
                      <Grid item xs={6} align='center'>
                        {" "}
                        <Button
                          className={classes.downvote}
                          onClick={() => {
                            upvoteDownVoteAPIHandler("downVotePresale");
                          }}
                        >
                          {" "}
                          <FaThumbsDown /> Down
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                </Box>
              </Grid>

              <Grid></Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
}
