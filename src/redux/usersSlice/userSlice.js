import { createSlice } from "@reduxjs/toolkit";
import { addPost, getAllUsers } from "../extraReducer/extraReducer";
const initialState = {
    usersData: [],
    loading: false,
    error: null,
    onuserAdded: ""
}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPost.pending, (state, action) => {
                state.loading = true;
                state.onuserAdded = "pending"
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.loading = false;
                state.onuserAdded = 'fullfiled'
            })
            .addCase(addPost.rejected, (state, action) => {
                state.error = action.error.message
            })
        ///////////get users////////
        builder
            .addCase(getAllUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.usersData = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
})
export const { } = userSlice.actions
export default userSlice.reducer