import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

export enum Status {
  Limited = "Limited",
  Market = "Market",
}

export enum FillType {
  Market = "Market",
  Liquided = "Liquided",
}

export enum Side {
  Buy = "Buy",
  Sell = "Sell",
}

export enum TakerOrMaker {
  Taker = "Taker",
  Maker = "Maker",
}

interface Fill {
  filled: string;
  time: number;
  type: FillType;
  side: Side;
  amount: number;
  price: number;
  totalFee: number;
  liquidity: TakerOrMaker;
}

export interface Order {
  hash: string;
  jsonOrder: string,
  status: Status;
  side: Side;
  amountInETH: number;
  filledAmountInETH: number;
  price: number;
  trigger: number;
  goodTill: string;
}

interface Position {
  margin: number;
  position: number;
  erc20Balance: number;
}

export function updateOrders(currentOrders: Order[], updates: Order[]) {
  const updatedOrders = updates.reduce(
    (res, update) => {
      const updatedOrder = res.find(
        (currentOrder) => currentOrder.hash === update.hash
      );
      if (!updatedOrder) {
        if (update.amountInETH) {
          res.push(update);
        }
        return res;
      }
      const newOrders = res.filter((order) => order.hash !== update.hash);

      if (update.filledAmountInETH > 0) {
        // update size
        newOrders.push({
          ...updatedOrder,
          filledAmountInETH: update.filledAmountInETH,
        });
      }
      return newOrders;
    },
    [...currentOrders]
  );

  return updatedOrders;
}

export interface AccountRecords {
  market: string;
  fills: Fill[];
  orders: Order[];
  position: Position;
}

const initialState: AccountRecords = {
  market: "PI_XBTUSD", // PI_ETHUSD
  fills: [],
  orders: [],
  position: { margin: 0, position: 0, erc20Balance: 0 },
};

export const accountRecords = createSlice({
  name: "accountRecords",
  initialState,
  reducers: {
    addFills: (state, { payload }) => {
      // state.fills = state.fills.concat(payload);
      state.fills = payload;
    },
    fetchOrders: (state, { payload }) => {
      // state.orders = updateOrders(state.orders, payload);
      state.orders = payload;
      // console.log(state.orders.length);
    },
    removeOrder: (state, { payload }) => {
      state.orders = state.orders.filter((order) => order.hash !== payload);
    },
    updatePosition: (state, { payload }) => {
      state.position = payload;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
    clearFills: (state) => {
      state.fills = [];
    },
  },
});

export const {
  addFills,
  fetchOrders,
  removeOrder,
  updatePosition,
  clearOrders,
  clearFills,
} = accountRecords.actions;

export const selectOrders = (state: AppState): Order[] => state.account.orders;
export const selectFills = (state: AppState): Fill[] => state.account.fills;
export const selectMarket = (state: AppState): string => state.account.market;

export const selectPosition = (state: AppState): Position =>
  state.account.position;

export default accountRecords.reducer;
