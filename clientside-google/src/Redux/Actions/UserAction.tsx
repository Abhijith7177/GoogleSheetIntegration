import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../Services";

export const RegisterUser = createAsyncThunk(
  "userapi/register",
  async (req: any) => {
    return await User.Register(req);
  }
);

export const LoginUser = createAsyncThunk("userapi/login", async (req: any) => {
  return await User.Login(req);
});

export const generateAccessToken = createAsyncThunk(
  "userapi/generateAccessToken",
  async () => {
    return await User.generateToken();
  }
);

export const googleAccessList = createAsyncThunk(
  "userapi/allGoogleAccessList",
  async () => {
    return await User.accessList();
  }
);

export const createAccess = createAsyncThunk(
  "userapi/createAccess",
  async (email: any) => {
    return await User.createAccess(email);
  }
);

export const deleteAccess = createAsyncThunk(
  "userapi/deleteAccess",
  async (id: any) => {
    return await User.deleteAccess(id);
  }
);

export const allSheets = createAsyncThunk(
  "userapi/allSheets",
  async (id: any) => {
    return await User.fetchSheets(id);
  }
);

export const createSheet = createAsyncThunk(
  "userapi/createSheet",
  async (req: any) => {
    return await User.createSheet(req);
  }
);

export const deleteSheet = createAsyncThunk(
  "userapi/deleteSheets",
  async (id: any) => {
    return await User.deleteSheet(id);
  }
);

export const editSheet = createAsyncThunk(
  "userapi/editSheet",
  async (req: any, id: any) => {
    return await User.editSheet(req, id);
  }
);
