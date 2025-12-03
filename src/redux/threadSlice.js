import { createSlice } from "@reduxjs/toolkit";

const threadSlice = createSlice({
  name: "threads",
  initialState: {
    allThreadsState: [],
    nextPageToken: "",
  },
  reducers: {
    setAllThreadsState: (state, action) => {
      state.allThreadsState = action.payload;
    },
    setNextPageToken: (state, action) => {
      state.nextPageToken = action.payload;
    },
    appendThreads: (state, action) => {
      state.allThreadsState = [...state.allThreadsState, ...action.payload];
    },
  },
});
export default threadSlice.reducer;
export const { setAllThreadsState, setNextPageToken, appendThreads } =
  threadSlice.actions;
