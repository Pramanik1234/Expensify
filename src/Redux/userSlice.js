import { createSlice } from "@reduxjs/toolkit";

const initialState = [

] ;
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    deleteUser(state,action){
        state.pop();
    }
  },
});
export const { addUser ,deleteUser } = user.actions;
export default user.reducer;
export const userName = (item) => item.user[0]?.email;

