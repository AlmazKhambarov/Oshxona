import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./usersSlice/userSlice";
const store = configureStore({
    reducer:({
        users:userSlice,
    })
})

export default store;