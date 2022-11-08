import {
  HStack,
  Text,
  Spacer,
  ButtonGroup,
  Button,
  Flex,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Mode } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { updatePosition, selectPosition } from "../../state/accountSlice";

const SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;
const PERPETUAL_PROXY_ADDR = process.env.REACT_APP_PerpetualProxyAddr;
if (typeof SERVER_PORT === "undefined") {
  throw new Error(
    `REACT_APP_SERVER_PORT must be a defined environment variable`
  );
}
if (typeof PERPETUAL_PROXY_ADDR === "undefined") {
  throw new Error(
    `PERPETUAL_PROXY_ADDR must be a defined environment variable`
  );
}

export default function Account(props: { switchMode: (mode: Mode) => void }) {
  const { account } = useWeb3React();
  const dispatch = useAppDispatch();
  const accountInfo = useAppSelector(selectPosition);

  useEffect(() => {
    const fetchAccountBalance = async () => {
      const url = `http://${SERVER_HOST}:${SERVER_PORT}/position?addr=${account}`;
      const res = await axios.get(url);
      const margin = res.data.margin;
      const position = res.data.position;
      dispatch(
        updatePosition({ margin: margin, position: position })
      );
    };
    if (account) {
      fetchAccountBalance();
    }
  }, [account, dispatch]);

  return (
    <>
      <HStack>
        <Text>Account</Text>
        <Spacer />
        <ButtonGroup gap="2">
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => props.switchMode(Mode.Deposit)}
          >
            Deposit
          </Button>
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => props.switchMode(Mode.Withdraw)}
          >
            Withdraw
          </Button>
        </ButtonGroup>
      </HStack>
      <Flex>
        <Box>
          <Text>Buying Power</Text>
        </Box>
        <Spacer />
        <Box>
          <Text>$0.00</Text>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Text>Equity</Text>
        </Box>
        <Spacer />
        <Box>
          <Text>$0.00</Text>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Text>Margin Usage</Text>
        </Box>
        <Spacer />
        <Box>
          <Text>$0.00</Text>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Text>Account Leverage</Text>
        </Box>
        <Spacer />
        <Box>
          <Text>$0.00</Text>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Text>Margin</Text>
        </Box>
        <Spacer />
        <Box>
          <Text>${accountInfo.margin}</Text>
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Text>Position</Text>
        </Box>
        <Spacer />
        <Box>
          <Text>${accountInfo.position}</Text>
        </Box>
      </Flex>
    </>
  );
}
