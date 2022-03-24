import React, { useState, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { swichNetworkHandler } from "src/utils";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK, explorerURL, tokenCreatorFees } from "src/constants";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import { toast } from "react-toastify";
import ReflectionTokenABI from "src/abis/ReflectionToken/ReflectionTokenABI.json";
import { ReflectionTokenData } from "src/abis/ReflectionToken/ReflectionTokenData";
import Web3 from "web3";
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
}));

export const uploadContractHandler = async (
  account,

  formData,
  cb
) => {
  const web3 = (window.web3 = new Web3(window.ethereum));
  var nfttokenContract = new web3.eth.Contract(ReflectionTokenABI);

  await nfttokenContract
    .deploy({
      data: ReflectionTokenData,
      arguments: [
        web3.utils.toWei(formData.totalSupply.toString()),
        formData.taxFee.toString(),
        formData.liquidityFee.toString(),
        formData.burnFee.toString(),
        formData.marketingFee.toString(),
        web3.utils.toWei(formData.maxTransfer.toString()),
        web3.utils.toWei(formData.numberOfTokens.toString()),
      ],
    })
    .send(
      {
        from: account,
        gas: "6540692",
        value: tokenCreatorFees,
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

function Roadmap() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account, chainId } = useWeb3React();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    totalSupply: "",
    taxFee: "",
    liquidityFee: "",
    burnFee: "",
    marketingFee: "",
    maxTransfer: "",
    numberOfTokens: "",
  });

  const _onInputChange = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.value };
    setFormData(temp);
  };

  const submitHandler = async () => {
    if (ACTIVE_NETWORK == chainId) {
      setIsSubmit(true);
      try {
        if (
          formData.totalSupply !== "" &&
          formData.taxFee !== "" &&
          formData.liquidityFee !== "" &&
          formData.burnFee !== "" &&
          formData.marketingFee !== "" &&
          formData.maxTransfer !== "" &&
          formData.numberOfTokens !== "" &&
          Number(formData.totalSupply) > 0 &&
          Number(formData.taxFee) > 0 &&
          Number(formData.liquidityFee) > 0 &&
          Number(formData.burnFee) > 0 &&
          Number(formData.marketingFee) > 0 &&
          Number(formData.maxTransfer) > 0 &&
          Number(formData.numberOfTokens) > 0
        ) {
          console.log("DATA", formData);
          setIsUpdating(true);
          await uploadContractHandler(
            account,

            formData,
            (result) => {
              if (result.status && result.address) {
                console.log(`${explorerURL}/address/${result.address}`);
                // window.open(`${explorerURL}/address/${result.address}`);
                toast.success("Success");
              } else {
              }
            }
          );
        } else {
          toast.error("Wrong combination");
        }
        setIsUpdating(false);
      } catch (error) {
        setIsUpdating(false);
        console.log("ERROR", error);
      }
    } else {
      swichNetworkHandler();
    }
  };

  return (
    // <Page title="GainPool">
    <Box pt={3} pb={6}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Typography variant='h1'> Mint your own token!</Typography>
          <Grid spacing={4} container>
            <Grid item xs={12} sm={6}>
              <Box mt={2}>
                <label>Total supply (excluding decimals e.g. 100 tokens)</label>
                <TextField
                  inputProps={{ readOnly: isUpdating }}
                  type='number'
                  name='totalSupply'
                  value={formData.totalSupply}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    (formData.totalSupply === "" ||
                      Number(formData.totalSupply) <= 0)
                  }
                  helperText={
                    isSubmit && formData.totalSupply === ""
                      ? "Please enter total supply"
                      : isSubmit && Number(formData.totalSupply) <= 0
                      ? "Please enter valid data"
                      : null
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Total supply'
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box mt={2}>
                <label>Tax Fee</label>
                <TextField
                  inputProps={{ readOnly: isUpdating }}
                  type='number'
                  name='taxFee'
                  value={formData.taxFee}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    (formData.taxFee === "" || Number(formData.taxFee) <= 0)
                  }
                  helperText={
                    isSubmit && formData.taxFee === ""
                      ? "Please enter data"
                      : isSubmit && Number(formData.taxFee) <= 0
                      ? "Please enter valid data"
                      : null
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Total supply'
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <label>Liquidity Fee</label>
                <TextField
                  inputProps={{ readOnly: isUpdating }}
                  type='number'
                  name='liquidityFee'
                  value={formData.liquidityFee}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    (formData.liquidityFee === "" ||
                      Number(formData.liquidityFee) <= 0)
                  }
                  helperText={
                    isSubmit && formData.liquidityFee === ""
                      ? "Please enter data"
                      : isSubmit && Number(formData.liquidityFee) <= 0
                      ? "Please enter valid data"
                      : null
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Total supply'
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <label>Burn Fee</label>
                <TextField
                  inputProps={{ readOnly: isUpdating }}
                  type='number'
                  name='burnFee'
                  value={formData.burnFee}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    (formData.burnFee === "" || Number(formData.burnFee) <= 0)
                  }
                  helperText={
                    isSubmit && formData.burnFee === ""
                      ? "Please enter data"
                      : isSubmit && Number(formData.burnFee) <= 0
                      ? "Please enter valid data"
                      : null
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Total supply'
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <label>Marketing Fee</label>
                <TextField
                  inputProps={{ readOnly: isUpdating }}
                  type='number'
                  name='marketingFee'
                  value={formData.marketingFee}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    (formData.marketingFee === "" ||
                      Number(formData.marketingFee) <= 0)
                  }
                  helperText={
                    isSubmit && formData.marketingFee === ""
                      ? "Please enter data"
                      : isSubmit && Number(formData.marketingFee) <= 0
                      ? "Please enter valid data"
                      : null
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Total supply'
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box>
                <label>Max Transfer Amount</label>
                <TextField
                  inputProps={{ readOnly: isUpdating }}
                  type='number'
                  name='maxTransfer'
                  value={formData.maxTransfer}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    (formData.maxTransfer === "" ||
                      Number(formData.maxTransfer) <= 0)
                  }
                  helperText={
                    isSubmit && formData.maxTransfer === ""
                      ? "Please enter data"
                      : isSubmit && Number(formData.maxTransfer) <= 0
                      ? "Please enter valid data"
                      : null
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Total supply'
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box mb={2}>
                <label>Number of tokens sell to add liquidity</label>
                <TextField
                  inputProps={{ readOnly: isUpdating }}
                  type='number'
                  name='numberOfTokens'
                  value={formData.numberOfTokens}
                  onChange={_onInputChange}
                  error={
                    isSubmit &&
                    (formData.numberOfTokens === "" ||
                      Number(formData.numberOfTokens) <= 0)
                  }
                  helperText={
                    isSubmit && formData.numberOfTokens === ""
                      ? "Please enter data"
                      : isSubmit && Number(formData.numberOfTokens) <= 0
                      ? "Please enter valid data"
                      : null
                  }
                  id='outlined-basic'
                  variant='outlined'
                  placeholder='Total supply'
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
          <Box>
            {" "}
            <label>Total supply (including decimals - raw amount) = 0</label>
          </Box>
          <Box mt={1}>
            {" "}
            <label>Fee: 0.5 BNB</label>
          </Box>
          <Box mt={1} mb={3}>
            {" "}
            {/* <label>+ 0.2% total supply</label> */}
          </Box>
          <Box align='center'>
            {account && user.isLogin ? (
              <Button
                className={classes.mint}
                variant='contained'
                size='large'
                color='primary'
                onClick={submitHandler}
                disabled={isUpdating}
              >
                MINT A NEW TOKEN {isUpdating && <ButtonCircularProgress />}
              </Button>
            ) : (
              <Button
                className={classes.mint}
                variant='contained'
                size='large'
                color='secondary'
                onClick={user.connectWallet}
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
    // </Page>
  );
}

export default Roadmap;
