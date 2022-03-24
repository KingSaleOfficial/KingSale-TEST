import { Contract } from "@ethersproject/contracts";
import { toast } from "react-toastify";
import Web3 from "web3";
import { ACTIVE_NETWORK, default_RPC_URL, NetworkDetails } from "../constants/";
export function sortAddress(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
    return sortAdd;
  } else {
    return add;
  }
}

export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export const getWeb3Obj = async (RPC_URL = default_RPC_URL) => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = await new Web3(httpProvider);
  return web3;
};

export const getWeb3ContractObject = async (
  abi,
  contractAddress,
  RPC_URL = default_RPC_URL
) => {
  const web3 = await getWeb3Obj(RPC_URL);
  const contract = await new web3.eth.Contract(abi, contractAddress);
  return contract;
};

export function copyTextById(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  toast.info(`Copied ${copyText.value}`);
}

export const swichNetworkHandler = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x" + ACTIVE_NETWORK.toString(16) }],
    });
  } catch (error) {
    console.log("ERROR", error);
    toast.warn(error.message);
    if (error.code === 4902) {
      addNetworkHandler();
    }
  }
};

export const addNetworkHandler = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: NetworkDetails,
    });
  } catch (error) {
    console.log("ERROR", error);
    toast.warn(error.message);
  }
};
