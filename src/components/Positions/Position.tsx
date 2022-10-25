import { HStack, VStack, Text, Spacer, Box, Tag } from "@chakra-ui/react";

export default function Position() {
  return (
    <HStack>
      <VStack w="50%">
        <Box>
          <Tag>None</Tag>
        </Box>
        <HStack>
          <VStack>
            <Text>Leverage</Text>
            <Text>-</Text>
          </VStack>
          <VStack>
            <Text>Liquidation Price</Text>
            <Text>-</Text>
          </VStack>
        </HStack>
      </VStack>
      <VStack>
        <HStack>
          <Text>Average Open</Text>
          <Spacer />
          <Text>-</Text>
        </HStack>
        <HStack>
          <Text>Average Close</Text>
          <Spacer />
          <Text>-</Text>
        </HStack>
        <HStack>
          <Text>Net Funding</Text>
          <Spacer />
          <Text>-</Text>
        </HStack>
      </VStack>
    </HStack>
  );
}
