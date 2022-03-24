import React, { createContext, useEffect, useState } from "react";
import { injected } from "../connectors";
import { useWeb3React } from "@web3-react/core";
import {
  ACTIVE_NETWORK,
  default_RPC_URL,
  factoryContractAdress,
  NetworkDetails,
} from "../constants/";
import { toast } from "react-toastify";
import Web3 from "web3";
import { getContract, getWeb3ContractObject, getWeb3Obj } from "src/utils";
import KingShibaIDOFactoryABI from "src/abis/KingShibaIDOFactoryABI.json";
import KingShibaIDOInfoABI from "src/abis/KingShibaIDOInfoABI.json";
import KingShibaIDOPresaleABI from "src/abis/KingShibaIDOPresaleABI.json";
import moment from "moment";
import axios from "axios";
import apiConfig, { socketURL } from "src/config/apiConfig";
import KingShibaStakingABI from "src/abis/KingShibaStakingABI.json";
import IERC20ABI from "src/abis/IERC20ABI.json";

export const UserContext = createContext();

const setSession = (userAddress) => {
  if (userAddress) {
    sessionStorage.setItem("userAddress", userAddress);
  } else {
    sessionStorage.removeItem("userAddress");
  }
};

const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
};

export default function AuthProvider(props) {
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [isLogin, setIsLogin] = useState(false);
  const [errorMsg] = useState("");
  const [userData, setUserData] = useState();
  const [connectwalletBalance, setConnectwalletBalance] = useState(0);
  const [numberOfPools, setNumberOfPools] = useState(0);
  const [poolList, setPoolList] = useState([]);
  const [userPoolList, setUserPoolList] = useState([]);
  const [livePoolList, setLivePoolList] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [stackingPoolList, setStackingPoolList] = useState([]);
  const [liveStakingPools, setLiveStakingPools] = useState([]);
  const [FinishedStakingPools, setFinishedStakingPools] = useState([]);
  const [stackContractListAPI, setStackContractListAPI] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  const [usdPrice, setUsdPrice] = useState(0);
  const [poolListAPI, setPoolListAPI] = useState([]);
  const [promoteList, setPromoteList] = useState([]);
  const [trendingPresaleList, setTrendingPresaleList] = useState([]);
  const [kingShibaPrice, setKingShibaPrice] = useState(0);
  const [pastPoolList, setPastPoolList] = useState([]);

  const getCurrentUSDPrice = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=wbnb&vs_currencies=usd"
      );
      if (res.status === 200) {
        setUsdPrice(res.data.wbnb.usd);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getCurrentUSDPrice();
  }, []);

  const trendingPresaleListHandler = async () => {
    try {
      const res = await axios.get(apiConfig.trendingPresaleList, {
        params: {
          limit: 10,
        },
      });
      if (res.data.statusCode === 200) {
        setTrendingPresaleList(res.data.result);
      } else {
        setTrendingPresaleList([]);
      }
    } catch (error) {
      setTrendingPresaleList([]);
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    trendingPresaleListHandler();
  }, []);

  const getKingShibaPrice = async () => {
    try {
      const res = await axios.get(
        "https://api.pancakeswap.info/api/v2/tokens/0x84f4f7cdb4574c9556a494dab18ffc1d1d22316c"
      );
      console.log("res", res);
      if (res.status === 200) {
        setKingShibaPrice(Number(res.data.data.price).toFixed(6));
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    getKingShibaPrice();
  }, []);

  useEffect(() => {
    if (account) {
      connectWalletAPICall();
      setWalletAddress(account);
    } else {
      setIsLogin(false);
      setTokenSession(null);
    }
  }, [account]);

  const connectWalletAPICall = async () => {
    try {
      const res = await axios.post(apiConfig.connectWallet, {
        walletAddress: account,
      });
      if (res.data.statusCode === 200) {
        setTokenSession(res.data.result.token);
        setIsLogin(true);
        setUserData(res.data.result);
      } else {
        toast.error(res.data.responseMessage);
        setTokenSession();
      }
    } catch (error) {
      setTokenSession();
      console.log("ERROR", error);
      toast.error(error.message);
    }
  };

  //NETWORK CHECK AND SWICH NETWORK

  useEffect(() => {
    if (account && chainId) {
      if (chainId !== ACTIVE_NETWORK) {
        if (window.ethereum) {
          swichNetworkHandler();
        }
      }
    }
  }, [chainId, account]);

  const swichNetworkHandler = async () => {
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

  const addNetworkHandler = async () => {
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

  const getUserbalce = async () => {
    var web3 = new Web3(library.provider);
    const balance = await web3.eth.getBalance(account);
    const balanceImETH = await web3.utils.fromWei(balance);
    setConnectwalletBalance(parseFloat(balanceImETH).toFixed(2));
  };

  useEffect(() => {
    if (account) {
      getUserbalce();
    }
  }, [account, library]);

  const connectToWallet = () => {
    try {
      activate(injected, undefined, true).catch((error) => {
        if (error) {
          console.log("ERROR", error);
          const errorMSG = error.message; //+ ' Please install Metamask';
          toast.warn(errorMSG);
          // alert(errorMSG);
          activate(injected);
        }
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const userAddress = window.sessionStorage.getItem("userAddress");
    if (userAddress) {
      data.connectWallet();
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    data.updateUser(account);
  }, [account]); //eslint-disable-line

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

  const poolListAPIHandler = async (cancelTokenSource) => {
    try {
      setPoolList([]);

      const res = await axios.get(apiConfig.presaleList);
      if (res.data.statusCode === 200) {
        const list = res.data.result;

        setPoolListAPI(list);
        const web3 = await getWeb3Obj(default_RPC_URL);
        for (let i = 0; i < list.length; i++) {
          const listData = list[i];
          if (listData.presaleAddress && listData.presaleAddress.length > 10) {
            const presaleAddressContractObj = new web3.eth.Contract(
              KingShibaIDOPresaleABI,
              listData.presaleAddress
            );

            const totalTokens = await presaleAddressContractObj.methods
              .totalTokens()
              .call();
            const totalCollectedWei = await presaleAddressContractObj.methods
              .totalCollectedWei()
              .call();
            const tokensLeft = await presaleAddressContractObj.methods
              .tokensLeft()
              .call();

            const ammLiquidityPercentageAllocation =
              await presaleAddressContractObj.methods
                .ammLiquidityPercentageAllocation()
                .call();

            const investmentToken = await presaleAddressContractObj.methods
              .investmentToken()
              .call();
            const tokenPriceInWei = await presaleAddressContractObj.methods
              .tokenPriceInWei()
              .call();

            const presaleCreatorAddress =
              await presaleAddressContractObj.methods
                .presaleCreatorAddress()
                .call();
            const softCapInWei = await presaleAddressContractObj.methods
              .softCapInWei()
              .call();

            const hardCapInWei = await presaleAddressContractObj.methods
              .hardCapInWei()
              .call();

            const token = await presaleAddressContractObj.methods
              .token()
              .call();

            const tokenObj = new web3.eth.Contract(IERC20ABI, token);

            const symbol = await tokenObj.methods.symbol().call();

            let obj = {
              ...listData,
              presaleCreatorAddress: presaleCreatorAddress,
              ammLiquidityPercentageAllocation:
                ammLiquidityPercentageAllocation,
              investmentToken: investmentToken,
              contractAddress: listData.presaleAddress,
              presaleAddress: listData.presaleAddress,
              saleTitle: listData.title,
              openTime: listData.startTime,
              closeTime: listData.endTime,
              token: token,
              symbol: symbol,
              softCapInWei: web3.utils.fromWei(softCapInWei, "ether"),
              hardCapInWei: web3.utils.fromWei(hardCapInWei, "ether"),
              totalTokens: web3.utils.fromWei(totalTokens, "ether"),
              tokenPriceInWei: web3.utils.fromWei(tokenPriceInWei, "ether"),
              totalCollectedWei: web3.utils.fromWei(totalCollectedWei, "ether"),
              tokensLeft: web3.utils.fromWei(tokensLeft, "ether"),
            };
            console.log("obj", obj);
            setPoolList((prev) => [...prev, obj]);
          }
        }
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    poolListAPIHandler(cancelTokenSource);
    getPromoteListhandler(cancelTokenSource);
    return () => {
      cancelTokenSource.cancel();
    };
  }, []);

  const poolListingData = async () => {
    const web3 = await getWeb3Obj(default_RPC_URL);
    setPoolList([]);
    try {
      const contract = new web3.eth.Contract(
        KingShibaIDOFactoryABI,
        factoryContractAdress
      );
      const poolDataListing = await contract.methods.KINGSHIBAIDO().call();
      const poolListingObj = new web3.eth.Contract(
        KingShibaIDOInfoABI,
        poolDataListing
      );
      const presalesCount = await poolListingObj.methods
        .getPresalesCount()
        .call();

      setNumberOfPools(presalesCount);
      for (var i = presalesCount - 1; i >= 0; i--) {
        var presaleAddress = await poolListingObj.methods
          .getPresaleAddress(i)
          .call();
        const presaleAddressContractObj = new web3.eth.Contract(
          KingShibaIDOPresaleABI,
          presaleAddress
        );

        const closeTime = await presaleAddressContractObj.methods
          .closeTime()
          .call();

        const saleTitle = await presaleAddressContractObj.methods
          .saleTitle()
          .call();
        const openTime = await presaleAddressContractObj.methods
          .openTime()
          .call();

        const totalTokens = await presaleAddressContractObj.methods
          .totalTokens()
          .call();
        const totalCollectedWei = await presaleAddressContractObj.methods
          .totalCollectedWei()
          .call();
        const tokensLeft = await presaleAddressContractObj.methods
          .tokensLeft()
          .call();

        const investmentToken = await presaleAddressContractObj.methods
          .investmentToken()
          .call();
        const presaleCreatorAddress = await presaleAddressContractObj.methods
          .presaleCreatorAddress()
          .call();

        let obj = {
          presaleCreatorAddress: presaleCreatorAddress,
          investmentToken: investmentToken,
          contractAddress: presaleAddress,
          presaleAddress: presaleAddress,
          saleTitle: web3.utils.hexToAscii(saleTitle),
          openTime: openTime,
          closeTime: closeTime,
          totalTokens: web3.utils.fromWei(totalTokens, "ether"),
          totalCollectedWei: web3.utils.fromWei(totalCollectedWei, "ether"),
          tokensLeft: web3.utils.fromWei(tokensLeft, "ether"),
        };
        setPoolList((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  useEffect(() => {
    // poolListingData();
  }, []);

  // USER POOLS
  useEffect(() => {
    if (account) {
      const list = poolList.filter(
        (data) => data.presaleCreatorAddress == account
      );
      setUserPoolList(list);
    }
  }, [poolList, account]);

  // Live POOLS
  useEffect(() => {
    const list = poolList.filter(
      (data) =>
        Number(data.closeTime) > moment().unix() &&
        Number(data.openTime) < moment().unix()
    );
    setLivePoolList(list);
  }, [poolList]);

  // past POOLS
  useEffect(() => {
    const list = poolList.filter(
      (data) =>
        Number(data.closeTime) < moment().unix() &&
        Number(data.openTime) < moment().unix()
    );
    setPastPoolList(list);
  }, [poolList]);

  const getStackingListAPIHandler = async () => {
    try {
      const res = await axios.get(apiConfig.stackingList, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        let dataList = res.data.result;
        const key = "createdAddress";
        const arrayUniqueByKey = [
          ...new Map(dataList.map((item) => [item[key], item])).values(),
        ];
        setStackContractListAPI(arrayUniqueByKey);
      }
    } catch (error) {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    getStackingListAPIHandler();
  }, []);

  const getStakingListBlockChainHandler = async () => {
    const web3 = await getWeb3Obj();
    for (let i = 0; i < stackContractListAPI.length; i++) {
      try {
        const stackContractDataAPI = stackContractListAPI[i];
        const ERCobjRewardAddress = await getWeb3ContractObject(
          IERC20ABI,
          stackContractListAPI[i]?.rewardAddress
        );

        const rewardTokenName = await ERCobjRewardAddress.methods.name().call();

        const ERCobjStackAddress = await getWeb3ContractObject(
          IERC20ABI,
          stackContractListAPI[i]?.stackAddress
        );
        const stakedTokenName = await ERCobjStackAddress.methods.name().call();

        const stackContractobj = await getWeb3ContractObject(
          KingShibaStakingABI,
          stackContractListAPI[i]?.createdAddress
        );
        const rewardPerBlock = await stackContractobj.methods
          .rewardPerBlock()
          .call();

        const startBlock = await stackContractobj.methods.startBlock().call();
        const bonusEndBlock = await stackContractobj.methods
          .bonusEndBlock()
          .call();
        let pendingReward = 0;
        let userInfo = undefined;

        if (account) {
          pendingReward = await stackContractobj.methods
            .pendingReward(account)
            .call();
          userInfo = await stackContractobj.methods.userInfo(account).call();
        }
        console.log("rewardPerBlock", rewardPerBlock);
        let obj = {
          ...stackContractDataAPI,
          startBlock: Number(startBlock),
          bonusEndBlock: Number(bonusEndBlock),
          rewardPerBlock: Number(rewardPerBlock),
          APY: Math.ceil(
            web3.utils.fromWei(
              Number((Number(rewardPerBlock) * 10 ** 6) / 9.6450617).toString()
            )
          ),
          pendingReward: Number(web3.utils.fromWei(pendingReward.toString())),
          stakedTokenName: stakedTokenName,
          rewardTokenName: rewardTokenName,
          stakedToken: stackContractListAPI[i].stackAddress,
          rewardToken: stackContractListAPI[i].rewardAddress,
          createdAddress: stackContractListAPI[i].createdAddress,
          rewardDebt: userInfo
            ? Number(web3.utils.fromWei(userInfo.rewardDebt.toString()))
            : 0,
          userInfo: userInfo,
        };
        console.log("obj===>>>", obj);
        setStackingPoolList((prev) => [...prev, obj]);
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  };
  useEffect(() => {
    if (stackContractListAPI.length > 0) {
      getStakingListBlockChainHandler();
    }
  }, [stackContractListAPI]);

  //setLiveStakingPools

  const getLiveStakingHandler = async () => {
    try {
      const web3 = await getWeb3Obj();
      var block = await web3.eth.getBlock("latest");
      const liveStak = stackingPoolList.filter(
        (data) =>
          Number(data.bonusEndBlock) >= block?.number &&
          Number(data.startBlock) <= block?.number
      );
      setLiveStakingPools(liveStak);
    } catch (err) {
      console.log(err);
    }
  };

  //setFinishedStakingPools
  const getExpiredPoolList = async () => {
    try {
      const web3 = await getWeb3Obj();
      var block = await web3.eth.getBlock("latest");
      const finishedStak = stackingPoolList.filter(
        (data) => Number(data.bonusEndBlock) < block?.number
      );
      setFinishedStakingPools(finishedStak);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getExpiredPoolList();
    getLiveStakingHandler();
  }, [stackingPoolList]);

  // NOTIFICATION

  useEffect(() => {
    const web = new WebSocket(socketURL);
    const accessToken = sessionStorage.getItem("token");
    if (accessToken && account) {
      try {
        web.onopen = () => {
          const dataToSend = {
            option: "notification",
            token: accessToken,
          };
          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);
              if (obj.data && obj.data.length > 0) {
                setNotificationList(obj.data);
                setUnreadCount(obj.unReadCount);
              } else {
                setNotificationList([]);
                setUnreadCount(0);
              }
            }
          };
        };
        return () => {
          setNotificationList();
          setUnreadCount(0);
          web.close();
        };
      } catch (err) {}
    }
  }, [isLogin]);

  let data = {
    isLogin,
    promoteList,
    walletAddress,
    errorMsg,
    userData,
    numberOfPools,
    poolList,
    connectwalletBalance,
    userPoolList,
    livePoolList,
    liveStakingPools,
    stackingPoolList,
    FinishedStakingPools,
    unreadCount,
    notificationList,
    usdPrice,
    poolListAPI,
    trendingPresaleList,
    kingShibaPrice,
    pastPoolList,
    trendingPresaleListHandler: () => trendingPresaleListHandler(),
    getPromoteListhandler: () => getPromoteListhandler(),
    getStackingListAPIHandler: () => getStackingListAPIHandler(),
    getStakingListBlockChainHandler: () => getStakingListBlockChainHandler(),
    updateUser: (account) => {
      setSession(account);
    },
    connectWallet: (data) => connectToWallet(data),
    poolListingData: () => poolListAPIHandler(),
    logoutHanlder: () => {
      setUserData();
      setIsLogin(false);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("walletName");
      deactivate();
    },
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
