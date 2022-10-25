import { Tabs, TabList, Tab, TabPanel, TabPanels, Box } from "@chakra-ui/react";
import OrderBook from "./OrderBook";
import TradesHistory from "./TradesHistory";

export default function OrderBookAndTrades() {
  return (
    <Box h="100%">
      <Tabs w="324px">
        <TabList>
          <Tab w="50%">Book</Tab>
          <Tab w="50%">Trades</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <OrderBook />
          </TabPanel>
          <TabPanel>
            <TradesHistory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
