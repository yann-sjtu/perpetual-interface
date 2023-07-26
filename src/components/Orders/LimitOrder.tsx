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
  Heading,
  VStack,
  AccordionItem,
  Tooltip,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  CloseButton,
  useDisclosure,
  IconButton,
  Select,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";

import { useWeb3React } from "@web3-react/core";
import { useState } from "react";

import { WarningIcon } from "@chakra-ui/icons";

import RadioButton from "../RadioButton";
import { signPlaceOrder } from "../../utils/utils";

function AmountToolTipLabel() {
  return (
    <Box>
      <h2>Order Amount</h2>
      <Text>
        Amount of ETH to buy or sell. This is the amount your position will
        increase or decrease by when the order is filled, not your resulting
        position amount.
      </Text>
    </Box>
  );
}

function LimitPriceToolTipLabel() {
  return (
    <Box>
      <h2>Limit Price</h2>
      <Text>
        This order can only be filled at the specified limit price or better. If
        your order crosses at the time of placement, your order will fill any
        crossing orders at the most favorable price.
      </Text>
    </Box>
  );
}

function FeeToolTipLabel() {
  return (
    <Box>
      <h2>Fee</h2>
      <Text>
        Fees on dYdX are charged based on liquidity type. Maker orders carry a
        smaller fee than taker orders.
      </Text>
    </Box>
  );
}

function Details() {
  const { isOpen, onToggle } = useDisclosure();
  if (isOpen) {
    return (
      <>
        <HStack>
          <h2>Details</h2>
          <Spacer />
          <CloseButton onClick={onToggle} />
        </HStack>
        <HStack>
          <Text>Fee Percent</Text>
          <Spacer />
          <Text>-</Text>
        </HStack>
      </>
    );
  }
  return (
    <HStack align="right">
      <Spacer />
      <IconButton
        variant="unstyled"
        aria-label="waring"
        icon={<WarningIcon />}
        onClick={onToggle}
      ></IconButton>
    </HStack>
  );
}

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

export default function LimitOrder() {
  const { library, account, activate, deactivate, active } = useWeb3React();
  const [orderArgs, setOrderArgs] = useState({ price: "0", size: "0" });
  const [isBuy, setBuy] = useState(false);
  const placeOrder = async () => {
    const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
    const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
    const baseUrl = `http://${SERVER_HOST}:${SERVER_PORT}`;
    const url = `${baseUrl}/order`;

    // step1:
    console.log('account是地址：', account!)
    const paramStr = `?maker=${account}&isBuy=${isBuy}&amount=${orderArgs.size}&limitPrice=${orderArgs.price}`;

    const constructOrder = await axios.get(url + paramStr);
    console.log("res:", constructOrder.data)
    const orderBytes = constructOrder.data.order
    const encodeHash = `0x${constructOrder.data.hash}`;

    // step2:
    const signature = await signPlaceOrder(
      encodeHash,
      { ...orderArgs, account: account!, isBuy },
      library
    );
    console.log('签名：', signature);

    // step3:
    const url2 = `${baseUrl}/placeorder`;
    const res = await axios.get(`${url2}?signedOrder=${orderBytes}${signature.substring(2)}`);
  };
  return (
    <VStack align="left">
      <RadioButton setBuy={setBuy} />
      <Tooltip label={AmountToolTipLabel()}>
        <Text textAlign="left" fontSize="xs">
          Amount Set order size
        </Text>
      </Tooltip>

      <HStack>
        {/* Enter Amount in ETH */}
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="0.0000"
            onChange={(e) => {
              setOrderArgs({ ...orderArgs, size: e.currentTarget.value });
            }}
          />
          <InputRightElement width="4.5rem">
            <Tag>ETH</Tag>
          </InputRightElement>
        </InputGroup>

        {/* Enter Amount in USD */}
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            placeholder="0.0000"
            onChange={(e) => {
              setOrderArgs({ ...orderArgs, size: e.currentTarget.value });
            }}
          />
          <InputRightElement width="4.5rem">
            <Tag>USD</Tag>
          </InputRightElement>
        </InputGroup>
      </HStack>

      <Tooltip label={LimitPriceToolTipLabel()}>
        <Text textAlign="left" fontSize="xs">
          Limit Price <Tag size="xs">USD</Tag>
        </Text>
      </Tooltip>
      <Input
        placeholder="0.0000"
        maxLength={42}
        onChange={(e) => {
          setOrderArgs({ ...orderArgs, price: e.currentTarget.value });
        }}
      />

      <Advanced />
      <Details />
      <HStack>
        <Tooltip label={FeeToolTipLabel()}>
          <Text>
            Fee <Tag>taker</Tag>
          </Text>
        </Tooltip>
        <Spacer />
        <Text>-</Text>
      </HStack>
      <HStack>
        <Text>Total</Text>
        <Spacer />
        <Text>-</Text>
      </HStack>
      <Button onClick={placeOrder}>Place Limit Order</Button>
    </VStack>
  );
}
