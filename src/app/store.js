import { configureStore } from "@reduxjs/toolkit";
import {
  stateRedux,
  stateCounter,
  stateDateTime,
  stateWinner,
} from "./stateRedux";

const store = configureStore({
  reducer: {
    EthAccount: stateRedux.reducer,
    stateCounter: stateCounter.reducer,
    VotingDateTime: stateDateTime.reducer,
    WinnerId: stateWinner.reducer,
  },
});

export default store;
