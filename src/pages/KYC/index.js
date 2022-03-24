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
  Container,
  FormControl,
  // MobileDatePicker,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { DateTimePicker } from "@material-ui/pickers";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Slider from "@material-ui/core/Slider";
import { RiEyeCloseFill, RiTelegramLine } from "react-icons/ri";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { isUrlValid, isUrlValidTelegram } from "../../services/index";
import { getContract, getWeb3ContractObject, getWeb3Obj } from "src/utils";
import { useWeb3React } from "@web3-react/core";

import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import {
  BUSDTokenAddress,
  deadAddress,
  explorerURL,
  factoryContractAdress,
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
import { DateRangeOutlined, PhotoCamera } from "@material-ui/icons";

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
      background:  "linear-gradient(180deg, rgb(10 15 30) 0%, rgb(22 19 3) 100%)",
      border:"1px solid #b6852e",
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

export default function BestSeller() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account, chainId, library } = useWeb3React();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = 4;
  const [whiteListAddress, setWhiteListAddress] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [poolCreateFees, setPoolCreateFees] = useState(0);
  const [formData, setFormData] = useState({
    fraudCheckId: "",
    walletAddress: "",
    firstName: "",
    lastName: "",
    emailAddress: "",
    streetAddress: "",
    cityName: "",
    stateName: "",
    countryName: "",
    nationality: "",
    zipCode: "",
    investmentToken: "",
    identityDocumentNumber: "",
    identityDocumentIssueDate: moment()
      .add(1, "hours")
      .add(1, "minutes")
      .format("YYYY-MM-DDTHH:mm"),
    identityDocumentExpiryDate: moment()
      .add(1, "hours")
      .add(1, "minutes")
      .format("YYYY-MM-DDTHH:mm"),
    identityAttachmentType: "",
    addressAttachmentType: "",
    faceAttachment: "",
    addressAttachment1: "",
    identityAttachment: "",
    fileUpload: "",
    faceAttachment12: "",
    identityAttachment12: "",
    addressAttachment12: "",
  });
  const history = useHistory();
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
  const [addressAttachment1, setAddressAttachment1] = useState([]);
  const [identityAttachment1, setidentityAttachment1] = useState([]);
  const [faceAttachment1, setfaceAttachment1] = useState("");
  const [Baseuri, setBaseuri] = useState({
    // faceAttachment12: "",
    // identityAttachment12: "",
    // addressAttachment12: "",
  });
  const [imgBlob, setImgBlob] = useState("");
  // setAddressAttachment
  const [imagesIdentity, setImagesIdentity] = useState("");
  const [BaseuriIdentity, setBaseuriIdentity] = useState();
  const [imagesAddress, setImagesAddress] = useState("");
  const [BaseuriAddress, setBaseuriAddress] = useState();

  //
  // setBaseuriIdentity
  console.log("1234555", faceAttachment1);
  const handleNext = () => {
    setIsSubmit(true);
    // console.log("===================1234", formData.fraudCheckId);
    if (
      activeStep == 0 &&
      formData.fraudCheckId != "" &&
      formData.walletAddress != "" &&
      formData.firstName != "" &&
      formData.lastName != "" &&
      formData.emailAddress != ""
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
      // getTokenAddressDetails();
    } else if (
      activeStep == 1 &&
      formData.streetAddress !== "" &&
      formData.cityName !== "" &&
      formData.stateName !== "" &&
      formData.countryName !== "" &&
      formData.zipCode !== ""
      // formData.addressAttachmentType !== ""
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
      // getTokenAddressDetails();
    } else if (
      activeStep == 2 &&
      formData.identityDocumentNumber !== "" &&
      formData.identityAttachmentType !== ""
    ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
      // getTokenAddressDetails();
    } else if (activeStep == 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsSubmit(false);
      // getTokenAddressDetails();
      // getTokenAddressDetails();
    }
  };

  const getTokenAddressDetails = async () => {
    setIsSubmiting(true);
    const formvalue = new FormData();
    formvalue.append("walletAddress", formData.walletAddress);
    formvalue.append("fraudCheckId", formData.fraudCheckId);
    formvalue.append("emailAddress", formData.emailAddress);
    formvalue.append("firstName", formData.firstName);
    formvalue.append("lastName", formData.lastName);
    formvalue.append("dateOfBirth", formData.openTime);
    formvalue.append("country", formData.countryName);
    formvalue.append("nationality", formData.nationality);
    formvalue.append("streetAddress", formData.streetAddress);
    formvalue.append("city", formData.cityName);
    formvalue.append("zip", formData.zipCode);
    formvalue.append("state", formData.stateName);
    formvalue.append("identityDocumentNumber", formData.identityDocumentNumber);
    formvalue.append(
      "identityDocumentIssueDate",
      formData.identityDocumentIssueDate
    );
    formvalue.append(
      "identityDocumentExpiryDate",
      formData.identityDocumentExpiryDate
    );
    formvalue.append("identityAttachmentType", formData.identityAttachmentType);
    formvalue.append("addressAttachmentType", formData.addressAttachmentType);
    formvalue.append("identityAttachment", formData.identityAttachment12);
    formvalue.append("addressAttachment", formData.addressAttachment12);

    formvalue.append("faceAttachment", formData.faceAttachment12);

    try {
      const res = await axios({
        method: "POST",
        url: apiConfig.uploadKYC,

        data: formvalue,
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data.responseMessage);
        setIsSubmiting(false);
        history.push({
          pathname: "/app/kyc",
          // search: data.presaleAddress,
        });
      } else {
        toast.error(res.data.responseMessage);
        setIsSubmiting(false);
      }
    } catch (error) {
      setIsSubmiting(false);
      // setTokenSession();
      console.log("ERROR", error);
      toast.error(error.message);
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

  const _onInputChange1 = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.files[0] };
    setFormData(temp);

    const delta = { [e.target.name]: e.target.files[0] };
    // getBase64(delta, (result) => {
    //   setBaseuri(result);
    // });
    // setBaseuri(URL.createObjectURL(e.target.files[0]));
    setIsApproved(false);
  };
  const _onInputChangeFile = (e) => {
    const temp = { ...formData, [e]: e };
    setFormData(temp);
    setIsApproved(false);
  };
  const _onInputChangeById = (value, id) => {
    const temp = { ...formData, [id]: value };
    setFormData(temp);
  };
  const _onSliderChange = (name, value) => {
    const temp = { ...formData, [name]: value };
    setFormData(temp);
    setIsApproved(false);
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
  }; //

  // const addressAttachment = ({ meta }, status, files) => {
  //   if (status === "done") {
  //     const temp = { ...formData, frontPage: files };
  //     console.log("---------", temp);
  //     setAddressAttachment1(temp);
  //   }
  // };

  const IdentityAttachments = ({ meta }, status, files) => {
    if (status === "done") {
      const temp = { ...formData, frontPage: files };
      console.log("---------", temp);
      setFormData(temp);
    }
  };

  console.log("`121``1~!!@#11234____________________________", Baseuri);
  const FaceAttachments = (e) => {
    setImgBlob(URL.createObjectURL(e.target.files[0]));
    getBase64(e.target.files[0], (result) => {
      setBaseuri(result);
      console.log("!@#$%^", result);
    });
  };

  return (
    <Box className={classes.bannerBox}>
      <Box className={classes.textbox} mt={5} mb={5}>
        <Typography variant='h2' align='center'>
          {/* Launchpad */}
          ADD KYC
        </Typography>
      </Box>
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>
              <Typography variant='h6' align='left'>
                Personal Details
              </Typography>
              <Typography variant='caption'>
                Enter the Personal details and upload id
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant='h6' align='left'>
                Address Details
              </Typography>
              <Typography variant='caption'>
                Enter the address in details about person
              </Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <Typography variant='h6' align='left'>
                KYC Document
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
                All steps completed - Your KYC is apply successfully.
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
                  _onInputChange1,
                  _onInputChangeFile,
                  _onInputChangeById,
                  formData,
                  isSubmit,
                  _onSliderChange,
                  IdentityAttachments,
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
                  setfaceAttachment1,
                  FaceAttachments,
                  setImagesIdentity,
                  setImgBlob,
                  setBaseuri,
                  setImagesAddress,
                  setBaseuriAddress,
                  imgBlob,
                  Baseuri
                )}
              </Typography>
              {account && user.isLogin ? (
                <Container maxWidth='md'>
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

                  {/* {!isApproved && activeStep === steps - 1 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={web3approveTokenHandler}
                      disabled={isApproving || isApproved}
                      style={{ marginRight: "7px" }}
                    >
                      Approve {isApproving && <ButtonCircularProgress />}
                    </Button>
                  )} */}
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
                      onClick={getTokenAddressDetails}
                      disabled={isApproving || isSubmiting}
                    >
                      Create {isSubmiting && <ButtonCircularProgress />}
                    </Button>
                  )}
                </Container>
              ) : (
                <Container maxWidth='md'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={user.connectWallet}
                  >
                    Connect Wallet
                  </Button>
                </Container>
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
  _onInputChange1,
  _onInputChangeFile,
  _onInputChangeById,
  formData,
  isSubmit,
  imgBlob,
  _onSliderChange,
  Baseuri
) {
  switch (step) {
    case 0:
      return (
       
          <Box pb={2}>
            <Grid spacing={2} container>
              <Grid item xs={12} sm={6}>
                <Box my={1} className='mainBox'>
                  <label>*Fraud Check Id</label>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    fullWidth
                    name='fraudCheckId'
                    value={formData.fraudCheckId}
                    onChange={_onInputChange}
                    error={isSubmit && formData.fraudCheckId === ""}
                    helperText={
                      isSubmit &&
                      formData.fraudCheckId === "" &&
                      "Please enter address"
                    }
                  />

                  <small style={{ fontSize: "12px", color: "#a09b9b" }}>
                    {/* Create pool fee:{poolCreateFees}BNB */}
                  </small>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box my={1} className='mainBox'>
                  <label>*Wallet Address</label>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    fullWidth
                    name='walletAddress'
                    value={formData.walletAddress}
                    onChange={_onInputChange}
                    error={isSubmit && formData.walletAddress === ""}
                    helperText={
                      isSubmit &&
                      formData.walletAddress === "" &&
                      "Please enter wallet address"
                    }
                  />

                  <small style={{ fontSize: "12px", color: "#a09b9b" }}>
                    {/* Create pool fee:{poolCreateFees}BNB */}
                  </small>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box my={1} className='mainBox'>
                  <label>*First Name</label>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    fullWidth
                    name='firstName'
                    value={formData.firstName}
                    onChange={_onInputChange}
                    error={isSubmit && formData.firstName === ""}
                    helperText={
                      isSubmit &&
                      formData.firstName === "" &&
                      "Please enter First Name"
                    }
                  />

                  <small style={{ fontSize: "12px", color: "#a09b9b" }}>
                    {/* Create pool fee:{poolCreateFees}BNB */}
                  </small>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box my={1} className='mainBox'>
                  <label>*Last Name</label>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    fullWidth
                    name='lastName'
                    value={formData.lastName}
                    onChange={_onInputChange}
                    error={isSubmit && formData.lastName === ""}
                    helperText={
                      isSubmit &&
                      formData.lastName === "" &&
                      "Please enter Last Name"
                    }
                  />

                  <small style={{ fontSize: "12px", color: "#a09b9b" }}>
                    {/* Create pool fee:{poolCreateFees}BNB */}
                  </small>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box my={1} className='mainBox'>
                  <label>*Email</label>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    fullWidth
                    name='emailAddress'
                    value={formData.emailAddress}
                    onChange={_onInputChange}
                    error={isSubmit && formData.emailAddress === ""}
                    helperText={
                      isSubmit &&
                      formData.emailAddress === "" &&
                      "Please enter Email Address "
                    }
                  />

                  <small style={{ fontSize: "12px", color: "#a09b9b" }}>
                    {/* Create pool fee:{poolCreateFees}BNB */}
                  </small>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box my={1} className='mainBox'>
                  <label>*Date of Birth</label>

                  <DateTimePicker
                    inputVariant='outlined'
                    value={formData.openTime}
                    fullWidth
                    onChange={(date) => _onInputChangeById(date, "openTime")}
                    maxDate={moment().format("YYYY-MM-DDTHH:mm")}
                  />

                  {/* <TextField
                    name='openTime'
                    value={formData.openTime}
                    onChange={_onInputChange}
                    type='datetime-local'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Date of Birth'
                    fullWidth
                    format='DD/MM/yyyy hh:mm A'
                    // maxDate={moment(formData.identityDocumentExpiryDate)}
                    inputProps={{
                      max: moment().format("YYYY-MM-DDTHH:mm"),
                    }}
                  /> */}
                  {/* <TextField
                    name="openTime"
                    value={formData.openTime}
                    onChange={_onInputChange}
                    type="datetime-local"
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Token Public Sale Round 1"
                    fullWidth
                  /> */}

                  <small style={{ fontSize: "12px", color: "#a09b9b" }}>
                    {/* Create pool fee:{poolCreateFees}BNB */}
                  </small>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <label>*Upload face attachment</label>

                <Box
                  // className={classes.boximg}
                  style={{
                    width: "100%",
                    // height: "150px",
                    minHeight: "100px",
                    maxHeight: "300px",
                    margin: "0 auto",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    border: "1px solid grey",
                    // borderRadius: "50%",
                  }}
                  onChange={_onInputChange1}
                >
                  {formData.faceAttachment12 && (
                    <img
                      src={
                        formData.faceAttachment12
                          ? URL.createObjectURL(formData.faceAttachment12)
                          : "images/bit9.png"
                      }
                      alt=''
                      style={{ width: "300px", height: "200px" }}
                    />
                  )}
                  <input
                    accept='image/*'
                    style={{ display: "none", cursor: "pointer" }}
                    id='raised-button-file-img'
                    multiple
                    type='file'
                    name='faceAttachment12'
                    onChange={_onInputChange1}
                    error={isSubmit && formData.faceAttachment12 === ""}
                    helperText={
                      isSubmit &&
                      formData.faceAttachment12 === "" &&
                      "Please enter Images "
                    }
                  />

                  <label htmlFor='raised-button-file-img'>
                    <Box
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "97px",
                      }}
                    >
                      <PhotoCamera
                        style={{ cursor: "pointer" }}
                        htmlFor='raised-button-file-img'
                        className='imgcontrol2'
                        src='/images/vectoredit.png'
                      />
                    </Box>
                  </label>
                </Box>
              </Grid>
            </Grid>
          </Box>
        
      );
    case 1:
      return (
        <Container maxWidth='md'>
          <Box mb={3} mt={3} className='mainBox'>
            <Grid spacing={2} container>
              <Grid item xs={12} sm={6}>
                <Box mt={2}>
                  <label>* Street Address</label>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Street Address'
                    fullWidth
                    name='streetAddress'
                    value={formData.streetAddress}
                    onChange={_onInputChange}
                    error={isSubmit && formData.streetAddress === ""}
                    helperText={
                      isSubmit &&
                      formData.streetAddress === "" &&
                      "Please enter Street Address"
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box mt={2}>
                  <label>City Name</label>
                  <TextField
                    type='name'
                    name='cityName'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='City Name'
                    fullWidth
                    value={formData.cityName}
                    onChange={_onInputChange}
                    error={isSubmit && formData.cityName === ""}
                    helperText={
                      isSubmit &&
                      formData.streetAddress === "" &&
                      "Please enter City Name"
                    }
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* State Name</label>
                  <TextField
                    type='name'
                    name='stateName'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='State Name'
                    fullWidth
                    value={formData.stateName}
                    onChange={_onInputChange}
                    error={isSubmit && formData.stateName === ""}
                    helperText={
                      isSubmit &&
                      formData.stateName === "" &&
                      "Please enter State Name"
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Country Name</label>
                  <TextField
                    type='name'
                    name='countryName'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Country Name'
                    fullWidth
                    value={formData.countryName}
                    onChange={_onInputChange}
                    error={isSubmit && formData.countryName === ""}
                    helperText={
                      isSubmit &&
                      formData.countryName === "" &&
                      "Please enter Country Name"
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Nationality</label>
                  <TextField
                    type='name'
                    name='nationality'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Nationality'
                    fullWidth
                    value={formData.nationality}
                    onChange={_onInputChange}
                    error={isSubmit && formData.nationality === ""}
                    helperText={
                      isSubmit &&
                      formData.nationality === "" &&
                      "Please enter Nationality Name"
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>* Zip Code</label>
                  <TextField
                    type='number'
                    name='zipCode'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Zip Code'
                    fullWidth
                    value={formData.zipCode}
                    onChange={_onInputChange}
                    error={isSubmit && formData.zipCode === ""}
                    helperText={
                      isSubmit &&
                      formData.zipCode === "" &&
                      "Please enter Zip Code"
                    }
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Box>
                  <label>* Address Attachment Type</label>
                  {/*  */}
                  <Select
                    name='addressAttachmentType'
                    value={formData.addressAttachmentType}
                    onChange={_onInputChange}
                    labelId='label'
                    id='select'
                    fullWidth
                    error={isSubmit && formData.addressAttachmentType === ""}
                    helperText={
                      isSubmit &&
                      formData.addressAttachmentType === "" &&
                      "Please select Address Attachment Type"
                    }
                  >
                    <MenuItem value='ID_CARD'>ID CARD</MenuItem>
                    <MenuItem value='PASSPORT'>PASSPORT</MenuItem>
                    <MenuItem value='DRIVING_LICENSE'>DRIVING LICENSE</MenuItem>
                    <MenuItem value='UTILITY_BILL'>UTILITY BILL</MenuItem>
                    <MenuItem value='BANK_STATEMENT'>BANK STATEMENT</MenuItem>
                    <MenuItem value='RENT_AGREEMENT'>REBT AGREEMENT</MenuItem>
                    <MenuItem value='EMPLOYER_LETTER'>EMPLOYER LRTTER</MenuItem>
                    <MenuItem value='TAX_BILL'>TAX BILL</MenuItem>
                  </Select>
                </Box>
              </Grid>

              <Grid item xs={12} md={12}>
                <label>*Upload address identity attachment</label>

                <Box
                  // className={classes.boximg}
                  style={{
                    width: "100%",
                    // height: "150px",
                    minHeight: "100px",
                    maxHeight: "300px",
                    margin: "0 auto",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    border: "1px solid grey",
                    // borderRadius: "50%",
                  }}
                >
                  {formData.identityAttachment12 && (
                    <img
                      src={
                        formData.identityAttachment12
                          ? URL.createObjectURL(formData.identityAttachment12)
                          : "images/bit9.png"
                      }
                      alt=''
                      style={{ width: "300px", height: "200px" }}
                    />
                  )}
                  <input
                    accept='image/*'
                    style={{ display: "none", cursor: "pointer" }}
                    id='raised-button-file-img'
                    multiple
                    type='file'
                    name='identityAttachment12'
                    onChange={_onInputChange1}
                  />

                  <label htmlFor='raised-button-file-img'>
                    <Box
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "97px",
                      }}
                    >
                      <PhotoCamera
                        style={{ cursor: "pointer" }}
                        htmlFor='raised-button-file-img'
                        className='imgcontrol2'
                        src='/images/vectoredit.png'
                      />
                    </Box>
                  </label>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      );
    case 2:
      return (
        <Container maxWidth='md'>
          <Box my={3} className='mainBox'>
            <Typography variant='h5'> KYC Docment</Typography>
            <Grid spacing={2} container>
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Identity Document Number</label>
                  {/* <TextField
                    name="number"
                    value={formData.identityDocumentNumber}
                    onChange={_onInputChange}
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="id number"
                    fullWidth
                    error={isSubmit && formData.identityDocumentNumber === ""}
                    helperText={
                      isSubmit &&
                      formData.identityDocumentNumber === "" &&
                      "Please select Address Attachment Type"
                    }
                  /> */}
                  <TextField
                    name='identityDocumentNumber'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='identityDocumentNumber'
                    fullWidth
                    value={formData.identityDocumentNumber}
                    onChange={_onInputChange}
                    error={isSubmit && formData.identityDocumentNumber === ""}
                    helperText={
                      isSubmit &&
                      formData.identityDocumentNumber === "" &&
                      "Please enter Identity Document Number "
                    }
                    // format="DD/MM/yyyy hh:mm A"
                    // minDate={moment(fromDate)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Identity Document Issue Date</label>

                  <DateTimePicker
                    inputVariant='outlined'
                    value={formData.identityDocumentIssueDate}
                    fullWidth
                    onChange={(date) =>
                      _onInputChangeById(date, "identityDocumentIssueDate")
                    }
                    maxDate={moment().format("YYYY-MM-DDTHH:mm")}
                  />

                  {/* <TextField
                    name='identityDocumentIssueDate'
                    value={formData.identityDocumentIssueDate}
                    onChange={_onInputChange}
                    type='datetime-local'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Identity Document Issue Date'
                    fullWidth
                    format='DD/MM/yyyy hh:mm A'
                    // maxDate={moment(formData.identityDocumentExpiryDate)}
                    inputProps={{
                      max: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
                    }}
                  /> */}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Identity Document Expiry Date</label>

                  <DateTimePicker
                    inputVariant='outlined'
                    value={formData.identityDocumentExpiryDate}
                    fullWidth
                    onChange={(date) =>
                      _onInputChangeById(date, "identityDocumentExpiryDate")
                    }
                    minDate={moment().format("YYYY-MM-DDTHH:mm")}
                  />

                  {/* <TextField
                    name='closeTime'
                    value={formData.identityDocumentExpiryDate}
                    onChange={_onInputChange}
                    type='datetime-local'
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Identity Document Expiry Date'
                    fullWidth
                    format='DD/MM/yyyy hh:mm A'
                    // minDate={moment(formData.identityDocumentExpiryDate)}
                    inputProps={{
                      min: moment(formData.identityDocumentExpiryDate).format(
                        "YYYY-MM-DDTHH:mm"
                      ),
                    }}
                    // error={isSubmit && formData.investmentToken === ""}
                    // helperText={
                    //   isSubmit &&
                    //   formData.investmentToken === "" &&
                    //   "Please select Address Attachment Type"
                    // }
                  /> */}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Identity Attachment Type</label>
                  <Select
                    name='identityAttachmentType'
                    value={formData.identityAttachmentType}
                    onChange={_onInputChange}
                    labelId='label'
                    id='select'
                    fullWidth
                    error={isSubmit && formData.identityAttachmentType === ""}
                    helperText={
                      isSubmit &&
                      formData.identityAttachmentType === "" &&
                      "Please select Address Attachment Type"
                    }
                  >
                    <MenuItem value='ID_CARD'>ID CARD</MenuItem>
                    <MenuItem value='PASSPORT'>PASSPORT</MenuItem>
                    <MenuItem value='DRIVING_LICENSE'>DRIVING LICENSE</MenuItem>
                  </Select>
                </Box>
              </Grid>

              <Grid item xs={12} md={12}>
                <label>*Upload identity attachment</label>

                <Box
                  // className={classes.boximg}
                  style={{
                    width: "100%",
                    // height: "150px",
                    minHeight: "100px",
                    maxHeight: "300px",
                    margin: "0 auto",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    border: "1px solid grey",
                    // borderRadius: "50%",
                  }}
                  error={isSubmit && formData.addressAttachment12 === ""}
                  helperText={
                    isSubmit &&
                    formData.addressAttachment12 === "" &&
                    "Please enter Address Attachment "
                  }
                >
                  {formData.addressAttachment12 && (
                    <img
                      src={
                        formData.addressAttachment12
                          ? URL.createObjectURL(formData.addressAttachment12)
                          : "images/bit9.png"
                      }
                      alt=''
                      style={{ width: "300px", height: "200px" }}
                    />
                  )}
                  <input
                    accept='image/*'
                    style={{ display: "none", cursor: "pointer" }}
                    id='raised-button-file-img'
                    multiple
                    type='file'
                    name='addressAttachment12'
                    onChange={_onInputChange1}
                  />

                  <label htmlFor='raised-button-file-img'>
                    <Box
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "97px",
                      }}
                    >
                      <PhotoCamera
                        style={{ cursor: "pointer" }}
                        htmlFor='raised-button-file-img'
                        className='imgcontrol2'
                        src='/images/vectoredit.png'
                      />
                    </Box>
                  </label>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      );

    case 3:
      return (
        <Container maxWidth='md'>
          <Box my={3} className='mainBox'>
            <Box mb={3}>
              <Typography variant='h5'> Confirm Details</Typography>
            </Box>

            <table>
              <tbody>
                <tr>
                  <td>Fraud Check Id</td>
                  <td class='has-text-right'>{formData.fraudCheckId}</td>
                </tr>

                <tr>
                  <td>Address</td>
                  <td class='has-text-right'>{`${formData.streetAddress}, ${formData.cityName}, ${formData.stateName}, ${formData.countryName}, ${formData.zipCode}`}</td>
                </tr>
                <tr>
                  <td>Nationality</td>
                  <td class='has-text-right'>{formData.nationality}</td>
                </tr>
                <tr>
                  <td>Address Attachment Type</td>
                  <td class='has-text-right'>
                    {formData.addressAttachmentType}
                  </td>
                </tr>
                <tr>
                  <td>Address Attachment</td>
                  <td class='has-text-right'>
                    <img
                      src={
                        formData.addressAttachment12
                          ? URL.createObjectURL(formData.addressAttachment12)
                          : ""
                      }
                      style={{ width: "300px", height: "300px" }}
                      alt={formData.addressAttachmentType}
                    />
                  </td>
                </tr>

                <tr>
                  <td>Identity Attachment Type</td>
                  <td class='has-text-right'>
                    {" "}
                    {formData.identityAttachmentType}{" "}
                  </td>
                </tr>
                <tr>
                  <td>Identity Document Issue Date</td>
                  <td class='has-text-right'>
                    {moment(formData.identityDocumentIssueDate).format("ll")}
                    {/* {Number(tokenForLiquidity).toFixed(2)} */}
                  </td>
                </tr>
                <tr>
                  <td>Identity Document Expiry Date</td>
                  <td class='has-text-right'>
                    {moment(formData.identityDocumentExpiryDate).format("ll")}
                    {/* 1 {formData.investmentToken} = {formData.salePrice} &nbsp; ($
                  {Number(user.usdPrice * formData.listingPrice).toFixed(2)}) */}
                  </td>
                </tr>
                <tr>
                  <td>Identity Document Number</td>
                  <td class='has-text-right'>
                    {formData.identityDocumentNumber}
                    {/* 1 {formData.investmentToken} = {formData.salePrice} &nbsp; ($
                  {Number(user.usdPrice * formData.listingPrice).toFixed(2)}) */}
                  </td>
                </tr>

                <tr>
                  <td>Identity Attachment</td>
                  <td class='has-text-right'>
                    <img
                      src={
                        formData.identityAttachment12
                          ? URL.createObjectURL(formData.identityAttachment12)
                          : ""
                      }
                      style={{ width: "300px", height: "300px" }}
                      alt={formData.identityAttachmentType}
                    />
                  </td>
                </tr>
                {/* <tr>
                <td>Identity Attachment</td>
                <td class="has-text-right">
                  <img
                    src={data.identityAttachment}
                    style={{ width: "300px", height: "300px" }}
                    alt="identityAttachment"
                  />
                </td>
              </tr> */}
                <tr>
                  <td>Face Attachment</td>
                  <td class='has-text-right'>
                    <img
                      src={
                        formData.faceAttachment12
                          ? URL.createObjectURL(formData.faceAttachment12)
                          : ""
                      }
                      style={{ width: "300px", height: "300px" }}
                      alt='faceAttachment'
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Container>
      );
    default:
      return "Unknown step";
  }
}

