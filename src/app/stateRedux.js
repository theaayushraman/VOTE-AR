import { createSlice } from "@reduxjs/toolkit";

export const stateRedux = createSlice({
  initialState: 0,
  name: "EthAccount",
  reducers: {
    setAddress: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const stateCounter = createSlice({
  initialState: 0,
  name: "stateCounter",
  reducers: {
    setCounter: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const stateDateTime = createSlice({
  initialState: { StartDate: 0, EndDate: 0 },
  name: "VotingDateTime",
  reducers: {
    setDateTime: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const stateWinner = createSlice({
  initialState: "Not Declare",
  name: "WinnerId",
  reducers: {
    setWinner: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { setAddress } = stateRedux.actions;
export const { setCounter } = stateCounter.actions;
export const { setDateTime } = stateDateTime.actions;
export const { setWinner } = stateWinner.actions;
