/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace P1Types {
  export type BalanceStruct = {
    marginIsPositive: PromiseOrValue<boolean>;
    positionIsPositive: PromiseOrValue<boolean>;
    margin: PromiseOrValue<BigNumberish>;
    position: PromiseOrValue<BigNumberish>;
  };

  export type BalanceStructOutput = [boolean, boolean, BigNumber, BigNumber] & {
    marginIsPositive: boolean;
    positionIsPositive: boolean;
    margin: BigNumber;
    position: BigNumber;
  };

  export type IndexStruct = {
    timestamp: PromiseOrValue<BigNumberish>;
    isPositive: PromiseOrValue<boolean>;
    value: PromiseOrValue<BigNumberish>;
  };

  export type IndexStructOutput = [number, boolean, BigNumber] & {
    timestamp: number;
    isPositive: boolean;
    value: BigNumber;
  };
}

export declare namespace P1Trade {
  export type TradeArgStruct = {
    takerIndex: PromiseOrValue<BigNumberish>;
    makerIndex: PromiseOrValue<BigNumberish>;
    trader: PromiseOrValue<string>;
    data: PromiseOrValue<BytesLike>;
  };

  export type TradeArgStructOutput = [BigNumber, BigNumber, string, string] & {
    takerIndex: BigNumber;
    makerIndex: BigNumber;
    trader: string;
    data: string;
  };
}