// import React, { useState, useEffect, useContext } from "react";
// import {
//   Grid,
//   Box,
//   Typography,
//   makeStyles,
//   Button,
//   withStyles,
//   Select,
//   MenuItem,
//   FormHelperText,
//   Container,
//   FormControl,
//   // MobileDatePicker,
// } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
// import { useHistory } from "react-router-dom";
// // import getBase64 from "src/constants";
// // import { DateTimePicker } from "@material-ui/pickers";
// // import MobileDatePicker
// // import {
// //   MuiPickersUtilsProvider,
// //   KeyboardTimePicker,
// //   KeyboardDatePicker,
// // } from "@material-ui/pickers";

// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import Slider from "@material-ui/core/Slider";
// import { RiEyeCloseFill, RiTelegramLine } from "react-icons/ri";
// import { TiSocialTwitterCircular } from "react-icons/ti";
// import { isUrlValid, isUrlValidTelegram } from "../../services/index";
// import { getContract, getWeb3ContractObject, getWeb3Obj } from "src/utils";
// import { useWeb3React } from "@web3-react/core";

// import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";
// import {
//   BUSDTokenAddress,
//   deadAddress,
//   explorerURL,
//   factoryContractAdress,
//   USDTTokenAddress,
// } from "src/constants";
// import KingShibaIDOFactoryABI from "../../abis/KingShibaIDOFactoryABI.json";
// import IERC20ABI from "../../abis/IERC20ABI.json";
// import moment from "moment";
// import Web3 from "web3";
// import { ethers } from "ethers";
// import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
// import { toast } from "react-toastify";
// import { UserContext } from "src/context/User";
// import axios from "axios";
// import apiConfig from "src/config/apiConfig";
// import XLSX from "xlsx";
// import { DateRangeOutlined, PhotoCamera } from "@material-ui/icons";

