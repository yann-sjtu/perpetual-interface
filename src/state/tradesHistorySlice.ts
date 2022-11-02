import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./index";

export interface TradeRecord {
  hash: string;
  taker: string;
  maker: string;
  isBuy: boolean;
  price: number;
  amount: number;
  timestamp: number;
  blockNumber: number;
}

export interface TradeRecords {
  market: string;
  trades: TradeRecord[];
}

const initialState: TradeRecords = {
  market: "PI_XBTUSD", // PI_ETHUSD
  trades: [],
};

export const tradesHistorySlice = createSlice({
  name: "tradesHistory",
  initialState,
  reducers: {
    addTradeRecords: (state, { payload }) => {
      // state.trades = state.trades.concat(payload);
      state.trades = payload;
    },

    clearTradesHistory: (state) => {
      state.trades = [];
    },
  },
});

export const { addTradeRecords, clearTradesHistory } =
  tradesHistorySlice.actions;

export const selectTrades = (state: AppState): TradeRecord[] =>
  state.tradesHistory.trades;
export const selectMarket = (state: AppState): string =>
  state.tradesHistory.market;

export default tradesHistorySlice.reducer;