export interface PerpetualV1Interface extends utils.Interface {
  functions: {
    "deposit(address,uint256)": FunctionFragment;
    "enableFinalSettlement(uint256,uint256)": FunctionFragment;
    "getAccountBalance(address)": FunctionFragment;
    "getAccountIndex(address)": FunctionFragment;
    "getAdmin()": FunctionFragment;
    "getFinalSettlementEnabled()": FunctionFragment;
    "getFunderContract()": FunctionFragment;
    "getGlobalIndex()": FunctionFragment;
    "getIsGlobalOperator(address)": FunctionFragment;
    "getIsLocalOperator(address,address)": FunctionFragment;
    "getMinCollateral()": FunctionFragment;
    "getOracleContract()": FunctionFragment;
    "getOraclePrice()": FunctionFragment;
    "getTokenContract()": FunctionFragment;
    "hasAccountPermissions(address,address)": FunctionFragment;
    "initializeV1(address,address,address,uint256)": FunctionFragment;
    "setFunder(address)": FunctionFragment;
    "setGlobalOperator(address,bool)": FunctionFragment;
    "setLocalOperator(address,bool)": FunctionFragment;
    "setMinCollateral(uint256)": FunctionFragment;
    "setOracle(address)": FunctionFragment;
    "trade(address[],(uint256,uint256,address,bytes)[])": FunctionFragment;
    "withdraw(address,address,uint256)": FunctionFragment;
    "withdrawFinalSettlement()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deposit"
      | "enableFinalSettlement"
      | "getAccountBalance"
      | "getAccountIndex"
      | "getAdmin"
      | "getFinalSettlementEnabled"
      | "getFunderContract"
      | "getGlobalIndex"
      | "getIsGlobalOperator"
      | "getIsLocalOperator"
      | "getMinCollateral"
      | "getOracleContract"
      | "getOraclePrice"
      | "getTokenContract"
      | "hasAccountPermissions"
      | "initializeV1"
      | "setFunder"
      | "setGlobalOperator"
      | "setLocalOperator"
      | "setMinCollateral"
      | "setOracle"
      | "trade"
      | "withdraw"
      | "withdrawFinalSettlement"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "enableFinalSettlement",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountBalance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountIndex",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "getAdmin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getFinalSettlementEnabled",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFunderContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getGlobalIndex",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getIsGlobalOperator",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getIsLocalOperator",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMinCollateral",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOracleContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOraclePrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenContract",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "hasAccountPermissions",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initializeV1",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setFunder",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalOperator",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setLocalOperator",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMinCollateral",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setOracle",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "trade",
    values: [PromiseOrValue<string>[], P1Trade.TradeArgStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFinalSettlement",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enableFinalSettlement",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFinalSettlementEnabled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFunderContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getGlobalIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIsGlobalOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getIsLocalOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMinCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOracleContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOraclePrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "hasAccountPermissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initializeV1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setFunder", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setLocalOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setMinCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setOracle", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "trade", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFinalSettlement",
    data: BytesLike
  ): Result;

  events: {
    "LogAccountSettled(address,bool,uint256,bytes32)": EventFragment;
    "LogDeposit(address,uint256,bytes32)": EventFragment;
    "LogFinalSettlementEnabled(uint256)": EventFragment;
    "LogIndex(bytes32)": EventFragment;
    "LogSetFunder(address)": EventFragment;
    "LogSetGlobalOperator(address,bool)": EventFragment;
    "LogSetLocalOperator(address,address,bool)": EventFragment;
    "LogSetMinCollateral(uint256)": EventFragment;
    "LogSetOracle(address)": EventFragment;
    "LogTrade(address,address,address,uint256,uint256,bool,bytes32,bytes32)": EventFragment;
    "LogWithdraw(address,address,uint256,bytes32)": EventFragment;
    "LogWithdrawFinalSettlement(address,uint256,bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogAccountSettled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogFinalSettlementEnabled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogIndex"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSetFunder"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSetGlobalOperator"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSetLocalOperator"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSetMinCollateral"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSetOracle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogTrade"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogWithdrawFinalSettlement"): EventFragment;
}

export interface LogAccountSettledEventObject {
  account: string;
  isPositive: boolean;
  amount: BigNumber;
  balance: string;
}
export type LogAccountSettledEvent = TypedEvent<
  [string, boolean, BigNumber, string],
  LogAccountSettledEventObject
>;

export type LogAccountSettledEventFilter =
  TypedEventFilter<LogAccountSettledEvent>;

export interface LogDepositEventObject {
  account: string;
  amount: BigNumber;
  balance: string;
}
export type LogDepositEvent = TypedEvent<
  [string, BigNumber, string],
  LogDepositEventObject
>;

export type LogDepositEventFilter = TypedEventFilter<LogDepositEvent>;

export interface LogFinalSettlementEnabledEventObject {
  settlementPrice: BigNumber;
}
export type LogFinalSettlementEnabledEvent = TypedEvent<
  [BigNumber],
  LogFinalSettlementEnabledEventObject
>;

export type LogFinalSettlementEnabledEventFilter =
  TypedEventFilter<LogFinalSettlementEnabledEvent>;

export interface LogIndexEventObject {
  index: string;
}
export type LogIndexEvent = TypedEvent<[string], LogIndexEventObject>;

export type LogIndexEventFilter = TypedEventFilter<LogIndexEvent>;

export interface LogSetFunderEventObject {
  funder: string;
}
export type LogSetFunderEvent = TypedEvent<[string], LogSetFunderEventObject>;

export type LogSetFunderEventFilter = TypedEventFilter<LogSetFunderEvent>;

export interface LogSetGlobalOperatorEventObject {
  operator: string;
  approved: boolean;
}
export type LogSetGlobalOperatorEvent = TypedEvent<
  [string, boolean],
  LogSetGlobalOperatorEventObject
>;

export type LogSetGlobalOperatorEventFilter =
  TypedEventFilter<LogSetGlobalOperatorEvent>;

export interface LogSetLocalOperatorEventObject {
  sender: string;
  operator: string;
  approved: boolean;
}
export type LogSetLocalOperatorEvent = TypedEvent<
  [string, string, boolean],
  LogSetLocalOperatorEventObject
>;

export type LogSetLocalOperatorEventFilter =
  TypedEventFilter<LogSetLocalOperatorEvent>;

export interface LogSetMinCollateralEventObject {
  minCollateral: BigNumber;
}
export type LogSetMinCollateralEvent = TypedEvent<
  [BigNumber],
  LogSetMinCollateralEventObject
>;

export type LogSetMinCollateralEventFilter =
  TypedEventFilter<LogSetMinCollateralEvent>;

export interface LogSetOracleEventObject {
  oracle: string;
}
export type LogSetOracleEvent = TypedEvent<[string], LogSetOracleEventObject>;

export type LogSetOracleEventFilter = TypedEventFilter<LogSetOracleEvent>;

export interface LogTradeEventObject {
  maker: string;
  taker: string;
  trader: string;
  marginAmount: BigNumber;
  positionAmount: BigNumber;
  isBuy: boolean;
  makerBalance: string;
  takerBalance: string;
}
export type LogTradeEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber, boolean, string, string],
  LogTradeEventObject
