import React, { useState, useContext } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { UserContext } from "src/context/User";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { ACTIVE_NETWORK, explorerURL, tokenCreatorFees } from "src/constants";
import ButtonCircularProgress from "src/components/Loaders/ButtonCircularProgress";
import { toast } from "react-toastify";
import MintBurnWithoutOwnerABI from "src/abis/TokenCreator/MintBurnWithoutOwnerABI.json";
import MinterABI from "src/abis/TokenCreator/MinterABI.json";
import MinterBurnableABI from "src/abis/TokenCreator/MinterBurnableABI.json";
import MintWithoutOwnerABI from "src/abis/TokenCreator/MintWithoutOwnerABI.json";
import { MintBurnWithoutOwnerData } from "src/abis/TokenCreator/MintBurnWithoutOwnerData";
import { MinterData } from "src/abis/TokenCreator/MinterData";
import { MinterBurnableData } from "src/abis/TokenCreator/MinterBurnableData";
import { MintWithoutOwnerData } from "src/abis/TokenCreator/MintWithoutOwnerData";
import { swichNetworkHandler } from "src/utils";

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    padding: "30px",
  },
}));

export const uploadContractHandler = async (
  account,
  ABI,
  deployData,
  formData,
  cb
) => {
  const web3 = (window.web3 = new Web3(window.ethereum));
  var nfttokenContract = new web3.eth.Contract(ABI);

  await nfttokenContract
    .deploy({
      data: deployData,
      arguments: [
        formData.tokenName,
        formData.tokenSymbol,
        web3.utils.toWei(formData.totalSupply.toString()).toString(),
      ],
    })
    .send(
      {
        from: account,
        gas: "5000000",
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

const getABIDeployData = (state) => {
  if (state.burnable && state.owner && !state.minting) {
    return {
      ABI: MinterABI,
      deployData: MinterData,
    };
  } else if (state.minting && state.owner && !state.burnable) {
    return {
      ABI: MinterBurnableABI,
      deployData: MinterBurnableData,
    };
  } else if (state.minting && !state.burnable && !state.owner) {
    return {
      ABI: MintWithoutOwnerABI,
      deployData: MintWithoutOwnerData,
    };
  } else if (state.burnable && !state.minting && !state.owner) {
    return {
      ABI: MintBurnWithoutOwnerABI,
      deployData: MintBurnWithoutOwnerData,
    };
  } else {
    return {
      ABI: false,
      deployData: false,
    };
  }
};

function Roadmap() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const { account, chainId } = useWeb3React();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [state, setState] = useState({
    minting: true,
    burnable: false,
    owner: false,
  });
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    totalSupply: "",
    decimals: "18",
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const _onInputChange = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.value };
    setFormData(temp);
  };

  const submitHandler = async () => {
    if (ACTIVE_NETWORK == chainId) {
      setIsSubmit(true);
      try {
        if (
          formData.tokenName !== "" &&
          formData.tokenSymbol !== "" &&
          formData.totalSupply !== "" &&
          formData.decimals !== "" &&
          Number(formData.totalSupply) > 0 &&
          Number(formData.decimals) > 0
        ) {
          setIsUpdating(true);
          const { ABI, deployData } = getABIDeployData(state);
          if (ABI && deployData) {
            await uploadContractHandler(
              account,
              ABI,
              deployData,
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
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <Box mt={2}>
            <Typography variant='h1'> Mint your own token!</Typography>
            <Grid spacing={4} container>
              <Grid item xs={12} sm={4}>
                <Box mt={2}>
                  <FormControlLabel
                    disabled={state.burnable || isUpdating}
                    control={
                      <Checkbox
                        disabled={state.burnable || isUpdating}
                        checked={state.minting}
                        onChange={handleChange}
                        name='minting'
                      />
                    }
                    label='Minting'
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box mt={2}>
                  <FormControlLabel
                    disabled={state.minting || isUpdating}
                    control={
                      <Checkbox
                        disabled={state.minting || isUpdating}
                        checked={state.burnable}
                        onChange={handleChange}
                        name='burnable'
                      />
                    }
                    label='Minting Burnable'
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box mt={2}>
                  <FormControlLabel
                    disabled={isUpdating}
                    control={
                      <Checkbox
                        disabled={isUpdating}
                        checked={state.owner}
                        onChange={handleChange}
                        name='owner'
                      />
                    }
                    label='Renounce Owner'
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <label>Token Name</label>
                  <TextField
                    inputProps={{ readOnly: isUpdating }}
                    name='tokenName'
                    value={formData.tokenName}
                    onChange={_onInputChange}
                    error={isSubmit && formData.tokenName === ""}
                    helperText={
                      isSubmit &&
                      formData.tokenName === "" &&
                      "Please enter name"
                    }
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
                    inputProps={{ readOnly: isUpdating }}
                    name='tokenSymbol'
                    value={formData.tokenSymbol}
                    onChange={_onInputChange}
                    error={isSubmit && formData.tokenSymbol === ""}
                    helperText={
                      isSubmit &&
                      formData.tokenSymbol === "" &&
                      "Please enter symbol"
                    }
                    id='outlined-basic'
                    variant='outlined'
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <label>
                    Total supply (excluding decimals e.g. 100 tokens)
                  </label>
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
                <Box>
                  <label>Decimals (18 reccomended)</label>
                  <TextField
                    inputProps={{ readOnly: isUpdating }}
                    type='number'
                    name='decimals'
                    value={formData.decimals}
                    // onChange={_onInputChange}
                    error={
                      isSubmit &&
                      (formData.decimals === "" ||
                        Number(formData.decimals) <= 0)
                    }
                    helperText={
                      isSubmit && formData.decimals === ""
                        ? "Please enter decimals"
                        : isSubmit && Number(formData.decimals) <= 0
                        ? "Please enter valid data"
                        : null
                    }
                    id='outlined-basic'
                    variant='outlined'
                    placeholder='Total supply'
                    fullWidth
                  />
                </Box>
                <span>Total supply (including decimals - raw amount) = 0</span>
              </Grid>
            </Grid>
            <Box mt={1}>
              {" "}
              <label>Fee: 0.5 BNB</label>
            </Box>
            {/* <Box>
              {' '}
              <label>Total supply (including decimals - raw amount) = 0</label>
            </Box>
           
            <Box mt={1} mb={3}>
              {' '}
              <label>+ 0.2% total supply</label>
            </Box> */}
            <Box align='center' mt={3}>
              {account && user.isLogin ? (
                <Button
                  className={classes.mint}
                  variant='contained'
                  size='large'
                  color='secondary'
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
          </Box>
        </Grid>
      </Grid>
    </Box>
    // </Page>
  );
}

export default Roadmap;
