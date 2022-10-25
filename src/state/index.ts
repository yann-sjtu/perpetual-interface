import { configureStore } from "@reduxjs/toolkit";
import orderbookReducer from "./orderbook/reducer";
import tradesHistoryReducer from "./tradesHistorySlice";
import accountReducer from "./accountSlice";

export const store = configureStore({
  reducer: {
    orderbook: orderbookReducer,
    tradesHistory: tradesHistoryReducer,
    account: accountReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