// const iOSBoxShadow =
//   "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

// const IOSSlider = withStyles({
//   root: {
//     color: "#FABE25!important",
//     height: 12,
//     padding: "15px 0",
//   },
//   thumb: {
//     height: 20,
//     width: 20,
//     backgroundColor: "#fff",
//     boxShadow: iOSBoxShadow,
//     marginTop: -8,
//     marginLeft: -14,
//     "&:focus, &:hover, &$active": {
//       boxShadow:
//         "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
//       // Reset on touch devices, it doesn't add specificity
//       "@media (hover: none)": {
//         boxShadow: iOSBoxShadow,
//       },
//     },
//   },
//   active: {},
//   valueLabel: {
//     left: "calc(-50% + 12px)",
//     top: -22,
//     "& *": {
//       background: "transparent",
//       color: "#fff",
//     },
//   },
//   track: {
//     height: 9,
//   },
//   rail: {
//     height: 9,
//     opacity: 0.5,
//     backgroundColor: "#bfbfbf",
//   },
//   mark: {
//     backgroundColor: "#bfbfbf",
//     height: 20,
//     width: 1,
//     marginTop: -3,
//   },
//   markActive: {
//     opacity: 1,
//     backgroundColor: "currentColor",
//   },
// })(Slider);
// const useStyles = makeStyles((theme) => ({
//   bannerBox: {
//     marginTop: "65px",
//   },
//   textbox: {
//     mint: {
//       fontSize: "14px ",
//       border: "1px solid #E8424C",
//       background: "#E8424C",
//       fontWeight: 600,
//       height: "44px ",
//       color: "#FFFFFF",
//       minWidth: "150px ",
//       borderRadius: "50px",
//       boxShadow: "none ",
//       cursor: "pointer",
//       [theme.breakpoints.down("xs")]: {
//         height: "45px ",
//         minWidth: "120px ",
//       },
//       "&:hover": {
//         borderColor: "#E8424C",
//         background: "#E8424C",
//       },
//     },
//     "& h1": {
//       fontSize: "25px",
//       fontWeight: "bold",
//       lineHeight: "55px",
//       color: "#FABE25",
//     },
//     "& h2": {
//       fontSize: "45px",
//       fontWeight: "bold",
//       lineHeight: "55px",
//       color: "#FABE25",
//       [theme.breakpoints.down("xs")]: {
//         fontSize: "30px",
//       },
//     },
//     "& h3": {
//       fontSize: "45px",
//       fontWeight: "bold",
//       lineHeight: "55px",
//       color: "#fff",
//     },
//     "& h5": {
//       fontSize: "30px",
//       fontWeight: "500",
//       color: "#fff",
//       marginBottom: "10px",
//       marginTop: "15px",
//     },
//     "& h6": {
//       color: "#9F9F9F",
//       marginBottom: "10px",
//     },
//     "& p": {
//       fontSize: "14px",
//       color: "#9F9F9F",
//       width: "100%",
//       // maxWidth: "600px",
//     },
//     "& label": {
//       fontSize: "16px",
//       color: "#fff",
//       // maxWidth: "600px",
//     },
//     "& div": {
//       "& button": {
//         "&:last-child": {
//           marginLeft: "20px",
//         },
//       },
//     },
//   },
//   technologies: {
//     background: "#ECECEC",
//     borderRadius: "10px",
//     maxHeight: "300px",
//     "& img": {
//       maxHeight: "300px",
//     },
//   },

