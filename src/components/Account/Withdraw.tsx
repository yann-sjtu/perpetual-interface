import {
  VStack,
  HStack,
  Spacer,
  CloseButton,
  Select,
  Tag,
  Text,
  Heading,
  InputGroup,
  Input,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { Mode } from "../../utils/types";
import axios from "axios";
import { ethers, BigNumber } from "ethers";
import { PerpetualV1__factory, MockToken__factory } from "../../typechain";
import { selectPosition } from "../../state/accountSlice";

const PERPETUAL_PROXY_ADDR = process.env.REACT_APP_PerpetualProxyAddr;

export default function Withdraw(props: { switchMode: (mode: Mode) => void }) {
  const { library, account, activate, deactivate, active } = useWeb3React();
  const position = useAppSelector(selectPosition);
  const [amount, setAmount] = useState("0");

  if (!account) {
    throw new Error(`connect to wallet first`);
  }

  /* 
  * withdraw-调用合约
  */
  const withdraw = async (amount: string) => {
    const iface = PerpetualV1__factory.createInterface();
    const data = iface.encodeFunctionData("withdraw", [
      account,
      account,
      amount,
    ]);
    await library
      .getSigner()
      .sendTransaction({ to: PERPETUAL_PROXY_ADDR, data });
  };

  return (
    <>
      <VStack align="left">
        <HStack>
          <Heading size="lg">Withdraw</Heading>
          <Spacer />
          <CloseButton
            onClick={() => props.switchMode(Mode.Order)}
          ></CloseButton>
        </HStack>
        <Text align="left">Asset</Text>
        <Select defaultValue="option1">
          <option value="option1">
            USD Coin<Tag>USDC</Tag>
          </option>
          <option value="option2">
            Tether<Tag>USDT</Tag>
          </option>
          <option value="option3">
            DAI<Tag>DAI</Tag>
          </option>
        </Select>
        <VStack>
          <Text align="left">Amount</Text>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              placeholder="0.0000"
              onChange={(e) => setAmount(e.currentTarget.value)}
            />
            <InputRightElement width="4.5rem">
              <Button>MAX</Button>
            </InputRightElement>
          </InputGroup>
          <HStack>
            <Text>Free Collateral</Text>
            <Spacer />
            <Text>$0.00</Text>
          </HStack>
          <HStack>
            <Text>Max Withdraw</Text>
            <Spacer />
            <Text>$200,000.00</Text>
          </HStack>
        </VStack>
      </VStack>

      <VStack align="left">
        <HStack>
          <Text>Fee</Text> <Spacer /> <Text>-</Text>
        </HStack>
        <HStack>
          <Text>Total</Text> <Spacer /> <Text>-</Text>
        </HStack>
        <HStack>
          <Text>
            Wallet<Tag>USDC</Tag>
          </Text>{" "}
          <Spacer /> <Text>${position.erc20Balance}</Text>
        </HStack>
        <Button onClick={() => withdraw(amount)}>Confirm withdraw</Button>
      </VStack>
    </>
  );
}
