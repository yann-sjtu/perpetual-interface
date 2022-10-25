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
import { Mode } from "../../utils/types";
import axios from "axios";
import { ethers, BigNumber } from "ethers";
import { PerpetualV1__factory, MockToken__factory } from "../../typechain";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updatePosition } from "../../state/accountSlice";

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const PERPETUAL_PROXY_ADDR = process.env.REACT_APP_PerpetualProxyAddr;
const MOCKTOKEN_ADDR = process.env.REACT_APP_MockTokenAddr;

export default function Deposit(props: { switchMode: (mode: Mode) => void }) {
  const { library, account, activate, deactivate, active } = useWeb3React();
  const dispatch = useAppDispatch();
  if (!account) {
    throw new Error(`connect to wallet first`);
  }
  const [amount, setAmount] = useState("0");

  const deposit = async (amount: string) => {
    const iface = PerpetualV1__factory.createInterface();
    // check balance before deposit, if not enough token,
    // request airdrop from faucet. only used in test environment
    const mockToken = MockToken__factory.connect(
      MOCKTOKEN_ADDR as string,
      library
    );
    const balance = await mockToken.balanceOf(account);
    if (balance.lt(amount)) {
      const residual = BigNumber.from(amount).sub(balance);
      await axios.post(`http://${SERVER_HOST}:${SERVER_PORT}/account/v1/drop`, {
        amount: residual.toString(),
        account,
      });
    }

    // check allowance
    const data = iface.encodeFunctionData("deposit", [account, amount]);
    await library
      .getSigner()
      .sendTransaction({ to: PERPETUAL_PROXY_ADDR, data });
    // dispatch(updatePosition({position: '', weight: ''}));
  };

  const approve = async () => {
    const iface = MockToken__factory.createInterface();
    const max = ethers.constants.MaxUint256;
    const data = iface.encodeFunctionData("approve", [
      PERPETUAL_PROXY_ADDR as string,
      max,
    ]);
    await library.getSigner().sendTransaction({ to: MOCKTOKEN_ADDR, data });
  };
  return (
    <>
      <VStack align="left">
        <HStack>
          <Heading size="lg">Deposit</Heading>
          <Spacer />
          <CloseButton
            onClick={() => props.switchMode(Mode.Order)}
          ></CloseButton>
        </HStack>
        <Text align="left">Asset</Text>
        <Select defaultValue="option1">
          <option value="option1">USD Coin</option>
          <option value="option2">Tether</option>
          <option value="option3">DAI</option>
        </Select>
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
          <Text>
            Available<Tag>USDC</Tag>
          </Text>
          <Spacer />
          <Text>0.0000</Text>
        </HStack>
        <VStack>
          <Heading size="md">Enable USDC on dYdX</Heading>
          <Text>
            You must enable USDC the first time you deposit on dYdX. You will
            only have to do this once.
          </Text>
          <Button onClick={() => approve()}>Enable USDC</Button>
        </VStack>
        <Button onClick={() => deposit(amount)}>Confirm deposit</Button>
      </VStack>

      <VStack></VStack>
    </>
  );
}