//   amount: {
//     "& label": {
//       color: "#353840",
//       fontSize: "18px",
//       fontWeight: "400",
//       lineHeight: "33px",
//     },
//   },
//   amountdiv: {
//     maxWidth: "100%",
//     height: "60px",
//     border: "1px solid #00ffab",
//     borderRadius: " 5px",
//     display: "flex",
//     padding: "0 20px",
//     alignItems: "center",
//     fontSize: "45px",
//   },

//   inputfile: {
//     background: "#ECECEC",
//     borderRadius: "10px",
//     position: "relative",
//     border: "2px dashed #DDD9D9",
//     boxSizing: "border-box",
//     cursor: "pointer",
//     padding: "10px",

//     "& input": {
//       width: "100%",
//       height: "100%",
//       top: "0",
//       left: "0",
//       opacity: "0",
//       position: "absolute",
//       cursor: "pointer",
//     },

//     "& img": {
//       padding: "26px",
//     },

//     "& p": {
//       fontSize: "9px",
//       fontWeight: "normal",
//       padding: "9px",
//       lineHeight: "17px",
//       textAlign: "center",
//       color: "#595C62",
//       marginTop: "-17px",
//     },
//   },

//   mainBox: {
//     padding: "20px 20px 50px",
//     overflow: "hidden",
//     position: "relative",
//     background:
//       "linear-gradient( 152.97deg, rgba(255, 255, 255, 0.08) 0%, rgba(232, 66, 76, 0.062) 100%)",
//     transition: "0.5s",
//     borderRadius: "0 30px 0 0",
//     backdropFilter: "blur(42px)",

