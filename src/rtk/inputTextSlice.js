import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "", description: "" };

const inputTextSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    change(state, action) {
      state.value = action.payload;
    },
    changeDescription(state, action) {
      state.description = action.payload;
    },
    zero(state) {
      state.value = "";
      state.description = "";
    },
  },
});

export const { change, changeDescription, zero } = inputTextSlice.actions;
export default inputTextSlice.reducer;
