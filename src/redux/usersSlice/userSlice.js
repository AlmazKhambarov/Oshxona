import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../extraReducer/extraReducer";
const initialState = {
    usersData: [],
    loading: false,
    error: null
}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addPost.fulfilled, (state, action)=>{
                state.loading = true;
                state.usersData = action.payload
            })
            .addCase(addPost.rejected, (state, action)=>{
                state.error = action.error.message
            })
    }
})
export const { } = userSlice.actions
export default userSlice.reducer