//     "& h1": {
//       fontSize: "25px",
//       fontWeight: "bold",
//       lineHeight: "55px",
//       color: "#FABE25",
//     },
//     "& p": {
//       fontSize: "14px",
//       color: "#9F9F9F",
//       width: "100%",
//       // maxWidth: "600px",
//     },
//     "& small": {
//       fontSize: "12px",
//       color: "#6c757d!important",
//       // maxWidth: "600px",
//     },
//     "& label": {
//       color: "#9F9F9F",
//       padding: "0",
//       fontSize: "14px",
//       transition:
//         "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
//     },
//   },
//   selectbox: {
//     width: "100%",
//     border: "2px solid #FABE25",
//     height: "37px",
//     borderRadius: "5px",
//     background: "#18131d",
//     color: "#9F9F9F",
//     fontSize: "14px",
//     padding: "5px",
//   },

//   buttonright: {
//     fontSize: "14px ",
//     border: "1px solid #E8424C",
//     background: "#E8424C",
//     fontWeight: 600,
//     height: "44px ",
//     borderRadius: "50px",
//     color: "#FFFFFF",
//     minWidth: "150px ",
//     boxShadow: "none ",
//     cursor: "pointer",
//     [theme.breakpoints.down("xs")]: {
//       height: "45px ",
//       minWidth: "120px ",
//     },
//     "&:hover": {
//       borderColor: "#E8424C",
//       backgroundColor: "#E8424C",
//       border: "2px solid #fff",
//     },
//   },
// }));
// export const getBase64 = (file, cb) => {
//   let reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function () {
//     cb(reader.result);
//   };
//   reader.onerror = function (err) {
//     console.log("Error: ", err);
//   };
// };

// export default function BestSeller() {
//   const classes = useStyles();
//   const user = useContext(UserContext);
//   const { account, chainId, library } = useWeb3React();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const steps = 4;
//   const [whiteListAddress, setWhiteListAddress] = useState("");
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [poolCreateFees, setPoolCreateFees] = useState(0);
//   const maxDate = new Date();
//   const [formData, setFormData] = useState({
//     fraudCheckId: "",
//     walletAddress: "",
//     firstName: "",
//     lastName: "",
//     emailAddress: "",
//     streetAddress: "",
//     cityName: "",
//     stateName: "",
//     countryName: "",
//     nationality: "",
//     zipCode: "",
//     investmentToken: "",
//     identityDocumentNumber: "",
//     identityDocumentIssueDate: moment()
//       .add(1, "hours")
//       .add(1, "minutes")
//       .format("YYYY-MM-DDTHH:mm"),
//     identityDocumentExpiryDate: moment()
//       .add(1, "hours")
//       .add(1, "minutes")
//       .format("YYYY-MM-DDTHH:mm"),
//     identityAttachmentType: "",
//     addressAttachmentType: "",
//     faceAttachment: "",
//     addressAttachment1: "",
//     identityAttachment: "",
//     fileUpload: "",
//     faceAttachment12: "",
//     identityAttachment12: "",
//     addressAttachment12: "",
//   });
//   const history = useHistory();
//   const [isApproving, setIsApproving] = useState(false);
//   const [isApproved, setIsApproved] = useState(false);
//   const [isSubmiting, setIsSubmiting] = useState(false);
//   const [approveTokenAmount, setApproveTokenAmount] = useState(0);
//   const [tokenForLiquidity, setTokenForLiquidity] = useState(0);
//   const [tokenName, setTokenName] = useState("");
//   const [tokenSymbol, setTokenSymbol] = useState("");
//   const [totalSupply, settotalSupply] = useState(0);
//   const [decimals, setDecimals] = useState(0);
//   const [selectedFile, setSelectedFile] = useState();
//   const [whitelistAddressSheet, setWhitelistAddressSheet] = useState([]);
//   const [addressAttachment1, setAddressAttachment1] = useState([]);
//   const [identityAttachment1, setidentityAttachment1] = useState([]);
//   const [faceAttachment1, setfaceAttachment1] = useState("");
//   const [Baseuri, setBaseuri] = useState({
//     // faceAttachment12: "",
//     // identityAttachment12: "",
//     // addressAttachment12: "",
//   });
//   const [imgBlob, setImgBlob] = useState("");
//   // setAddressAttachment
//   const [imagesIdentity, setImagesIdentity] = useState("");
//   const [BaseuriIdentity, setBaseuriIdentity] = useState();
//   const [imagesAddress, setImagesAddress] = useState("");
//   const [BaseuriAddress, setBaseuriAddress] = useState();

//   //
//   // setBaseuriIdentity
//   console.log("1234555", faceAttachment1);
//   const handleNext = () => {
//     setIsSubmit(true);
//     // console.log("===================1234", formData.fraudCheckId);
//     if (
//       activeStep == 0 &&
//       formData.fraudCheckId != "" &&
//       formData.walletAddress != "" &&
//       formData.firstName != "" &&
//       formData.lastName != "" &&
//       formData.emailAddress != ""
//     ) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       setIsSubmit(false);
//       // getTokenAddressDetails();
//     } else if (
//       activeStep == 1 &&
//       formData.streetAddress !== "" &&
//       formData.cityName !== "" &&
//       formData.stateName !== "" &&
//       formData.countryName !== "" &&
//       formData.zipCode !== ""
//       // formData.addressAttachmentType !== ""
//     ) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       setIsSubmit(false);
//       // getTokenAddressDetails();
//     } else if (
//       activeStep == 2 &&
//       formData.identityDocumentNumber !== "" &&
//       formData.identityAttachmentType !== ""
//     ) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       setIsSubmit(false);
//       // getTokenAddressDetails();
//     } else if (activeStep == 3) {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//       setIsSubmit(false);
//       // getTokenAddressDetails();
//       // getTokenAddressDetails();
//     }
//   };

//   const getTokenAddressDetails = async () => {
//     setIsSubmiting(true);
//     const formvalue = new FormData();
//     formvalue.append("walletAddress", formData.walletAddress);
//     formvalue.append("fraudCheckId", formData.fraudCheckId);
//     formvalue.append("emailAddress", formData.emailAddress);
//     formvalue.append("firstName", formData.firstName);
//     formvalue.append("lastName", formData.lastName);
//     formvalue.append("dateOfBirth", formData.openTime);
//     formvalue.append("country", formData.countryName);
//     formvalue.append("nationality", formData.nationality);
//     formvalue.append("streetAddress", formData.streetAddress);
//     formvalue.append("city", formData.cityName);
//     formvalue.append("zip", formData.zipCode);
//     formvalue.append("state", formData.stateName);
//     formvalue.append("identityDocumentNumber", formData.identityDocumentNumber);
//     formvalue.append(
//       "identityDocumentIssueDate",
//       formData.identityDocumentIssueDate
//     );
//     formvalue.append(
//       "identityDocumentExpiryDate",
//       formData.identityDocumentExpiryDate
//     );
//     formvalue.append("identityAttachmentType", formData.identityAttachmentType);
//     formvalue.append("addressAttachmentType", formData.addressAttachmentType);
//     formvalue.append("identityAttachment", formData.identityAttachment12);
//     formvalue.append("addressAttachment", formData.addressAttachment12);

//     formvalue.append("faceAttachment", formData.faceAttachment12);

//     try {
//       const res = await axios({
//         method: "POST",
//         url: apiConfig.uploadKYC,

//         data: formvalue,
//       });
//       if (res.data.statusCode === 200) {
//         toast.success(res.data.responseMessage);
//         setIsSubmiting(false);
//         history.push({
//           pathname: "/app/kyc",
//           // search: data.presaleAddress,
//         });
//       } else {
//         toast.error(res.data.responseMessage);
//         setIsSubmiting(false);
//       }
//     } catch (error) {
//       setIsSubmiting(false);
//       // setTokenSession();
//       console.log("ERROR", error);
//       toast.error(error.message);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };
//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   const _onInputChange = (e) => {
//     const temp = { ...formData, [e.target.name]: e.target.value };
//     setFormData(temp);
//     setIsApproved(false);
//   };

//   const _onInputChange1 = (e) => {
//     const temp = { ...formData, [e.target.name]: e.target.files[0] };
//     setFormData(temp);

//     const delta = { [e.target.name]: e.target.files[0] };
//     // getBase64(delta, (result) => {
//     //   setBaseuri(result);
//     // });
//     // setBaseuri(URL.createObjectURL(e.target.files[0]));
//     setIsApproved(false);
//   };
//   const _onInputChangeFile = (e) => {
//     const temp = { ...formData, [e]: e };
//     setFormData(temp);
//     setIsApproved(false);
//   };

