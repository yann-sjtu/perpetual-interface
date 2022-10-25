import { VStack, HStack, Container } from "@chakra-ui/react";
import { useState } from "react";

import OrderBookAndTrades from "./OrderBook";
import Chart from "./Charts";
import Position from "./Positions";
import Account from "./Account";
import StatsBar from "./StatsBar";
import MarketLists from "./MarketLists";
import Order from "./Orders";
import Deposit from "./Account/Deposit";
import Withdraw from "./Account/Withdraw";
import { Mode } from "../utils/types";
import { useWeb3React } from "@web3-react/core";

function ConnectView() {
  return (
    <Container>
      Connect your Ethereum wallet to deposit funds & start trading.
    </Container>
  );
}

function AccountView() {
  const { active } = useWeb3React();
  const [mode, setMode] = useState(Mode.Order);
  return (
    <VStack w="324px" align="left" h="100%">
      {active ? <Account switchMode={setMode} /> : <ConnectView />}
      {mode === Mode.Deposit ? (
        <Deposit switchMode={setMode} />
      ) : mode === Mode.Order ? (
        <Order />
      ) : (
        <Withdraw switchMode={setMode} />
      )}
    </VStack>
  );
}

export default function MainLayout() {
  return (
    <VStack align="stretch" w="100%" h="100%">
      {/*Nav*/}
      <HStack>
        <MarketLists />
        <StatsBar />
      </HStack>

      {/*Body*/}
      <HStack>
        <AccountView />
        <OrderBookAndTrades />

        {/*Chart*/}
        <VStack align="left" h="100%" w="100%">
          {/*Nav in Chart*/}
          <Chart />
          {/* Position */}
          <Position />
        </VStack>
      </HStack>
    </VStack>
  );
}
