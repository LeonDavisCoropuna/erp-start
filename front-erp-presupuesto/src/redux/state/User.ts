import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/interfaces/user.interface";
import { decodeToken, tokenKey } from "../../utils/decodeToken.utils";

export const UserEmptyState: User = {
  username: "",
  roles: [],
  exp: 0,
  iat: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: decodeToken(tokenKey) || UserEmptyState,
  reducers: {
    createUser: (_state, action) => action.payload,
    resetUser: () => UserEmptyState,
    updateUser: (state, action) => ({...state.payload, ...action.payload})
  },
});

export const { createUser, resetUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