//   const _onSliderChange = (name, value) => {
//     const temp = { ...formData, [name]: value };
//     setFormData(temp);
//     setIsApproved(false);
//   };

//   useEffect(() => {
//     if (selectedFile && selectedFile !== "") {
//       selectXls();
//     }
//   }, [selectedFile]);

//   const selectXls = () => {
//     const file = selectedFile;
//     if (file) {
//       var fileReader = new FileReader();
//       fileReader.onload = function (event) {
//         var data = event.target.result;

//         var workbook = XLSX.read(data, {
//           type: "binary",
//         });

//         let rowObject = XLSX.utils.sheet_to_row_object_array(
//           workbook.Sheets[workbook.SheetNames[0]],
//           { raw: false }
//         );
//         let newData = [];
//         rowObject.forEach((data) => {
//           newData.push(data.address);
//         });
//         console.log("newData", newData);

//         setWhitelistAddressSheet(newData);
//       };
//       fileReader.readAsBinaryString(file);
//     }
//   }; //

//   // const addressAttachment = ({ meta }, status, files) => {
//   //   if (status === "done") {
//   //     const temp = { ...formData, frontPage: files };
//   //     console.log("---------", temp);
//   //     setAddressAttachment1(temp);
//   //   }
//   // };

//   const IdentityAttachments = ({ meta }, status, files) => {
//     if (status === "done") {
//       const temp = { ...formData, frontPage: files };
//       console.log("---------", temp);
//       setFormData(temp);
//     }
//   };

//   console.log("`121``1~!!@#11234____________________________", Baseuri);
//   const FaceAttachments = (e) => {
//     setImgBlob(URL.createObjectURL(e.target.files[0]));
//     getBase64(e.target.files[0], (result) => {
//       setBaseuri(result);
//       console.log("!@#$%^", result);
//     });
//   };

//   return (
//     <Box className={classes.bannerBox}>
//       <Box className={classes.textbox} mt={5} mb={5}>
//         <Typography variant="h2" align="center">
//           {/* Launchpad */}
//           ADD KYC
//         </Typography>
//       </Box>
//       <div className={classes.root}>
//         <Stepper activeStep={activeStep}>
//           <Step>
//             <StepLabel>
//               <Typography variant="h6" align="left">
//                 Personal Details
//               </Typography>
//               <Typography variant="caption">
//                 Enter the Personal details and upload id
//               </Typography>
//             </StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>
//               <Typography variant="h6" align="left">
//                 Address Details
//               </Typography>
//               <Typography variant="caption">
//                 Enter the address in details about person
//               </Typography>
//             </StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>
//               <Typography variant="h6" align="left">
//                 KYC Document
//               </Typography>
//               <Typography variant="caption">
//                 Let people know who you are
//               </Typography>
//             </StepLabel>
//           </Step>
//           <Step>
//             <StepLabel>
//               <Typography variant="h6" align="left">
//                 Finish
//               </Typography>
//               <Typography variant="caption">Review your information</Typography>
//             </StepLabel>
//           </Step>
//         </Stepper>
//         <div>
//           {activeStep === steps ? (
//             <Box my={3}>
//               <Typography
//                 className={classes.instructions}
//                 style={{ color: "#fff" }}
//               >
//                 All steps completed - Your KYC is apply successfully.
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 size="large"
//                 style={{ marginTop: "10px" }}
//                 onClick={handleReset}
//                 className={classes.button}
//               >
//                 Reset
//               </Button>
//             </Box>
//           ) : (
//             <div>
//               <Typography className={classes.instructions}>
//                 {getStepContent(
//                   activeStep,
//                   _onInputChange,
//                   _onInputChange1,
//                   _onInputChangeFile,
//                   maxDate,
//                   formData,
//                   isSubmit,
//                   _onSliderChange,
//                   IdentityAttachments,
//                   whiteListAddress,
//                   approveTokenAmount,
//                   tokenForLiquidity,
//                   tokenName,
//                   tokenSymbol,
//                   totalSupply,
//                   decimals,
//                   poolCreateFees,
//                   setSelectedFile,
//                   selectedFile,
//                   user,
//                   setfaceAttachment1,
//                   FaceAttachments,
//                   setImagesIdentity,
//                   setImgBlob,
//                   setBaseuri,
//                   setImagesAddress,
//                   setBaseuriAddress,
//                   imgBlob,
//                   Baseuri
//                 )}
//               </Typography>
//               {account && user.isLogin ? (
//                 <Container maxWidth="md">
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     size="large"
//                     style={{ marginRight: "7px" }}
//                     disabled={activeStep === 0 || isApproving || isSubmiting}
//                     onClick={handleBack}
//                     className={classes.button}
//                   >
//                     Back
//                   </Button>

//                   {/* {!isApproved && activeStep === steps - 1 && (
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={web3approveTokenHandler}
//                       disabled={isApproving || isApproved}
//                       style={{ marginRight: "7px" }}
//                     >
//                       Approve {isApproving && <ButtonCircularProgress />}
//                     </Button>
//                   )} */}
//                   {activeStep < 3 && (
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={handleNext}
//                       disabled={isApproving}
//                       style={{ marginRight: "7px" }}
//                     >
//                       Next
//                     </Button>
//                   )}
//                   {activeStep == steps - 1 && (
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={getTokenAddressDetails}
//                       disabled={isApproving || isSubmiting}
//                     >
//                       Create {isSubmiting && <ButtonCircularProgress />}
//                     </Button>
//                   )}
//                 </Container>
//               ) : (
//                 <Container maxWidth="md">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={user.connectWallet}
//                   >
//                     Connect Wallet
//                   </Button>
//                 </Container>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//       <Box mt={5}>
//         <Typography
//           variant="caption"
//           align="left"
//           style={{ fontSize: "14px", color: "#a09b9b" }}
//         >
//           Desclaimer: The information provided shall not in any way constitute a
//           recommendation as to whether you should invest in any product
//           discussed. We accept no liability for any loss occasioned to any
//           person acting or refraining from action as a result of any material
//           provided or published.
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// // STEPPER

// function getStepContent(
//   step,
//   _onInputChange,
//   _onInputChange1,
//   _onInputChangeFile,
//   formData,
//   isSubmit,
//   maxDate,
//   _onSliderChange,
//   Baseuri
// ) {
//   switch (step) {
//     case 0:
//       return (
//         <Container maxWidth="md">
//           <Box pb={2}>
//             <Grid spacing={4} container>
//               <Grid item xs={12} sm={6}>
//                 <Box my={1} className="mainBox">
//                   <label>*Fraud Check Id</label>
//                   <TextField
//                     id="outlined-basic"
//                     variant="outlined"
//                     // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
//                     fullWidth
//                     name="fraudCheckId"
//                     value={formData.fraudCheckId}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.fraudCheckId === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.fraudCheckId === "" &&
//                       "Please enter address"
//                     }
//                   />

//                   <small style={{ fontSize: "12px", color: "#a09b9b" }}>
//                     {/* Create pool fee:{poolCreateFees}BNB */}
//                   </small>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box my={1} className="mainBox">
//                   <label>*Wallet Address</label>
//                   <TextField
//                     id="outlined-basic"
//                     variant="outlined"
//                     // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
//                     fullWidth
//                     name="walletAddress"
//                     value={formData.walletAddress}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.walletAddress === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.walletAddress === "" &&
//                       "Please enter wallet address"
//                     }
//                   />

//                   <small style={{ fontSize: "12px", color: "#a09b9b" }}>
//                     {/* Create pool fee:{poolCreateFees}BNB */}
//                   </small>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box my={1} className="mainBox">
//                   <label>*First Name</label>
//                   <TextField
//                     id="outlined-basic"
//                     variant="outlined"
//                     // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
//                     fullWidth
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.firstName === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.firstName === "" &&
//                       "Please enter First Name"
//                     }
//                   />

//                   <small style={{ fontSize: "12px", color: "#a09b9b" }}>
//                     {/* Create pool fee:{poolCreateFees}BNB */}
//                   </small>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box my={1} className="mainBox">
//                   <label>*Last Name</label>
//                   <TextField
//                     id="outlined-basic"
//                     variant="outlined"
//                     // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
//                     fullWidth
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.lastName === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.lastName === "" &&
//                       "Please enter Last Name"
//                     }
//                   />

