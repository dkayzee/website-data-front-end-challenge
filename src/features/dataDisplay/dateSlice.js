import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: "2019-04-11",
  },
  reducers: {
    select: (state, action) => {
      state.date = action.payload;
    },
  },
});

// export const selectDate = date <<< dispatch

export default dateSlice.reducer;
