import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

import LimitOrder from "./LimitOrder";
import MarketOrder from "./MarketOrder";

export default function Order() {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Limit</Tab>
          <Tab>Market</Tab>
          <Tab>Stop</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <LimitOrder />
          </TabPanel>
          <TabPanel>
            <MarketOrder />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