//                   <small style={{ fontSize: "12px", color: "#a09b9b" }}>
//                     {/* Create pool fee:{poolCreateFees}BNB */}
//                   </small>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box my={1} className="mainBox">
//                   <label>*Email</label>
//                   <TextField
//                     id="outlined-basic"
//                     variant="outlined"
//                     // placeholder="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
//                     fullWidth
//                     name="emailAddress"
//                     value={formData.emailAddress}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.emailAddress === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.emailAddress === "" &&
//                       "Please enter Email Address "
//                     }
//                   />

//                   <small style={{ fontSize: "12px", color: "#a09b9b" }}>
//                     {/* Create pool fee:{poolCreateFees}BNB */}
//                   </small>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box my={1} className="mainBox">
//                   <label>*Date of Birth</label>

//                   <TextField
//                     name="openTime"
//                     value={formData.openTime}
//                     onChange={_onInputChange}
//                     type="datetime-local"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="Token Public Sale Round 1"
//                     fullWidth
//                     // minDate={minDate ? minDate : new Date()}
//                     // maxDate={maxDate ? maxDate : null}
//                     inputProps={{
//                       max: moment(maxDate).format("YYYY-MM-DDTHH:mm"),
//                     }}
//                   />

//                   <small style={{ fontSize: "12px", color: "#a09b9b" }}>
//                     {/* Create pool fee:{poolCreateFees}BNB */}
//                   </small>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={12}>
//                 <Box
//                   // className={classes.boximg}
//                   style={{
//                     width: "100%",
//                     // height: "150px",
//                     minHeight: "100px",
//                     maxHeight: "300px",
//                     margin: "0 auto",
//                     position: "relative",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "hidden",
//                     border: "1px solid grey",
//                     // borderRadius: "50%",
//                   }}
//                   onChange={_onInputChange1}
//                 >
//                   {formData.faceAttachment12 && (
//                     <img
//                       src={
//                         formData.faceAttachment12
//                           ? URL.createObjectURL(formData.faceAttachment12)
//                           : "images/bit9.png"
//                       }
//                       alt=""
//                       style={{ width: "300px", height: "200px" }}
//                     />
//                   )}
//                   <input
//                     accept="image/*"
//                     style={{ display: "none", cursor: "pointer" }}
//                     id="raised-button-file-img"
//                     multiple
//                     type="file"
//                     name="faceAttachment12"
//                     onChange={_onInputChange1}
//                     error={isSubmit && formData.faceAttachment12 === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.faceAttachment12 === "" &&
//                       "Please enter Images "
//                     }
//                   />

//                   <label htmlFor="raised-button-file-img">
//                     <Box
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         left: "97px",
//                       }}
//                     >
//                       <PhotoCamera
//                         style={{ cursor: "pointer" }}
//                         htmlFor="raised-button-file-img"
//                         className="imgcontrol2"
//                         src="/images/vectoredit.png"
//                       />
//                     </Box>
//                   </label>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>
//       );
//     case 1:
//       return (
//         <Container maxWidth="md">
//           <Box mb={3} mt={3} className="mainBox">
//             <Grid spacing={4} container>
//               <Grid item xs={12} sm={6}>
//                 <Box mt={2}>
//                   <label>* Street Address</label>
//                   <TextField
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="Street Address"
//                     fullWidth
//                     name="streetAddress"
//                     value={formData.streetAddress}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.streetAddress === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.streetAddress === "" &&
//                       "Please enter Street Address"
//                     }
//                   />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box mt={2}>
//                   <label>City Name</label>
//                   <TextField
//                     type="name"
//                     name="cityName"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="City Name"
//                     fullWidth
//                     value={formData.cityName}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.cityName === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.streetAddress === "" &&
//                       "Please enter City Name"
//                     }
//                   />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>* State Name</label>
//                   <TextField
//                     type="name"
//                     name="stateName"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="State Name"
//                     fullWidth
//                     value={formData.stateName}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.stateName === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.stateName === "" &&
//                       "Please enter State Name"
//                     }
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>* Country Name</label>
//                   <TextField
//                     type="name"
//                     name="countryName"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="Country Name"
//                     fullWidth
//                     value={formData.countryName}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.countryName === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.countryName === "" &&
//                       "Please enter Country Name"
//                     }
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>* Nationality</label>
//                   <TextField
//                     type="name"
//                     name="nationality"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="Nationality"
//                     fullWidth
//                     value={formData.nationality}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.nationality === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.nationality === "" &&
//                       "Please enter Nationality Name"
//                     }
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>* Zip Code</label>
//                   <TextField
//                     type="number"
//                     name="zipCode"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="Zip Code"
//                     fullWidth
//                     value={formData.zipCode}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.zipCode === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.zipCode === "" &&
//                       "Please enter Zip Code"
//                     }
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={12} sm={12}>
//                 <Box>
//                   <label>* Address Attachment Type</label>
//                   {/*  */}
//                   <Select
//                     name="addressAttachmentType"
//                     value={formData.addressAttachmentType}
//                     onChange={_onInputChange}
//                     labelId="label"
//                     id="select"
//                     fullWidth
//                     error={isSubmit && formData.addressAttachmentType === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.addressAttachmentType === "" &&
//                       "Please select Address Attachment Type"
//                     }
//                   >
//                     <MenuItem value="ID_CARD">ID CARD</MenuItem>
//                     <MenuItem value="PASSPORT">PASSPORT</MenuItem>
//                     <MenuItem value="DRIVING_LICENSE">DRIVING LICENSE</MenuItem>
//                     <MenuItem value="UTILITY_BILL">UTILITY BILL</MenuItem>
//                     <MenuItem value="BANK_STATEMENT">BANK STATEMENT</MenuItem>
//                     <MenuItem value="RENT_AGREEMENT">REBT AGREEMENT</MenuItem>
//                     <MenuItem value="EMPLOYER_LETTER">EMPLOYER LRTTER</MenuItem>
//                     <MenuItem value="TAX_BILL">TAX BILL</MenuItem>
//                   </Select>
//                 </Box>
//               </Grid>

//               <Grid item xs={12} md={12}>
//                 <Box
//                   // className={classes.boximg}
//                   style={{
//                     width: "100%",
//                     // height: "150px",
//                     minHeight: "100px",
//                     maxHeight: "300px",
//                     margin: "0 auto",
//                     position: "relative",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "hidden",
//                     border: "1px solid grey",
//                     // borderRadius: "50%",
//                   }}
//                 >
//                   <img
//                     src={
//                       formData.identityAttachment12
//                         ? URL.createObjectURL(formData.identityAttachment12)
//                         : "images/bit9.png"
//                     }
//                     alt=""
//                     style={{ width: "300px", height: "300px" }}
//                   />
//                   <input
//                     accept="image/*"
//                     style={{ display: "none", cursor: "pointer" }}
//                     id="raised-button-file-img"
//                     multiple
//                     type="file"
//                     name="identityAttachment12"
//                     onChange={_onInputChange1}
//                   />

