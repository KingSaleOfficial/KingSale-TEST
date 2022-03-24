export const NetworkContextName = "Kovan Test Network";
export const ACTIVE_NETWORK = 97;
export const deadAddress = "0x0000000000000000000000000000000000000000";
export const textDeadAddress =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const factoryContractAdress =
  "0x0aAd5dDdeee80530FA59bE9672A92D109e1E4bAC";
export const liquidityLockerAddress =
  "0x742eAAE138e7B0980f91fB9D0716Ee6F163775cd";

export const BUSDTokenAddress = "0x21783C0Ce32e1859F6bccC6e575Ae6019765e443";
export const USDTTokenAddress = "0x54f6719302106a7462cbea1318b515b2d3ec8456";
export const maxPromote = 10;
export const default_RPC_URL =
  "https://data-seed-prebsc-1-s2.binance.org:8545/";

export const explorerURL = "https://testnet.bscscan.com";
export const tokenCreatorFees = "500000000000000000";

export const NetworkDetails = [
  {
    chainId: "0x61",
    chainName: "Smart Chain Network",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s2.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
];

export const getPromoteFees = (days) => {
  switch (days.toString()) {
    case "1":
      return 0.1;
    case "2":
      return 0.2;
    case "3":
      return 0.3;
  }
};
