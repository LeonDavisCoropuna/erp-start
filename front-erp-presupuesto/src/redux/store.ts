import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./state/User";
import { User } from "@/interfaces/user.interface";
export interface AppStore{
    user: User
}
export default configureStore<AppStore>({
    reducer:{
        user: userSlice.reducer
    }
})