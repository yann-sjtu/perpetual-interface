import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
} from "@chakra-ui/react";

import Payments, { Payment } from "./Payments";
import Fills, { Fill } from "./Fills";
import Orders, { Order } from "./Orders";
import TotalPosition from "./Position";

export default function Position() {
  const payments: Payment[] = [];
  const fills: Fill[] = [];
  const orders: Order[] = [];
  return (
    <Tabs h="100%">
      <TabList>
        <Tab>Position</Tab>
        <Tab>Orders</Tab>
        <Tab>Fills</Tab>
        <Tab>Payments</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <TotalPosition />
        </TabPanel>
        <TabPanel>
          <Orders orders={orders} />
        </TabPanel>
        <TabPanel>
          <Fills fills={fills} />
        </TabPanel>
        <TabPanel>
          <Payments payments={payments} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
