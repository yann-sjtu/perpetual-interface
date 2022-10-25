import { createSlice } from "@reduxjs/toolkit";
import { groupByTicketSize } from "../../utils/utils";
import { ApiOrder } from "../../utils/types";
import { AppState } from "../index";

export interface OrderbookState {
  market: string;
  bids: ApiOrder[];
  maxTotalBids: number;
  asks: ApiOrder[];
  maxTotalAsks: number;
  groupingSize: number;
}

const initialState: OrderbookState = {
  market: "PI_XBTUSD", // PI_ETHUSD
  bids: [],
  maxTotalBids: 0,
  asks: [],
  maxTotalAsks: 0,
  groupingSize: 0.5,
};

function updateOrders(currentOrders: ApiOrder[], updates: ApiOrder[]) {
  const updatedOrders = updates.reduce(
    (res, update) => {
      const updatedOrder = res.find(
        (currentOrder) => currentOrder.hash === update.hash
      );
      if (!updatedOrder) {
        if (update.size) {
          res.push(update);
        }
        return res;
      }
      const newOrders = res.filter((order) => order.hash !== update.hash);

      if (update.size > 0) {
        // update size
        newOrders.push({ ...updatedOrder, size: update.size });
      }
      return newOrders;
    },
    [...currentOrders]
  );

  return updatedOrders;
}

export const orderbookSlice = createSlice({
  name: "orderbook",
  initialState,
  reducers: {
    addBids: (state, { payload }) => {
      const currentTicketSize: number = state.groupingSize;
      const groupedCurrentBids = groupByTicketSize(payload, currentTicketSize);

      // state.bids = state.bids.concat(groupedCurrentBids);
      state.bids = updateOrders(state.bids, groupedCurrentBids);
    },

    addAsks: (state, { payload }) => {
      const currentTicketSize: number = state.groupingSize;
      const groupedCurrentAsks = groupByTicketSize(payload, currentTicketSize);

      // state.asks = state.asks.concat(groupedCurrentAsks);
      state.asks = updateOrders(state.asks, groupedCurrentAsks);
    },
    setGrouping: (state, { payload }) => {
      state.groupingSize = payload;
    },

    clearOrdersState: (state) => {
      state.bids = [];
      state.asks = [];
      state.maxTotalBids = 0;
      state.maxTotalAsks = 0;
    },
  },
});

export const { addBids, addAsks, setGrouping, clearOrdersState } =
  orderbookSlice.actions;

export const selectBids = (state: AppState): ApiOrder[] => state.orderbook.bids;
export const selectAsks = (state: AppState): ApiOrder[] => state.orderbook.asks;
export const selectGrouping = (state: AppState): number =>
  state.orderbook.groupingSize;
export const selectMarket = (state: AppState): string => state.orderbook.market;

export default orderbookSlice.reducer;