>;

export type LogTradeEventFilter = TypedEventFilter<LogTradeEvent>;

export interface LogWithdrawEventObject {
  account: string;
  destination: string;
  amount: BigNumber;
  balance: string;
}
export type LogWithdrawEvent = TypedEvent<
  [string, string, BigNumber, string],
  LogWithdrawEventObject
>;

export type LogWithdrawEventFilter = TypedEventFilter<LogWithdrawEvent>;

export interface LogWithdrawFinalSettlementEventObject {
  account: string;
  amount: BigNumber;
  balance: string;
}
export type LogWithdrawFinalSettlementEvent = TypedEvent<
  [string, BigNumber, string],
  LogWithdrawFinalSettlementEventObject
>;

export type LogWithdrawFinalSettlementEventFilter =
  TypedEventFilter<LogWithdrawFinalSettlementEvent>;

export interface PerpetualV1 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PerpetualV1Interface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deposit(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    enableFinalSettlement(
      priceLowerBound: PromiseOrValue<BigNumberish>,
      priceUpperBound: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAccountBalance(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[P1Types.BalanceStructOutput]>;

    getAccountIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[P1Types.IndexStructOutput]>;

    getAdmin(overrides?: CallOverrides): Promise<[string]>;

    getFinalSettlementEnabled(overrides?: CallOverrides): Promise<[boolean]>;

    getFunderContract(overrides?: CallOverrides): Promise<[string]>;

    getGlobalIndex(
      overrides?: CallOverrides
    ): Promise<[P1Types.IndexStructOutput]>;

    getIsGlobalOperator(
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getIsLocalOperator(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getMinCollateral(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOracleContract(overrides?: CallOverrides): Promise<[string]>;

    getOraclePrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTokenContract(overrides?: CallOverrides): Promise<[string]>;

    hasAccountPermissions(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initializeV1(
      token: PromiseOrValue<string>,
      oracle: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setFunder(
      funder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setGlobalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setLocalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMinCollateral(
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setOracle(
      oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    trade(
      accounts: PromiseOrValue<string>[],
      trades: P1Trade.TradeArgStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      account: PromiseOrValue<string>,
      destination: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFinalSettlement(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deposit(
    account: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  enableFinalSettlement(
    priceLowerBound: PromiseOrValue<BigNumberish>,
    priceUpperBound: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAccountBalance(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<P1Types.BalanceStructOutput>;

  getAccountIndex(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<P1Types.IndexStructOutput>;

  getAdmin(overrides?: CallOverrides): Promise<string>;

  getFinalSettlementEnabled(overrides?: CallOverrides): Promise<boolean>;

  getFunderContract(overrides?: CallOverrides): Promise<string>;

  getGlobalIndex(overrides?: CallOverrides): Promise<P1Types.IndexStructOutput>;

  getIsGlobalOperator(
    operator: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getIsLocalOperator(
    account: PromiseOrValue<string>,
    operator: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getMinCollateral(overrides?: CallOverrides): Promise<BigNumber>;

  getOracleContract(overrides?: CallOverrides): Promise<string>;

  getOraclePrice(overrides?: CallOverrides): Promise<BigNumber>;

  getTokenContract(overrides?: CallOverrides): Promise<string>;

  hasAccountPermissions(
    account: PromiseOrValue<string>,
    operator: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initializeV1(
    token: PromiseOrValue<string>,
    oracle: PromiseOrValue<string>,
    funder: PromiseOrValue<string>,
    minCollateral: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setFunder(
    funder: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setGlobalOperator(
    operator: PromiseOrValue<string>,
    approved: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setLocalOperator(
    operator: PromiseOrValue<string>,
    approved: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMinCollateral(
    minCollateral: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setOracle(
    oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  trade(
    accounts: PromiseOrValue<string>[],
    trades: P1Trade.TradeArgStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    account: PromiseOrValue<string>,
    destination: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFinalSettlement(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deposit(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    enableFinalSettlement(
      priceLowerBound: PromiseOrValue<BigNumberish>,
      priceUpperBound: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAccountBalance(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<P1Types.BalanceStructOutput>;

    getAccountIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<P1Types.IndexStructOutput>;

    getAdmin(overrides?: CallOverrides): Promise<string>;

    getFinalSettlementEnabled(overrides?: CallOverrides): Promise<boolean>;

    getFunderContract(overrides?: CallOverrides): Promise<string>;

    getGlobalIndex(
      overrides?: CallOverrides
    ): Promise<P1Types.IndexStructOutput>;

    getIsGlobalOperator(
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getIsLocalOperator(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getMinCollateral(overrides?: CallOverrides): Promise<BigNumber>;

    getOracleContract(overrides?: CallOverrides): Promise<string>;

    getOraclePrice(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenContract(overrides?: CallOverrides): Promise<string>;

    hasAccountPermissions(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initializeV1(
      token: PromiseOrValue<string>,
      oracle: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setFunder(
      funder: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setGlobalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setLocalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMinCollateral(
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setOracle(
      oracle: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    trade(
      accounts: PromiseOrValue<string>[],
      trades: P1Trade.TradeArgStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      account: PromiseOrValue<string>,
      destination: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFinalSettlement(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "LogAccountSettled(address,bool,uint256,bytes32)"(
      account?: PromiseOrValue<string> | null,
      isPositive?: null,
      amount?: null,
      balance?: null
    ): LogAccountSettledEventFilter;
    LogAccountSettled(
      account?: PromiseOrValue<string> | null,
      isPositive?: null,
      amount?: null,
      balance?: null
    ): LogAccountSettledEventFilter;

    "LogDeposit(address,uint256,bytes32)"(
      account?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null
    ): LogDepositEventFilter;
    LogDeposit(
      account?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null
    ): LogDepositEventFilter;

    "LogFinalSettlementEnabled(uint256)"(
      settlementPrice?: null
    ): LogFinalSettlementEnabledEventFilter;
    LogFinalSettlementEnabled(
      settlementPrice?: null
    ): LogFinalSettlementEnabledEventFilter;

    "LogIndex(bytes32)"(index?: null): LogIndexEventFilter;
    LogIndex(index?: null): LogIndexEventFilter;

    "LogSetFunder(address)"(funder?: null): LogSetFunderEventFilter;
    LogSetFunder(funder?: null): LogSetFunderEventFilter;

    "LogSetGlobalOperator(address,bool)"(
      operator?: null,
      approved?: null
    ): LogSetGlobalOperatorEventFilter;
    LogSetGlobalOperator(
      operator?: null,
      approved?: null
    ): LogSetGlobalOperatorEventFilter;

    "LogSetLocalOperator(address,address,bool)"(
      sender?: PromiseOrValue<string> | null,
      operator?: null,
      approved?: null
    ): LogSetLocalOperatorEventFilter;
    LogSetLocalOperator(
      sender?: PromiseOrValue<string> | null,
      operator?: null,
      approved?: null
    ): LogSetLocalOperatorEventFilter;

    "LogSetMinCollateral(uint256)"(
      minCollateral?: null
    ): LogSetMinCollateralEventFilter;
    LogSetMinCollateral(minCollateral?: null): LogSetMinCollateralEventFilter;

    "LogSetOracle(address)"(oracle?: null): LogSetOracleEventFilter;
    LogSetOracle(oracle?: null): LogSetOracleEventFilter;

    "LogTrade(address,address,address,uint256,uint256,bool,bytes32,bytes32)"(
      maker?: PromiseOrValue<string> | null,
      taker?: PromiseOrValue<string> | null,
      trader?: null,
      marginAmount?: null,
      positionAmount?: null,
      isBuy?: null,
      makerBalance?: null,
      takerBalance?: null
    ): LogTradeEventFilter;
    LogTrade(
      maker?: PromiseOrValue<string> | null,
      taker?: PromiseOrValue<string> | null,
      trader?: null,
      marginAmount?: null,
      positionAmount?: null,
      isBuy?: null,
      makerBalance?: null,
      takerBalance?: null
    ): LogTradeEventFilter;

    "LogWithdraw(address,address,uint256,bytes32)"(
      account?: PromiseOrValue<string> | null,
      destination?: null,
      amount?: null,
      balance?: null
    ): LogWithdrawEventFilter;
    LogWithdraw(
      account?: PromiseOrValue<string> | null,
      destination?: null,
      amount?: null,
      balance?: null
    ): LogWithdrawEventFilter;

    "LogWithdrawFinalSettlement(address,uint256,bytes32)"(
      account?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null
    ): LogWithdrawFinalSettlementEventFilter;
    LogWithdrawFinalSettlement(
      account?: PromiseOrValue<string> | null,
      amount?: null,
      balance?: null
    ): LogWithdrawFinalSettlementEventFilter;
  };

  estimateGas: {
    deposit(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    enableFinalSettlement(
      priceLowerBound: PromiseOrValue<BigNumberish>,
      priceUpperBound: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAccountBalance(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAccountIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    getFinalSettlementEnabled(overrides?: CallOverrides): Promise<BigNumber>;

    getFunderContract(overrides?: CallOverrides): Promise<BigNumber>;

    getGlobalIndex(overrides?: CallOverrides): Promise<BigNumber>;

    getIsGlobalOperator(
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getIsLocalOperator(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getMinCollateral(overrides?: CallOverrides): Promise<BigNumber>;

    getOracleContract(overrides?: CallOverrides): Promise<BigNumber>;

    getOraclePrice(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenContract(overrides?: CallOverrides): Promise<BigNumber>;

    hasAccountPermissions(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initializeV1(
      token: PromiseOrValue<string>,
      oracle: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setFunder(
      funder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setGlobalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setLocalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMinCollateral(
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setOracle(
      oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    trade(
      accounts: PromiseOrValue<string>[],
      trades: P1Trade.TradeArgStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      account: PromiseOrValue<string>,
      destination: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFinalSettlement(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deposit(
      account: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    enableFinalSettlement(
      priceLowerBound: PromiseOrValue<BigNumberish>,
      priceUpperBound: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAccountBalance(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAccountIndex(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFinalSettlementEnabled(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFunderContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getGlobalIndex(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getIsGlobalOperator(
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getIsLocalOperator(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getMinCollateral(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOracleContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOraclePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenContract(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hasAccountPermissions(
      account: PromiseOrValue<string>,
      operator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initializeV1(
      token: PromiseOrValue<string>,
      oracle: PromiseOrValue<string>,
      funder: PromiseOrValue<string>,
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setFunder(
      funder: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setGlobalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setLocalOperator(
      operator: PromiseOrValue<string>,
      approved: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMinCollateral(
      minCollateral: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setOracle(
      oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    trade(
      accounts: PromiseOrValue<string>[],
      trades: P1Trade.TradeArgStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      account: PromiseOrValue<string>,
      destination: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFinalSettlement(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}