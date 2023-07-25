import { useWeb3React } from "@web3-react/core";
import {
  Modal,
  UseModalProps,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Button,
  HStack,
  Text,
  Image,
  ModalContent,
} from "@chakra-ui/react";
import { SUPPORTED_WALLETS } from "../../constants/wallet";

export default function WalletModal({ isOpen, onClose }: UseModalProps) {
  const { activate } = useWeb3React();
  function getOptions() {
    const option = SUPPORTED_WALLETS["METAMASK"];
    return (
      <VStack>
        <Button
          variant="outline"
          onClick={async () => {
            activate(option.connector);
            onClose();

            if (window.ethereum) {
              try {
                await (window.ethereum as any).request({
                  method: 'wallet_switchEthereumChain',
                  params: [{
                    chainId: "0x5a2" // 目标链ID
                  }]
                })
                console.log('wallet_switchEthereumChain');
              } catch (e) {
                console.log('(e as any).code', (e as any).code);
                if ((e as any).code === 4902) {
                  try {
                    console.log('wallet_addEthereumChain Switch');
                    await (window.ethereum as any).request({
                        method: 'wallet_addEthereumChain',
                        params: [
                          {
                            chainId: "0x5a2", // 目标链ID
                            chainName: 'Polygon zkEVM Testnet',
                            nativeCurrency: {
                              name: 'ETH',
                              symbol: 'ETH',
                              decimals: 18
                            },
                            rpcUrls: ['https://rpc.public.zkevm-test.net'], // 节点
                            blockExplorerUrls: ['https://explorer.public.zkevm-test.net']
                          }
                        ]
                      })
                  } catch (ee) {
                    //
                    console.log('catch', ee);
                  }
                } else if ((e as any).code === 4001) return
              }
            }
          }}
          w="100%"
        >
          <HStack w="100%" justifyContent="center">
            <Image
              src={option.iconURL}
              alt="Metamask Logo"
              width={25}
              height={25}
              borderRadius="3px"
            />
            <Text>Metamask</Text>
          </HStack>
        </Button>
      </VStack>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent w="300px">
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: "none",
          }}
        />
        <ModalBody paddingBottom="1.5rem">{getOptions()}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
