export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  BSC = 56,
  OKC = 66,
  OKCTest = 65,
  PolygonzkEVMTestnet = 1442,
  POLYGON = 137,
  // LOCAL = 31337,
  LOCAL = 67,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,

  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.BSC,
  SupportedChainId.OKC,
  SupportedChainId.OKCTest,
  SupportedChainId.PolygonzkEVMTestnet,
  SupportedChainId.LOCAL,
  SupportedChainId.POLYGON,
];

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.BSC,
  SupportedChainId.OKC,
  SupportedChainId.OKCTest,
  SupportedChainId.LOCAL,
] as const;

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number];

export const L2_CHAIN_IDS = [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.POLYGON,
  SupportedChainId.PolygonzkEVMTestnet,
] as const;

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number];

interface L1ChainInfo {
  readonly docs: string;
  readonly explorer: string;
  readonly infoLink: string;
  readonly label: string;
}
export interface L2ChainInfo extends L1ChainInfo {
  readonly bridge: string;
  readonly logoUrl: string;
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo;
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo };

export const CHAIN_INFO: Partial<ChainInfo> = {
  [SupportedChainId.MAINNET]: {
    docs: "https://docs.uniswap.org/",
    explorer: "https://etherscan.io/",
    infoLink: "https://info.uniswap.org/#/",
    label: "Mainnet",
  },
};
