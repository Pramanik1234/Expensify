import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./ExpenseIdSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    userID: usersReducer,
    user: userReducer,
  },
});

export default store;
