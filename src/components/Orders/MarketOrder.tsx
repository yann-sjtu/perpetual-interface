import {
  Text,
  Input,
  Button,
  Box,
  Tag,
  InputGroup,
  InputRightElement,
  Divider,
  HStack,
  VStack,
  AccordionItem,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  Select,
} from "@chakra-ui/react";

import { useState } from "react";

import RadioButton from "../RadioButton";

function Advanced() {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Advanced
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack align="stretch">
            <Text textAlign="left">Time in Force</Text>
            <Select defaultValue="option1">
              <option value="option1">Good Till Time</option>
              <option value="option2">Fill Or Kill</option>
              <option value="option3">Immediate Or Cancel</option>
            </Select>
            <HStack>
              <Input pr="4.5rem" defaultValue="28" />
              <Select defaultValue="option3">
                <option value="option1">Mins</option>
                <option value="option2">Hours</option>
                <option value="option3">Days</option>
                <option value="option3">Weeks</option>
              </Select>
            </HStack>

            <Text textAlign="left">Execution</Text>
            <Checkbox>Post-Only</Checkbox>
            <Checkbox>Reduce-Only</Checkbox>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default function MarketOrder() {
  const [isBuy, setBuy] = useState(false);
  return (
    <VStack align="left">
      <RadioButton setBuy={setBuy} />
      <Text textAlign="left">Amount</Text>

      <HStack>
        {/* Enter Amount in ETH */}
        <InputGroup size="md">
          <Input pr="4.5rem" placeholder="0.0000" />
          <InputRightElement width="4.5rem">
            <Tag>ETH</Tag>
          </InputRightElement>
        </InputGroup>

        {/* Enter Amount in USD */}
        <InputGroup size="md">
          <Input pr="4.5rem" placeholder="0.0000" />
          <InputRightElement width="4.5rem">
            <Tag>ETH</Tag>
          </InputRightElement>
        </InputGroup>
      </HStack>

      <Text textAlign="left">
        Limit Price <Tag>USD</Tag>
      </Text>
      <Input placeholder="0.0000" maxLength={42} />

      <Divider />
      <Advanced />
      <Button>Place Order</Button>
    </VStack>
  );
}
