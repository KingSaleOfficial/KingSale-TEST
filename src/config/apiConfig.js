const baseurl = "https://node-kyle.mobiloitte.com";
const user = `${baseurl}/api/v1/user`;
const admin = `${baseurl}/api/v1/admin`;
const kyc = `${baseurl}/api/v1/kyc`;
const sniffer = `${baseurl}/api/v1/sniffer`;

const contract = `${baseurl}/api/v1/contract`;
const notification = `${baseurl}/api/v1/notification`;
export const socketURL = "wss://node-kyle.mobiloitte.com";
const apiConfig = {
  connectWallet: `${user}/connectWallet`,
  addPresale: `${user}/addPresale`,
  createStacking: `${user}/createStacking`,
  stackingList: `${user}/stackingList`,
  uploadKYC: `${kyc}/uploadKYC`,
  listKYC: `${kyc}/kycList`,
  presaleList: `${user}/presaleList`,
  upVotePresale: `${user}/upVotePresale`,
  downVotePresale: `${user}/downVotePresale`,
  viewPresale: `${user}/viewPresale/`,
  viewStacking: `${user}/viewStacking/`,
  addLiquidityLocker: `${user}/addLiquidityLocker`,
  liquidityLockerList: `${user}/liquidityLockerList`,
  addTokenLocker: `${user}/addTokenLocker`,
  tokenLockerList: `${user}/tokenLockerList`,
  promoteList: `${user}/promoteList`,
  approvePresaleUser: `${user}/approvePresale`,
  trendingPresaleList: `${user}/trendingPresaleList`,

  humanSummary: `${contract}/humanSummary`,
  liquidityScan: `${contract}/liquidityScan`,
  getVulnerabilitiesList: `${contract}/getVulnerabilitiesList`,
  holderScan: `${contract}/holderScan`,
  addContract: `${contract}/addContract`,
  contractList: `${contract}/contractList`,
  auditReport: `${contract}/auditReport`,
  contractIssueList: `${contract}/contractIssueList`,

  kycListAdmin: `${admin}/kycList`,
  approveKyc: `${admin}/approveKyc`,
  rejectKyc: `${admin}/rejectKyc`,
  presaleListAdmin: `${admin}/presaleList`,

  viewKyc: `${kyc}/viewKyc`,
  approvePresale: `${admin}/approvePresale`,
  readNotification: `${notification}/readNotification`,

  buySellBSCFeePercentage: `${sniffer}/buySellBSCFeePercentage`,
  BSCgetEstimateGasPrice: `${sniffer}/BSCgetEstimateGasPrice`,
};

export default apiConfig;
