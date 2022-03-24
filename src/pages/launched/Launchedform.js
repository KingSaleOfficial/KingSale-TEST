import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  Button,
  withStyles,
  Select,
  MenuItem,
  FormHelperText,
  Input,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Slider from "@material-ui/core/Slider";
import { RiGlobalLine, RiTelegramLine } from "react-icons/ri";
import { TiSocialTwitterCircular } from "react-icons/ti";
import {
  getBase64,
  isUrlValid,
  isUrlValidTelegram,
} from "../../services/index";
import { getContract, getWeb3ContractObject, getWeb3Obj } from "src/utils";
import { useWeb3React } from "@web3-react/core";
import {
  BUSDTokenAddress,
  deadAddress,
  explorerURL,
  factoryContractAdress,
  getPromoteFees,
  maxPromote,
  USDTTokenAddress,
} from "src/constants";
import KingShibaIDOFactoryABI from "../../abis/KingShibaIDOFactoryABI.json";
import IERC20ABI from "../../abis/IERC20ABI.json";
import moment from "moment";
import Web3 from "web3";
import { ethers } from "ethers";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import { toast } from "react-toastify";
import { UserContext } from "src/context/User";
import axios from "axios";
import apiConfig from "src/config/apiConfig";
import XLSX from "xlsx";
import { FaDiscord } from "react-icons/fa";
import { AiOutlineFileSearch } from "react-icons/ai";
import { DateTimePicker } from "@material-ui/pickers";

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const IOSSlider = withStyles({
  root: {
    color: "#FABE25!important",
    height: 12,
    padding: "15px 0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 12px)",
    top: -22,
    "& *": {
      background: "transparent",
      color: "#fff",
    },
  },
  track: {
    height: 9,
  },
  rail: {
    height: 9,
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  mark: {
    backgroundColor: "#bfbfbf",
    height: 20,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: "currentColor",
  },
})(Slider);
const useStyles = makeStyles((theme) => ({
  bannerBox: {
    marginTop: "65px",
  },
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
      [theme.breakpoints.down("xs")]: {
        fontSize: "30px",
      },
    },
    "& h3": {
      fontSize: "45px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#fff",
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
          marginLeft: "20px",
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
    padding: "20px 20px 50px",
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
    border: "1px solid #b6852e",
    transition: "0.5s",
    borderRadius: "0 30px 0 0",
    backdropFilter: "blur(42px)",

    "& h1": {
      fontSize: "25px",
      fontWeight: "bold",
      lineHeight: "55px",
      color: "#FABE25",
    },
    "& p": {
      fontSize: "14px",
      color: "#9F9F9F",
      width: "100%",
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
}));

export default function BestSeller() {
  let filter;
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account, chainId, library } = useWeb3React();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = 4;
  const [whiteListAddress, setWhiteListAddress] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [poolCreateFees, setPoolCreateFees] = useState(0);
  const [poolImage, setPoolImage] = useState("");
  const [poolImage64, setPoolImage64] = useState("");
  const [formData, setFormData] = useState({
    tokenAddress: "",
    investmentToken: "BNB",
    saleTitle: "",
    maxInvestment: "",
    minInvestment: "",
    openTime: moment().format("YYYY-MM-DDTHH:mm"),
    closeTime: moment().add(1, "hours").format("YYYY-MM-DDTHH:mm"),
    salePrice: "",
    unsoldTokenAddress: "",
    hardCap: "",
    softCap: "",
    // contributionToken: "",
    listingPrice: "",
    liquidityPercentage: 50,
    listingTime: moment()
      .add(1, "hours")
      .add(1, "minutes")
      .format("YYYY-MM-DDTHH:mm"),
    tokenLockDurations: "",
    website: "",
    poocoinChartURL: "",
    telegramURL: "",
    discordURL: "",
    twitterURL: "",
    description: "",
    verifyRequest: false,
    promoteRequest: false,
    promoteEndTime: "1",
  });
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [approveTokenAmount, setApproveTokenAmount] = useState(0);
  const [tokenForLiquidity, setTokenForLiquidity] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, settotalSupply] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [whitelistAddressSheet, setWhitelistAddressSheet] = useState([]);
  const [presaleAddress, setPresaleAddress] = useState("");
  const [isPromote, setIsPromote] = useState(false);
  const [promoteList, setPromoteList] = useState([]);
  const [promoteFees, setPromoteFees] = useState(0);
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
    const promoteFees = getPromoteFees(formData.promoteEndTime);
    setPromoteFees(promoteFees);
  }, [formData.promoteEndTime]);

  useEffect(() => {
    getPromoteListhandler();
  }, []);

  const getTokenAddressDetails = async () => {
    try {
      if (window.ethereum) {
        const web3 = await getWeb3Obj();

        const dataRes = web3.utils.isAddress(formData.tokenAddress);
        if (dataRes) {
          const contract = getContract(
            formData.tokenAddress,
            IERC20ABI,
            library,
            account
          );

          const name = await contract.name();
          setTokenName(name);
          const symbol = await contract.symbol();
          setTokenSymbol(symbol);
          const totalSupply = await contract.totalSupply();
          settotalSupply(web3.utils.fromWei(totalSupply.toString()));
          const decimals = await contract.decimals();
          setDecimals(decimals);
        } else {
          toast.error("Please enter valid token address");
          setDecimals("");
          setTokenName("");
          setTokenSymbol("");
          settotalSupply("");
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Please enter valid token address");
      setDecimals("");
      setTokenName("");
      setTokenSymbol("");
      settotalSupply("");
    }
  };

  useEffect(() => {
    if (promoteList.length < maxPromote && formData.promoteRequest) {
      setIsPromote(true);
    } else {
      if (formData.promoteRequest) {
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
      } else {
        setIsPromote(false);
      }
    }
  }, [promoteList, formData.promoteRequest]);

  useEffect(() => {
    if (formData.tokenAddress && formData.tokenAddress != "") {
      getTokenAddressDetails();
    }
  }, [formData.tokenAddress]);

  const handleNext = () => {
    setIsSubmit(true);
    if (activeStep == 0 && formData.tokenAddress !== "") {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
    }
    if (
      activeStep == 1 &&
      tokenName !== "" &&
      formData.maxInvestment !== "" &&
      formData.unsoldTokenAddress !== "" &&
      Number(formData.maxInvestment) > 0 &&
      formData.minInvestment !== "" &&
      Number(formData.minInvestment) > 0 &&
      formData.salePrice !== "" &&
      Number(formData.salePrice) > 0 &&
      formData.hardCap !== "" &&
      Number(formData.hardCap) > 0 &&
      formData.softCap !== "" &&
      Number(formData.listingPrice) > 0 &&
      Number(formData.listingPrice) > 0 &&
      Number(formData.tokenLockDurations) > 0 &&
      Number(formData.tokenLockDurations) > 0 &&
      Number(formData.liquidityPercentage) >= 50 &&
      moment(formData.listingTime).isAfter(moment(formData.closeTime))
    ) {
      if (whiteListAddress != "" || whitelistAddressSheet.length > 0) {
        if (window.ethereum) {
          const web3 = (window.web3 = new Web3(window.ethereum));

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
          const dataRes = web3.utils.isAddress(formData.unsoldTokenAddress);

          if (i === addList.length) {
            if (dataRes) {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
              setIsSubmit(false);
            } else {
              toast.error("Enter valid unsold token address");
            }
          } else {
            toast.error(
              `Please enter valid address in whitelisted addresses, ${
                i + 1
              } number address is wrong `
            );
          }
        }
      } else {
        if (moment(formData.listingTime).isBefore(moment(formData.closeTime))) {
          toast.error("Listing time should be greater then Close time");
        }
        if (window.ethereum) {
          const web3 = (window.web3 = new Web3(window.ethereum));
          const dataRes = web3.utils.isAddress(formData.unsoldTokenAddress);
          if (dataRes) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setIsSubmit(false);
          } else {
            toast.error("Enter valid unsold token address");
          }
        } else {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setIsSubmit(false);
        }
      }
    }
    if (activeStep == 2 && poolImage != "") {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
    }
    if (activeStep == 3) {
      web3approveTokenHandler();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const _onInputChange = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.value };
    setFormData(temp);
    setIsApproved(false);
  };

  const _onInputChangeById = (value, id) => {
    const temp = { ...formData, [id]: value };
    setFormData(temp);
    setIsApproved(false);
  };

  const _onSliderChange = (name, value) => {
    const temp = { ...formData, [name]: value };
    setFormData(temp);
    setIsApproved(false);
  };

  const setWhiteListAddressHandler = (value) => {
    setWhiteListAddress(value);
  };

  useEffect(() => {
    console.log("formData", formData);
    if (
      formData.hardCap !== "" &&
      Number(formData.hardCap) > 0 &&
      formData.liquidityPercentage !== "" &&
      Number(formData.liquidityPercentage) > 0 &&
      formData.listingPrice !== "" &&
      Number(formData.listingPrice) > 0 &&
      formData.salePrice !== "" &&
      Number(formData.salePrice) > 0
    ) {
      const web3 = (window.web3 = new Web3(window.ethereum));
      var BN = web3.utils.BN;

      const maxEthPoolTokenAmount = new BN(web3.utils.toWei(formData.hardCap))
        .mul(new BN(formData.liquidityPercentage))
        .div(new BN("100"));
      const maxLiqPoolTokenAmount = new BN(maxEthPoolTokenAmount)
        .mul(new BN("1000000000000000000"))
        .div(new BN(web3.utils.toWei(formData.listingPrice)));
      const maxTokensToBeSold = new BN(web3.utils.toWei(formData.hardCap))
        .mul(new BN("1000000000000000000"))
        .div(new BN(web3.utils.toWei(formData.salePrice)));

      const requiredTokenAmount = new BN(maxLiqPoolTokenAmount).add(
        new BN(maxTokensToBeSold)
      );

      setTokenForLiquidity(
        web3.utils.fromWei(maxLiqPoolTokenAmount.toString())
      );
      setApproveTokenAmount(web3.utils.fromWei(requiredTokenAmount.toString()));
    }
  }, [formData]);

  const web3approveTokenHandler = async () => {
    try {
      setIsApproving(true);
      setIsApproved(false);
      const web3 = (window.web3 = new Web3(window.ethereum));
      var BN = web3.utils.BN;

      const maxEthPoolTokenAmount = new BN(web3.utils.toWei(formData.hardCap))
        .mul(new BN(formData.liquidityPercentage))
        .div(new BN("100"));
      const maxLiqPoolTokenAmount = new BN(maxEthPoolTokenAmount)
        .mul(new BN("1000000000000000000"))
        .div(new BN(web3.utils.toWei(formData.listingPrice)));
      const maxTokensToBeSold = new BN(web3.utils.toWei(formData.hardCap))
        .mul(new BN("1000000000000000000"))
        .div(new BN(web3.utils.toWei(formData.salePrice)));

      const requiredTokenAmount = new BN(maxLiqPoolTokenAmount).add(
        new BN(maxTokensToBeSold)
      );

      const contract = getContract(
        formData.tokenAddress,
        IERC20ABI,
        library,
        account
      );
      const res = await contract.approve(
        factoryContractAdress,
        requiredTokenAmount.toString()
      );
      await res.wait();
      setIsApproving(false);
      setIsApproved(true);
      toast.success("Success");
    } catch (error) {
      setIsApproving(false);
      toast.error(error.message);

      console.error("catch", error.message);
    }
  };

  const addPresaleHandler = async () => {
    try {
      let body = {
        title: tokenName,
        presaleAddress: presaleAddress,
        startTime: moment(formData.openTime).unix().toString(),
        endTime: moment(formData.closeTime).unix().toString(),
        presaleCreatorAddress: account,
        investmentToken: formData.investmentToken,
        totalTokens: Number(approveTokenAmount),
        verifyRequest: formData.verifyRequest,
        isPromote: isPromote,
        promoteEndTime: moment(formData.openTime).add(
          Number(formData.promoteEndTime),
          "days"
        ),
        presaleImage: poolImage64,
      };

      if (formData.poocoinChartURL != "") {
        body["pooCoinURL"] = formData.poocoinChartURL;
      }

      const res = await axios.post(apiConfig.addPresale, body, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      getPromoteListhandler();
      user.poolListingData();
      user.poolListingData();
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    if (presaleAddress) {
      addPresaleHandler();
    }
  }, [presaleAddress]);

  const submitHandler = async () => {
    if (isApproved) {
      try {
        const addListText = whiteListAddress ? whiteListAddress.split(",") : [];
        const addList = addListText.concat(whitelistAddressSheet);

        setIsSubmiting(true);
        const web3 = (window.web3 = new Web3(window.ethereum));

        const presaleInfo = {
          tokenAddress: formData.tokenAddress,
          unsoldTokensDumpAddress: formData.unsoldTokenAddress,
          whitelistedAddresses: addList,
          tokenPriceInWei: web3.utils.toWei(formData.salePrice),
          hardCapInWei: web3.utils.toWei(formData.hardCap),
          softCapInWei: web3.utils.toWei(formData.softCap),
          maxInvestInWei: web3.utils.toWei(formData.maxInvestment),
          minInvestInWei: web3.utils.toWei(formData.minInvestment),
          openTime: moment(formData.openTime).unix(),
          closeTime: moment(formData.closeTime).unix(),
          investmentToken:
            formData.investmentToken === "BNB"
              ? deadAddress
              : formData.investmentToken === "USDT"
              ? USDTTokenAddress
              : BUSDTokenAddress,
        };
        const presaleUniswapInfo = {
          listingPriceInWei: web3.utils.toWei(formData.listingPrice),
          liquidityAddingTime: moment(formData.listingTime).unix(),
          lpTokensLockDurationInDays: formData.tokenLockDurations,
          liquidityPercentageAllocation: formData.liquidityPercentage,
        };
        const presaleStringInfo = {
          saleTitle: ethers.utils.formatBytes32String(tokenName),
          linkTelegram: ethers.utils.formatBytes32String(formData.telegramURL),
          linkDiscord: ethers.utils.formatBytes32String(formData.discordURL),
          linkTwitter: ethers.utils.formatBytes32String(formData.twitterURL),
          linkWebsite: ethers.utils.formatBytes32String(formData.website),
        };
        const contract = getContract(
          factoryContractAdress,
          KingShibaIDOFactoryABI,
          library,
          account
        );
        let poolFees = await contract.poolFees();
        poolFees = Number(web3.utils.fromWei(poolFees.toString()));
        if (isPromote) {
          const promoteFees = getPromoteFees(formData.promoteEndTime);
          poolFees = poolFees + promoteFees;
        }

        console.log("poolFees", poolFees);

        const contractApp = getContract(
          formData.tokenAddress,
          IERC20ABI,
          library,
          account
        );

        const res = await contract.createPresale(
          presaleInfo,
          presaleUniswapInfo,
          presaleStringInfo,
          {
            value: web3.utils.toWei(poolFees.toString()),
          }
        );

        console.log("res", res);

        filter = contractApp.filters.Transfer(account, null);
        console.log("filter--", filter);

        contractApp.on(filter, (from, to, amount, event) => {
          // The to will always be "address"
          console.log(`I got ${amount} from ${from}. to ${to}`);
          setPresaleAddress(to);
        });
        await res.wait();

        console.log("res--", res);

        setIsSubmiting(false);
        toast.success("Success");
      } catch (error) {
        console.log("ERROR", error);
        setIsSubmiting(false);
        toast.error(error.message);
      }
    } else {
      toast.error("Please approve");
    }
  };

  const getPoolCreateFees = async () => {
    try {
      const web3 = await getWeb3Obj();
      const contract = await getWeb3ContractObject(
        KingShibaIDOFactoryABI,
        factoryContractAdress
      );
      const poolFees = await contract.methods.poolFees().call();
      setPoolCreateFees(web3.utils.fromWei(poolFees.toString()));
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getPoolCreateFees();
  }, []);

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

  useEffect(() => {
    return () => {
      window.removeEventListener("Transfer", filter);
    };
  }, []);

  return (
    <Box className={classes.bannerBox}>
      <Box className={classes.textbox} mt={5} mb={5}>
        <Typography variant='h2' align='center'>
          Launchpad
        </Typography>
      </Box>
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>
              <Typography variant='h6' align='left'>
                Verify Token
              </Typography>
              <Typography variant='caption'>
                Enter the token address and verify
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant='h6' align='left'>
                Launchpad Info
              </Typography>
              <Typography variant='caption'>
                Enter the information in details about presale
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant='h6' align='left'>
                Add Additional Info
              </Typography>
              <Typography variant='caption'>
                Let people know who you are
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant='h6' align='left'>
                Finish
              </Typography>
              <Typography variant='caption'>Review your information</Typography>
            </StepLabel>
          </Step>
        </Stepper>
        <div>
          {activeStep === steps ? (
            <Box my={3}>
              <Typography
                className={classes.instructions}
                style={{ color: "#fff" }}
              >
                All steps completed - Your Pool is created successfully.
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                size='large'
                style={{ marginTop: "10px" }}
                onClick={handleReset}
                className={classes.button}
              >
                Reset
              </Button>
            </Box>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(
                  activeStep,
                  _onInputChange,
                  formData,
                  isSubmit,
                  _onSliderChange,
                  setWhiteListAddressHandler,
                  whiteListAddress,
                  approveTokenAmount,
                  tokenForLiquidity,
                  tokenName,
                  tokenSymbol,
                  totalSupply,
                  decimals,
                  poolCreateFees,
                  setSelectedFile,
                  selectedFile,
                  user,
                  setPoolImage,
                  setPoolImage64,
                  poolImage,
                  poolImage64,
                  isPromote,
                  promoteFees,
                  _onInputChangeById
                )}
              </Typography>
              {account && user.isLogin ? (
                <div>
                  <Button
                    variant='outlined'
                    color='primary'
                    size='large'
                    style={{ marginRight: "7px" }}
                    disabled={activeStep === 0 || isApproving || isSubmiting}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>

                  {!isApproved && activeStep === steps - 1 && (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={web3approveTokenHandler}
                      disabled={isApproving || isApproved}
                      style={{ marginRight: "7px" }}
                    >
                      Approve {isApproving && <ButtonCircularProgress />}
                    </Button>
                  )}
                  {activeStep < 3 && (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={handleNext}
                      disabled={isApproving}
                      style={{ marginRight: "7px" }}
                    >
                      Next
                    </Button>
                  )}
                  {activeStep == steps - 1 && (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={submitHandler}
                      disabled={isApproving || isSubmiting}
                    >
                      Create {isSubmiting && <ButtonCircularProgress />}
                    </Button>
                  )}
                </div>
              ) : (
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={user.connectWallet}
                  >
                    Connect Wallet
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Box mt={5}>
        <Typography
          variant='caption'
          align='left'
          style={{ fontSize: "14px", color: "#a09b9b" }}
        >
          Desclaimer: The information provided shall not in any way constitute a
          recommendation as to whether you should invest in any product
          discussed. We accept no liability for any loss occasioned to any
          person acting or refraining from action as a result of any material
          provided or published.
        </Typography>
      </Box>
    </Box>
  );
}

// STEPPER

function getStepContent(
  step,
  _onInputChange,
  formData,
  isSubmit,
  _onSliderChange,
  setWhiteListAddressHandler,
  whiteListAddress,
  approveTokenAmount,
  tokenForLiquidity,
  tokenName,
  tokenSymbol,
  totalSupply,
  decimals,
  poolCreateFees,
  setSelectedFile,
  selectedFile,
  user,
  setPoolImage,
  setPoolImage64,
  poolImage,
  poolImage64,
  isPromote,
  promoteFees,
  _onInputChangeById
) {
  switch (step) {
    case 0:
      return (
        <Grid spacing={4} container>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <label>*Token Address</label>
              <TextField
                id='outlined-basic'
                variant='outlined'
                placeholder='0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
                fullWidth
                name='tokenAddress'
                value={formData.tokenAddress}
                onChange={_onInputChange}
                error={isSubmit && formData.tokenAddress === ""}
                helperText={
                  isSubmit &&
                  formData.tokenAddress === "" &&
                  "Please enter address"
                }
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mt={2}>
              <label>*Investment Token</label>
              <Select
                name='investmentToken'
                value={formData.investmentToken}
                onChange={_onInputChange}
                labelId='label'
                id='select'
                fullWidth
              >
                <MenuItem value='BNB'>BNB</MenuItem>
                <MenuItem value='USDT'>USDT</MenuItem>
                <MenuItem value='BUSD'>BUSD</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <label>Token Name</label>
              <TextField
                value={tokenName}
                inputProps={{ readOnly: true }}
                id='outlined-basic'
                variant='outlined'
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <label>Token Symbol</label>
              <TextField
                value={tokenSymbol}
                inputProps={{ readOnly: true }}
                id='outlined-basic'
                variant='outlined'
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <label>Total Supply</label>
              <TextField
                value={totalSupply}
                inputProps={{ readOnly: true }}
                id='outlined-basic'
                variant='outlined'
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <label>Token Decimals</label>
              <TextField
                value={decimals}
                inputProps={{ readOnly: true }}
                id='outlined-basic'
                variant='outlined'
                fullWidth
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <label>Verify Request</label>
              <Select
                name='verifyRequest'
                value={formData.verifyRequest}
                onChange={_onInputChange}
                labelId='label'
                id='select'
                fullWidth
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
              <small style={{ fontSize: "12px", color: "#a09b9b" }}>
                Create pool fee:{poolCreateFees}BNB
              </small>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <label>Promote Request</label>
              <Select
                name='promoteRequest'
                value={formData.promoteRequest}
                onChange={_onInputChange}
                labelId='label'
                id='select'
                fullWidth
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
            </Box>
          </Grid>
          {formData.promoteRequest && isPromote && (
            <Grid item xs={12} sm={6}>
              <Box mb={4}>
                <label>* Promote End Time (Since Pool Start Time)</label>
                <Select
                  name='promoteEndTime'
                  value={formData.promoteEndTime}
                  onChange={_onInputChange}
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
              </Box>
            </Grid>
          )}
        </Grid>
      );
    case 1:
      return (
        <>
          <Box mt={3} className='mainBox'>
            <Grid spacing={4} container>
              {/* <Grid item xs={12} sm={6}>
                <Box mt={2}>
                  <label>* Sale Title</label>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                    name='saleTitle'
                    value={formData.saleTitle}
                    onChange={_onInputChange}
                    error={isSubmit && formData.saleTitle === ""}
                    helperText={
                      isSubmit &&
                      formData.saleTitle === "" &&
                      "Please enter title"
                    }
                  />
                </Box>
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Max. Investment per Wallet (BNB)</label>
                  <TextField
                    type='number'
                    name='maxInvestment'
                    value={formData.maxInvestment}
                    onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.maxInvestment === "" ||
                        parseFloat(formData.maxInvestment) <= 0)
                    }
                    helperText={
                      isSubmit &&
                      (formData.maxInvestment === "" ||
                        parseFloat(formData.maxInvestment) <= 0) &&
                      "Please enter value"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Min. Investment per Wallet (BNB)</label>
                  <TextField
                    type='number'
                    name='minInvestment'
                    value={formData.minInvestment}
                    onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.minInvestment === "" ||
                        parseFloat(formData.minInvestment) <= 0)
                    }
                    helperText={
                      isSubmit &&
                      (formData.minInvestment === "" ||
                        parseFloat(formData.minInvestment) <= 0) &&
                      "Please enter value"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Opens at</label>

                  <DateTimePicker
                    inputVariant='outlined'
                    value={formData.openTime}
                    fullWidth
                    onChange={(date) => _onInputChangeById(date, "openTime")}
                    minDate={moment().format("YYYY-MM-DDTHH:mm")}
                  />

                  {/* <TextField
                    name='openTime'
                    value={formData.openTime}
                    onChange={_onInputChange}
                    type='datetime-local'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                  /> */}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Closes at</label>
                  <DateTimePicker
                    inputVariant='outlined'
                    value={formData.closeTime}
                    fullWidth
                    onChange={(date) => _onInputChangeById(date, "closeTime")}
                    minDate={moment(formData.openTime).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                  />

                  {/* <TextField
                    name='closeTime'
                    value={formData.closeTime}
                    onChange={_onInputChange}
                    type='datetime-local'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                    inputProps={{
                      min: moment(formData.openTime).format("YYYY-MM-DDTHH:mm"),
                    }}
                  /> */}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Sale Price (BNB)</label>
                  <TextField
                    type='number'
                    name='salePrice'
                    value={formData.salePrice}
                    onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.salePrice === "" ||
                        parseFloat(formData.salePrice) <= 0)
                    }
                    helperText={
                      isSubmit &&
                      (formData.salePrice === "" ||
                        parseFloat(formData.salePrice) <= 0) &&
                      "Please enter value"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>
                    * Address where UNSOLD TOKENS will be transferred to
                  </label>
                  <TextField
                    name='unsoldTokenAddress'
                    value={formData.unsoldTokenAddress}
                    onChange={_onInputChange}
                    error={isSubmit && formData.unsoldTokenAddress === ""}
                    helperText={
                      isSubmit &&
                      formData.unsoldTokenAddress === "" &&
                      "Please enter address"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                  />
                </Box>
                <small>
                  Unsold tokens will be sent to burn address by default
                </small>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Hard Cap</label>
                  <TextField
                    type='number'
                    name='hardCap'
                    value={formData.hardCap}
                    onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.hardCap === "" ||
                        parseFloat(formData.hardCap) <= 0)
                    }
                    helperText={
                      isSubmit &&
                      (formData.hardCap === "" ||
                        parseFloat(formData.hardCap) <= 0) &&
                      "Please enter value"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Soft Cap (BNB)</label>
                  <TextField
                    type='number'
                    name='softCap'
                    value={formData.softCap}
                    onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.softCap === "" ||
                        parseFloat(formData.softCap) <= 0)
                    }
                    helperText={
                      isSubmit &&
                      (formData.softCap === "" ||
                        parseFloat(formData.softCap) <= 0) &&
                      "Please enter value"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Token Public Sale Round 1'
                    fullWidth
                  />
                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <Box>
                  <label>*Contribution Token</label>
                  <Select
                    name='contributionToken'
                    value={formData.contributionToken}
                    onChange={_onInputChange}
                    labelId='label'
                    id='select'
                    fullWidth
                  >
                    <MenuItem value='BNB'>BNB</MenuItem>
                    <MenuItem value='BUSD'>BUSD</MenuItem>
                    <MenuItem value='USDT'>USDT</MenuItem>
                  </Select>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
          <Box mt={3} className='mainBox'>
            <Typography variant='h5'>Liquidity Lock and Allocation</Typography>
            <Grid spacing={4} container>
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Listing Price (BNB)</label>
                  <TextField
                    type='number'
                    name='listingPrice'
                    value={formData.listingPrice}
                    onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.listingPrice === "" ||
                        parseFloat(formData.listingPrice) <= 0)
                    }
                    helperText={
                      isSubmit &&
                      (formData.listingPrice === "" ||
                        parseFloat(formData.listingPrice) <= 0) &&
                      "Please enter value"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='2'
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box mt={4}>
                  <IOSSlider
                    min={0}
                    aria-label='ios slider'
                    name='liquidityPercentage'
                    value={formData.liquidityPercentage}
                    onChange={(e, v) => {
                      _onSliderChange("liquidityPercentage", v);
                    }}
                    valueLabelDisplay='on'
                  />
                </Box>
                {formData.liquidityPercentage < 50 && (
                  <FormHelperText error>
                    Liquidity Percentage should be greater then 50
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Listing Time</label>
                  <DateTimePicker
                    inputVariant='outlined'
                    value={formData.listingTime}
                    fullWidth
                    onChange={(date) => _onInputChangeById(date, "listingTime")}
                    minDate={moment(formData.closeTime).format(
                      "YYYY-MM-DDTHH:mm"
                    )}
                  />

                  {/* <TextField
                    name='listingTime'
                    value={formData.listingTime}
                    onChange={_onInputChange}
                    id='outlined-basic'
                    type='datetime-local'
                    variant='outlined'
                    placeholder='2'
                    fullWidth
                    inputProps={{
                      min: moment(formData.closeTime).format(
                        "YYYY-MM-DDTHH:mm"
                      ),
                    }}
                  /> */}
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* LP Tokens Lock Duration (Days)</label>
                  <TextField
                    type='number'
                    name='tokenLockDurations'
                    value={formData.tokenLockDurations}
                    onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.tokenLockDurations === "" ||
                        parseFloat(formData.tokenLockDurations) <= 0)
                    }
                    helperText={
                      isSubmit &&
                      (formData.tokenLockDurations === "" ||
                        parseFloat(formData.tokenLockDurations) <= 0) &&
                      "Please enter value"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='0'
                    fullWidth
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={3} mb={5} className='mainBox'>
            <Typography variant='h5'> Whitelist</Typography>
            <Grid spacing={1} container>
              <Grid item xs={12} sm={8}>
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
              <Grid item xs={12} sm={1}>
                <Box textAlign='center'>
                  <Typography variant='h6'>Or</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={2}>
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
          </Box>
        </>
      );
    case 2:
      return (
        <Box my={3} className='mainBox'>
          <Typography variant='h5'> Community Links</Typography>
          <Grid spacing={4} container>
            <Grid item xs={12} sm={6}>
              <Box>
                <label>Website</label>
                <TextField
                  name='website'
                  value={formData.website}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    formData.website !== "" &&
                    !isUrlValid(formData.website)
                  }
                  helperText={
                    isSubmit &&
                    formData.website !== "" &&
                    !isUrlValid(formData.website) &&
                    "Enter valid URL"
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='https://ABC.io'
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <label>PooCoin Chart</label>
                <TextField
                  name='poocoinChartURL'
                  value={formData.poocoinChartURL}
                  onChange={_onInputChange}
                  error={isSubmit && formData.poocoinChartURL !== ""}
                  helperText={
                    isSubmit &&
                    formData.poocoinChartURL !== "" &&
                    "Enter valid URL"
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='https://poocoin.io/test'
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <label>Telegram</label>
                <TextField
                  name='telegramURL'
                  value={formData.telegramURL}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    formData.telegramURL !== "" &&
                    !isUrlValidTelegram(formData.telegramURL)
                  }
                  helperText={
                    isSubmit &&
                    formData.telegramURL !== "" &&
                    !isUrlValidTelegram(formData.telegramURL) &&
                    "Enter valid URL"
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='https://t.me/ABC'
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <label>Discord</label>
                <TextField
                  name='discordURL'
                  value={formData.discordURL}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    formData.discordURL !== "" &&
                    !isUrlValid(formData.discordURL)
                  }
                  helperText={
                    isSubmit &&
                    formData.discordURL !== "" &&
                    !isUrlValid(formData.discordURL) &&
                    "Enter valid URL"
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='https://discord.com/invite/aB1c234'
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <label>Twitter</label>
                <TextField
                  name='twitterURL'
                  value={formData.twitterURL}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    formData.twitterURL !== "" &&
                    !isUrlValid(formData.twitterURL)
                  }
                  helperText={
                    isSubmit &&
                    formData.twitterURL !== "" &&
                    !isUrlValid(formData.twitterURL) &&
                    "Enter valid URL"
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='https://twitter.com/ABC'
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <label for='fname'>Select Image</label>
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
                    variant='contained'
                    color='secondary'
                    component='span'
                    size='large'
                  >
                    CHOOSE FILE
                  </Button>
                </label>
                {isSubmit && poolImage == "" && (
                  <FormHelperText error>Please select Image</FormHelperText>
                )}
              </Box>{" "}
            </Grid>
            {poolImage && (
              <Grid item xs={12} sm={6}>
                <Box mt={2} className='mainBox'>
                  <img height={150} src={poolImage} alt='' />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      );

    case 3:
      return (
        <Box my={3} className='mainBox'>
          <Box mb={3}>
            <Typography variant='h5'> Confirm Details</Typography>
          </Box>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={3}>
              <figure style={{ marginLeft: "0" }}>
                <img src={poolImage} alt=' ' />
              </figure>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box>
                <Typography variant='h2'> {tokenName}</Typography>
                {formData.twitterURL !== "" && (
                  <a
                    href={formData.twitterURL}
                    target='_blank'
                    rel='noreferrer nofollow'
                  >
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
                {formData.telegramURL !== "" && (
                  <a
                    href={formData.telegramURL}
                    target='_blank'
                    rel='noreferrer nofollow'
                  >
                    {" "}
                    <RiTelegramLine
                      style={{
                        fontSize: "25px",
                        color: "#fff",
                        margin: "0 5px",
                      }}
                    />{" "}
                  </a>
                )}

                {formData.website !== "" && (
                  <a
                    href={formData.website}
                    target='_blank'
                    rel='noreferrer nofollow'
                  >
                    <RiGlobalLine
                      style={{
                        fontSize: "25px",
                        color: "#fff",
                        margin: "0 5px",
                      }}
                    />{" "}
                  </a>
                )}
                {formData.discordURL !== "" && (
                  <a
                    href={formData.discordURL}
                    target='_blank'
                    rel='noreferrer nofollow'
                  >
                    <FaDiscord
                      style={{
                        fontSize: "25px",
                        color: "#fff",
                        margin: "0 5px",
                      }}
                    />{" "}
                  </a>
                )}
                {formData.poocoinChartURL !== "" && (
                  <a
                    href={formData.poocoinChartURL}
                    target='_blank'
                    rel='noreferrer nofollow'
                  >
                    {" "}
                    <img
                      src='images/poocoin.png'
                      style={{ width: "22px" }}
                    />{" "}
                  </a>
                )}
                {/* <Typography variant="body2">{formData.description}</Typography> */}
              </Box>
            </Grid>
          </Grid>

          <table>
            <tbody>
              {/* <tr>
                <td>Presale Address</td>
                <td class="has-text-right">
                  <a
                    href={`${explorerURL}/address/${formData.tokenAddress}`}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    {formData.tokenAddress}
                  </a>
                </td>
              </tr> */}
              <tr>
                <td>Token Name</td>
                <td class='has-text-right'>{tokenName}</td>
              </tr>
              <tr>
                <td>Token Symbol</td>
                <td class='has-text-right'>{tokenSymbol}</td>
              </tr>
              <tr>
                <td>Token Decimals</td>
                <td class='has-text-right'>{decimals}</td>
              </tr>
              <tr>
                <td>Token Address</td>
                <td class='has-text-right'>
                  <a
                    class='mr-1'
                    href={`${explorerURL}/address/${formData.tokenAddress}`}
                    target='_blank'
                    rel='noreferrer nofollow'
                  >
                    {formData.tokenAddress}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Total Supply</td>
                <td class='has-text-right'>{totalSupply}</td>
              </tr>
              <tr>
                <td>Tokens For Presale</td>
                <td class='has-text-right'>
                  {Number(approveTokenAmount).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Tokens For Liquidity</td>
                <td class='has-text-right'>
                  {Number(tokenForLiquidity).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Presale Rate</td>
                <td class='has-text-right'>
                  1 {formData.investmentToken} ={" "}
                  {1 / Number(formData.salePrice)} {tokenSymbol}&nbsp;($
                  {Number(user.usdPrice * formData.listingPrice).toFixed(2)})
                </td>
              </tr>
              <tr>
                <td>Listing Rate</td>
                <td class='has-text-right'>
                  1 {formData.investmentToken} ={" "}
                  {1 / Number(formData.listingPrice)} {tokenSymbol}
                  &nbsp;($
                  {Number(user.usdPrice * formData.listingPrice).toFixed(2)})
                </td>
              </tr>
              <tr>
                <td>Soft Cap</td>
                <td class='has-text-right'>{formData.softCap}</td>
              </tr>
              <tr>
                <td>Hard Cap</td>
                <td class='has-text-right'>{formData.hardCap}</td>
              </tr>
              <tr>
                <td>Unsold Tokens Address</td>
                <td class='has-text-right'>{formData.unsoldTokenAddress}</td>
              </tr>
              <tr>
                <td>Presale Start Time</td>
                <td class='has-text-right'>
                  {" "}
                  {moment(formData.openTime).format("DD-MM-YYYY hh:mm:ss A")}
                </td>
              </tr>
              <tr>
                <td>Presale End Time</td>
                <td class='has-text-right'>
                  {" "}
                  {moment(formData.closeTime).format("DD-MM-YYYY hh:mm:ss A")}
                </td>
              </tr>

              <tr>
                <td>Liquidity Percent</td>
                <td class='has-text-right'>{formData.liquidityPercentage}</td>
              </tr>
              <tr>
                <td>Liquidity Unlocked Time</td>
                <td class='has-text-right'>
                  <a target='_blank' rel='noopener noreferrer' href={false}>
                    {moment(formData.listingTime).format(
                      "DD-MM-YYYY hh:mm:ss A"
                    )}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      );
    default:
      return "Unknown step";
  }
}
