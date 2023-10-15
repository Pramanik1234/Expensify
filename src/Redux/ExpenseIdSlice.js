import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expense:''
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserId(state, action) {
      state.expense = action.payload;
    },
  },
});

export const {
  addUserId,
 } = userSlice.actions;

export default userSlice.reducer;

export const userID = (item) => item.id;