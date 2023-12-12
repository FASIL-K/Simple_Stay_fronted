import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userInfo = action.payload;
      console.log(action.payload, "payload");
    },
    resetState: (state) => {
      state.userInfo = initialState.userInfo;
    },
  },
});

export const { setUserDetails, resetState } = userSlice.actions;

export default userSlice.reducer;
