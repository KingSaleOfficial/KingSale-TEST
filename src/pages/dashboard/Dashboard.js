import React from "react";
import Banner from "./Banner";
import TokenSales from "./TokenSales";
import HomeCoins from "./HomeCoins";
import KingstakePools from "./KingstakePools";
export default function Dashboard(props) {
  // const history = useHistory();
  return (
    <>
      <Banner />
      <HomeCoins />
      <TokenSales/>
      <KingstakePools/>
    </>
  );
}
