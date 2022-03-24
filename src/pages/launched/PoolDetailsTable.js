import { getWeb3ContractObject, getWeb3Obj } from "src/utils";
import React, { useState, useEffect } from "react";
import IERC20ABI from "../../abis/IERC20ABI.json";
import moment from "moment";
import { deadAddress, explorerURL, USDTTokenAddress } from "src/constants";
export default function PoolDetailsTable({
  allWeiValues,
  staticTextData,
  staticData,
  poolData,
  presaleAddress,
  user,
  presaleBalanceOf,
  settotalSupplyParent,
}) {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, settotalSupply] = useState(0);
  const [decimals, setDecimals] = useState(0);

  const getTokenAddressDetails = async () => {
    try {
      const contract = await getWeb3ContractObject(IERC20ABI, staticData.token);
      const web3 = await getWeb3Obj();
      const decimals = await contract.methods.decimals().call();
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      const totalSupply = await contract.methods.totalSupply().call();
      settotalSupply(web3.utils.fromWei(totalSupply.toString()));
      settotalSupplyParent(web3.utils.fromWei(totalSupply.toString()));
      setTokenSymbol(symbol);
      setTokenName(name);
      setDecimals(decimals);
      console.log("contract", contract);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (staticData && staticData.token) {
      getTokenAddressDetails();
    }
  }, [staticData]);

  return (
    <table>
      <tbody>
        <tr>
          <td>Presale Address</td>
          <td class='has-text-right'>
            <a
              href={`${explorerURL}/address/${presaleAddress}`}
              target='_blank'
              rel='noreferrer nofollow'
            >
              {presaleAddress}
            </a>
          </td>
        </tr>
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
              href={`${explorerURL}/address/${staticData?.token}`}
              target='_blank'
              rel='noreferrer nofollow'
            >
              {staticData?.token}
            </a>
          </td>
        </tr>
        {poolData?.investmentToken && (
          <tr>
            <td>Investment Token</td>
            <td class='has-text-right'>
              <a
                class='mr-1'
                href={`${explorerURL}/address/${poolData?.investmentToken}`}
                target='_blank'
                rel='noreferrer nofollow'
              >
                {poolData?.investmentToken === deadAddress
                  ? "BNB"
                  : poolData?.investmentToken === USDTTokenAddress
                  ? "USDT"
                  : "BUSD"}
              </a>
            </td>
          </tr>
        )}
        <tr>
          <td>Total Supply</td>
          <td class='has-text-right'>{totalSupply}</td>
        </tr>
        <tr>
          <td>Tokens For Presale</td>
          <td class='has-text-right'>
            {allWeiValues?.hardCapInWei && allWeiValues?.tokenPriceInWei
              ? allWeiValues?.hardCapInWei / allWeiValues?.tokenPriceInWei
              : 0}
          </td>
        </tr>
        <tr>
          <td>Tokens Left</td>
          <td class='has-text-right'>
            {allWeiValues?.tokensLeft ? allWeiValues?.tokensLeft : 0}
          </td>
        </tr>
        <tr>
          <td>Tokens For Liquidity</td>
          <td class='has-text-right'>
            {allWeiValues?.hardCapInWei &&
            poolData?.ammLiquidityPercentageAllocation &&
            allWeiValues?.ammListingPriceInWei
              ? (allWeiValues?.hardCapInWei *
                  poolData?.ammLiquidityPercentageAllocation) /
                100 /
                allWeiValues?.ammListingPriceInWei
              : 0}
          </td>
        </tr>
        <tr>
          <td>Presale Rate</td>
          <td class='has-text-right'>
            1 BNB = {1 / allWeiValues?.tokenPriceInWei} {tokenSymbol}&nbsp;($
            {allWeiValues?.tokenPriceInWei
              ? Number(user.usdPrice * allWeiValues?.tokenPriceInWei).toFixed(2)
              : null}
            )
          </td>
        </tr>
        <tr>
          <td>Listing Rate</td>
          <td class='has-text-right'>
            1 BNB = {1 / allWeiValues?.ammListingPriceInWei} {tokenSymbol}
            &nbsp;($
            {allWeiValues?.ammListingPriceInWei
              ? Number(
                  user.usdPrice * allWeiValues?.ammListingPriceInWei
                ).toFixed(2)
              : null}
            )
          </td>
        </tr>
        <tr>
          <td>Soft Cap</td>
          <td class='has-text-right'>{allWeiValues?.softCapInWei}</td>
        </tr>
        <tr>
          <td>Hard Cap</td>
          <td class='has-text-right'>{allWeiValues?.hardCapInWei}</td>
        </tr>
        <tr>
          <td>Unsold Tokens</td>
          <td class='has-text-right'>
            {allWeiValues?.tokenPriceInWei && allWeiValues?.totalCollectedWei
              ? presaleBalanceOf -
                allWeiValues?.totalCollectedWei / allWeiValues?.tokenPriceInWei
              : 0}
          </td>
        </tr>
        <tr>
          <td>Presale Start Time</td>
          <td class='has-text-right'>
            {moment(staticData?.openTime * 1000).format("DD-MM-YYYY hh:mm A")}
          </td>
        </tr>
        <tr>
          <td>Presale End Time</td>
          <td class='has-text-right'>
            {moment(staticData?.closeTime * 1000).format("DD-MM-YYYY hh:mm A")}
          </td>
        </tr>

        <tr>
          <td>Liquidity Percent</td>
          <td class='has-text-right'>
            {poolData?.ammLiquidityPercentageAllocation}%
          </td>
        </tr>
        <tr>
          <td>Liquidity Unlocked Time</td>
          <td class='has-text-right'>
            <a target='_blank' rel='noopener noreferrer' href={false}>
              {moment(staticData?.ammLiquidityAddingTime * 1000).format(
                "DD-MM-YYYY hh:mm A"
              )}
            </a>
          </td>
        </tr>
        {/* <tr>
          <td>Total Team Vesting Tokens</td>
          <td class="has-text-right">100,000,000,000,000 UNIMOON</td>
        </tr> */}
        {/* <tr>
          <td>Team Vesting Release Time</td>
          <td class="has-text-right">2021.12.25 17:57 UTC</td>
        </tr> */}
        {/* <tr>
          <td>First Release After Listing (days)</td>
          <td class="has-text-right">45 days</td>
        </tr> */}
        {/* <tr>
          <td>First Release For Team</td>
          <td class="has-text-right">10%</td>
        </tr> */}
        {/* <tr>
          <td>Tokens release each cycle</td>
          <td class="has-text-right">15% each 15 days</td>
        </tr> */}
      </tbody>
    </table>
  );
}
