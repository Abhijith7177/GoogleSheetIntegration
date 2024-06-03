import { createSlice } from "@reduxjs/toolkit";
import {
  LoginUser,
  generateAccessToken,
  RegisterUser,
  googleAccessList,
  createAccess,
  deleteAccess,
  allSheets,
  deleteSheet,
  createSheet,
  editSheet,
} from "../Actions/UserAction";

const initialState = {
  userData: [],
  token: "",
};

export const UserSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      state.userData = action.payload.data;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.userData = action.payload.data;
      state.token = action.payload.data.token;
    });
    builder.addCase(generateAccessToken.fulfilled, (state, action) => {});

    builder.addCase(googleAccessList.fulfilled, (state, action) => {});

    builder.addCase(createAccess.fulfilled, (state, action) => {});

    builder.addCase(deleteAccess.fulfilled, (state, action) => {});

    builder.addCase(deleteSheet.fulfilled, (state, action) => {});

    builder.addCase(createSheet.fulfilled, (state, action) => {});

    builder.addCase(allSheets.fulfilled, (state, action) => {});

    builder.addCase(editSheet.fulfilled, (state, action) => {});
  },
});

export default UserSlice.reducer;
