import { configureStore, combineReducers } from "@reduxjs/toolkit";
import inputTextSlice from "../rtk/inputTextSlice";
import tasksSlice from "../rtk/tasksSlice";
import authSlice from "../rtk/authSlice";

const store = configureStore({
  reducer: combineReducers({
    text: inputTextSlice,
    tasks: tasksSlice,
    auth: authSlice,
  }),
});

export default store;