//                   <label htmlFor="raised-button-file-img">
//                     <Box
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         left: "97px",
//                       }}
//                     >
//                       <PhotoCamera
//                         style={{ cursor: "pointer" }}
//                         htmlFor="raised-button-file-img"
//                         className="imgcontrol2"
//                         src="/images/vectoredit.png"
//                       />
//                     </Box>
//                   </label>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>
//       );
//     case 2:
//       return (
//         <Container maxWidth="md">
//           <Box my={3} className="mainBox">
//             <Typography variant="h5"> KYC Docment</Typography>
//             <Grid spacing={4} container>
//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>Identity Document Number</label>
//                   {/* <TextField
//                     name="number"
//                     value={formData.identityDocumentNumber}
//                     onChange={_onInputChange}
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="id number"
//                     fullWidth
//                     error={isSubmit && formData.identityDocumentNumber === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.identityDocumentNumber === "" &&
//                       "Please select Address Attachment Type"
//                     }
//                   /> */}
//                   <TextField
//                     type="number"
//                     name="identityDocumentNumber"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="identityDocumentNumber"
//                     fullWidth
//                     value={formData.identityDocumentNumber}
//                     onChange={_onInputChange}
//                     error={isSubmit && formData.identityDocumentNumber === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.identityDocumentNumber === "" &&
//                       "Please enter Identity Document Number "
//                     }
//                     // format="DD/MM/yyyy hh:mm A"
//                     // minDate={moment(fromDate)}
//                   />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>Identity Document Issue Date</label>
//                   <TextField
//                     name="identityDocumentIssueDate"
//                     value={formData.identityDocumentIssueDate}
//                     onChange={_onInputChange}
//                     type="datetime-local"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="Identity Document Issue Date"
//                     fullWidth
//                     format="DD/MM/yyyy hh:mm A"
//                     // maxDate={moment(formData.identityDocumentExpiryDate)}
//                     inputProps={{
//                       min: moment(formData.identityDocumentIssueDate).format(
//                         "YYYY-MM-DDTHH:mm"
//                       ),
//                     }}
//                     // error={isSubmit && formData.identityDocumentIssueDate === ""}
//                     // helperText={
//                     //   isSubmit &&
//                     //   formData.identityDocumentIssueDate === "" &&
//                     //   "Please select Address Attachment Type"
//                     // }
//                   />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>Identity Document Expiry Date</label>
//                   <TextField
//                     name="closeTime"
//                     value={formData.identityDocumentExpiryDate}
//                     onChange={_onInputChange}
//                     type="datetime-local"
//                     id="outlined-basic"
//                     variant="outlined"
//                     placeholder="Identity Document Expiry Date"
//                     fullWidth
//                     format="DD/MM/yyyy hh:mm A"
//                     minDate={moment(formData.identityDocumentExpiryDate)}
//                     // inputProps={{
//                     //   min: moment(formData.identityDocumentExpiryDate).format(
//                     //     "YYYY-MM-DDTHH:mm"
//                     //   ),
//                     // }}
//                     // error={isSubmit && formData.investmentToken === ""}
//                     // helperText={
//                     //   isSubmit &&
//                     //   formData.investmentToken === "" &&
//                     //   "Please select Address Attachment Type"
//                     // }
//                   />
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <Box>
//                   <label>Identity Attachment Type</label>
//                   <Select
//                     name="identityAttachmentType"
//                     value={formData.identityAttachmentType}
//                     onChange={_onInputChange}
//                     labelId="label"
//                     id="select"
//                     fullWidth
//                     error={isSubmit && formData.identityAttachmentType === ""}
//                     helperText={
//                       isSubmit &&
//                       formData.identityAttachmentType === "" &&
//                       "Please select Address Attachment Type"
//                     }
//                   >
//                     <MenuItem value="ID_CARD">ID CARD</MenuItem>
//                     <MenuItem value="PASSPORT">PASSPORT</MenuItem>
//                     <MenuItem value="DRIVING_LICENSE">DRIVING LICENSE</MenuItem>
//                   </Select>
//                 </Box>
//               </Grid>

//               <Grid item xs={12} md={12}>
//                 <Box
//                   // className={classes.boximg}
//                   style={{
//                     width: "100%",
//                     // height: "150px",
//                     minHeight: "100px",
//                     maxHeight: "300px",
//                     margin: "0 auto",
//                     position: "relative",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     overflow: "hidden",
//                     border: "1px solid grey",
//                     // borderRadius: "50%",
//                   }}
//                   error={isSubmit && formData.addressAttachment12 === ""}
//                   helperText={
//                     isSubmit &&
//                     formData.addressAttachment12 === "" &&
//                     "Please enter Address Attachment "
//                   }
//                 >
//                   <img
//                     src={
//                       formData.addressAttachment12
//                         ? URL.createObjectURL(formData.addressAttachment12)
//                         : "images/bit9.png"
//                     }
//                     alt=""
//                     style={{ width: "300px", height: "300px" }}
//                   />
//                   <input
//                     accept="image/*"
//                     style={{ display: "none", cursor: "pointer" }}
//                     id="raised-button-file-img"
//                     multiple
//                     type="file"
//                     name="addressAttachment12"
//                     onChange={_onInputChange1}
//                   />

//                   <label htmlFor="raised-button-file-img">
//                     <Box
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         left: "97px",
//                       }}
//                     >
//                       <PhotoCamera
//                         style={{ cursor: "pointer" }}
//                         htmlFor="raised-button-file-img"
//                         className="imgcontrol2"
//                         src="/images/vectoredit.png"
//                       />
//                     </Box>
//                   </label>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </Container>
//       );

//     case 3:
//       return (
//         <Container maxWidth="md">
//           <Box my={3} className="mainBox">
//             <Box mb={3}>
//               <Typography variant="h5"> Confirm Details</Typography>
//             </Box>
//             <Container maxWidth="md">
//               <Grid container spacing={1}>
//                 <Grid item xs={12} sm={2}>
//                   <figure style={{ marginLeft: "0" }}>
//                     <img src="images/logo_2.png" alt=" " />
//                   </figure>
//                 </Grid>
//                 <Grid item xs={12} sm={10}>
//                   <Box>
//                     <Typography variant="h2"> {formData.saleTitle}</Typography>
//                     {formData.twitterURL !== "" && (
//                       <a
//                         href={formData.twitterURL}
//                         target="_blank"
//                         rel="noreferrer nofollow"
//                       >
//                         {" "}
//                         <TiSocialTwitterCircular
//                           style={{
//                             fontSize: "25px",
//                             color: "#fff",
//                             margin: "0 5px",
//                           }}
//                         />{" "}
//                       </a>
//                     )}
//                     {formData.telegramURL !== "" && (
//                       <a
//                         href={formData.telegramURL}
//                         target="_blank"
//                         rel="noreferrer nofollow"
//                       >
//                         {" "}
//                         <RiTelegramLine
//                           style={{
//                             fontSize: "25px",
//                             color: "#fff",
//                             margin: "0 15px 0 5px",
//                           }}
//                         />{" "}
//                       </a>
//                     )}
//                     {/* {formData.poocoinChartURL !== "" && (
//                   <a
//                     href={formData.poocoinChartURL}
//                     target='_blank'
//                     rel='noreferrer nofollow'
//                   >
//                     {" "}
//                     <img
//                       src='images/poocoin.png'
//                       style={{ width: "22px" }}
//                     />{" "}
//                   </a>
//                 )} */}
//                     {/* <Typography variant="body2">{formData.description}</Typography> */}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </Container>
//             {/* <table>
//               <tbody>
//                 <tr>
//                   <td>Token Name</td>
//                   <td class="has-text-right">{tokenName}</td>
//                 </tr>
//                 <tr>
//                   <td>Token Symbol</td>
//                   <td class="has-text-right">{tokenSymbol}</td>
//                 </tr>
//                 <tr>
//                   <td>Token Decimals</td>
//                   <td class="has-text-right">{decimals}</td>
//                 </tr>
//                 <tr>
//                   <td>Token Address</td>
//                   <td class="has-text-right">
//                     <a
//                       class="mr-1"
//                       href={`${explorerURL}/address/${formData.tokenAddress}`}
//                       target="_blank"
//                       rel="noreferrer nofollow"
//                     >
//                       {formData.tokenAddress}
//                     </a>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Total Supply</td>
//                   <td class="has-text-right">{totalSupply}</td>
//                 </tr>
//                 <tr>
//                   <td>Tokens For Presale</td>
//                   <td class="has-text-right">
//                     {Number(approveTokenAmount).toFixed(2)}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Tokens For Liquidity</td>
//                   <td class="has-text-right">
//                     {Number(tokenForLiquidity).toFixed(2)}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Presale Rate</td>
//                   <td class="has-text-right">
//                     1 {formData.investmentToken} = {formData.salePrice} &nbsp;
//                     ($
//                     {Number(user.usdPrice * formData.listingPrice).toFixed(2)})
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Listing Rate</td>
//                   <td class="has-text-right">
//                     1 {formData.investmentToken} = {formData.listingPrice}{" "}
//                     &nbsp;($
//                     {Number(user.usdPrice * formData.listingPrice).toFixed(2)})
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Soft Cap</td>
//                   <td class="has-text-right">{formData.softCap}</td>
//                 </tr>
//                 <tr>
//                   <td>Hard Cap</td>
//                   <td class="has-text-right">{formData.hardCap}</td>
//                 </tr>
//                 <tr>
//                   <td>Unsold Tokens</td>
//                   <td class="has-text-right">{formData.unsoldTokenAddress}</td>
//                 </tr>
//                 <tr>
//                   <td>Presale Start Time</td>
//                   <td class="has-text-right">
//                     {" "}
//                     {moment(formData.openTime).format("DD-MM-YYYY hh:mm:ss A")}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>Presale End Time</td>
//                   <td class="has-text-right">
//                     {" "}
//                     {moment(formData.closeTime).format("DD-MM-YYYY hh:mm:ss A")}
//                   </td>
//                 </tr>

//                 <tr>
//                   <td>Liquidity Percent</td>
//                   <td class="has-text-right">{formData.liquidityPercentage}</td>
//                 </tr>
//                 <tr>
//                   <td>Liquidity Unlocked Time</td>
//                   <td class="has-text-right">
//                     <a target="_blank" rel="noopener noreferrer" href={false}>
//                       {moment(formData.listingTime).format(
//                         "DD-MM-YYYY hh:mm:ss A"
//                       )}
//                     </a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table> */}
//           </Box>
//         </Container>
//       );
//     default:
//       return "Unknown step";
//   }
// }
