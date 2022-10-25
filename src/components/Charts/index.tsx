import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  HStack,
  VStack,
  Spacer,
  Tag,
  Box,
} from "@chakra-ui/react";

export default function Chart() {
  return (
    <Tabs h="100%" w="100%">
      <TabList>
        <Tab>Price</Tab>
        <Tab>Depth</Tab>
        <Tab>Funding</Tab>
        <Tab>Details</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
        <TabPanel>
          <HStack>
            <Box w="50%">
              <Text>
                Ethereum is a decentralized blockchain platform founded in 2014.
                Ethereum is an open-source project that is not owned or operated
                by a single individual. This means that anyone, anywhere can
                download the software and begin interacting with the network.
                Ethereum allows developers to make and operate 'smart
                contracts', a core piece of infrastructure for any decentralized
                application.
              </Text>
            </Box>
            <VStack align="left">
              <HStack>
                <Text>Market Name</Text>
                <Spacer />
                <Text>ETH-USD</Text>
              </HStack>
              <HStack>
                <Text>Tick Size</Text>
                <Spacer />
                <Text>$0.1</Text>
              </HStack>
              <HStack>
                <Text>Step Size</Text>
                <Spacer />
                <Text>
                  0.0001<Tag>ETH</Tag>
                </Text>
              </HStack>
              <HStack>
                <Text>Minimum Order Size</Text>
                <Spacer />
                <Text>
                  0.010<Tag>ETH</Tag>
                </Text>
              </HStack>
              <HStack>
                <Text>Maximum Leverage</Text>
                <Spacer />
                <Text>20.00×</Text>
              </HStack>
              <HStack>
                <Text>Maintenance Margin Fraction</Text>
                <Spacer />
                <Text>0.0300</Text>
              </HStack>
              <HStack>
                <Text>Initial Margin Fraction</Text>
                <Spacer />
                <Text>0.0500</Text>
              </HStack>
              <HStack>
                <Text>Incremental Initial Margin Fraction</Text>
                <Spacer />
                <Text>0.0100</Text>
              </HStack>
              <HStack>
                <Text>Incremental Position Size</Text>
                <Spacer />
                <Text>
                  100.000<Tag>ETH</Tag>
                </Text>
              </HStack>
              <HStack>
                <Text>Baseline Position Size</Text>
                <Spacer />
                <Text>
                  500.000<Tag>ETH</Tag>
                </Text>
              </HStack>
              <HStack>
                <Text>Maximum Position Size</Text>
                <Spacer />
                <Text>
                  10,000.000<Tag>ETH</Tag>
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
