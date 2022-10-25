import { AbstractConnector } from "@web3-react/abstract-connector";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import WalletModal from "../WalletModal";
import { shortenAddress } from "../../utils";
import CoinbaseWalletIcon from "../../assets/images/coinbaseWalletIcon.svg";
import PortisIcon from "../../assets/images/portisIcon.png";
import WalletConnectIcon from "../../assets/images/walletConnectIcon.svg";
import { injected, portis, walletconnect, walletlink } from "../../connectors";
import { useDisclosure } from "@chakra-ui/react";

import { Button, Text } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return <img src={WalletConnectIcon} alt={"WalletConnect"} />;
  } else if (connector === walletconnect) {
    return <img src={WalletConnectIcon} alt={"WalletConnect"} />;
  } else if (connector === walletlink) {
    return <img src={CoinbaseWalletIcon} alt={"CoinbaseWallet"} />;
  } else if (connector === portis) {
    return <img src={PortisIcon} alt={"Portis"} />;
  }
  return null;
}

function Web3StatusInner({
  toggleWalletModal,
}: {
  toggleWalletModal: () => void;
}) {
  const { account, connector, error } = useWeb3React();

  if (account) {
    return (
      <Button id="web3-status-connected" onClick={toggleWalletModal}>
        {
          <>
            <Text>{shortenAddress(account)}</Text>
          </>
        }
        {connector && <StatusIcon connector={connector} />}
      </Button>
    );
  } else if (error) {
    return (
      <Button onClick={toggleWalletModal}>
        <Text>
          {error instanceof UnsupportedChainIdError ? "Wrong Network" : "Error"}
        </Text>
      </Button>
    );
  } else {
    return (
      <Button id="connect-wallet" onClick={toggleWalletModal}>
        <Text>Connect to a wallet</Text>
      </Button>
    );
  }
}

export default function Web3Status() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Web3StatusInner toggleWalletModal={onOpen} />
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
