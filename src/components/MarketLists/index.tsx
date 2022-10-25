import {
  HStack,
  Image,
  Text,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import ethIcon from "../../assets/svg/eth.svg";

export default function MarketLists() {
  return (
    <HStack w="324px">
      <Image boxSize="24px" src={ethIcon}></Image>
      <Text>ETH-USD</Text>
      <Spacer />
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          All Markets
        </MenuButton>
        <MenuList>
          <MenuItem>Ethereum ETH</MenuItem>
          <MenuItem>Bitcoin BTC</MenuItem>
          <MenuItem>Solana SOL</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
