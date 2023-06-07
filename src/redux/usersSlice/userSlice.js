import { createSlice } from "@reduxjs/toolkit";
import { addPost, getAllUsers, deleteItemId, postFoodforUser, getUsersFoodData, deleteUsersfood } from "../extraReducer/extraReducer";
const initialState = {
    usersData: [],
    loading: false,
    error: null,
    onuserAdded: "",
    deleteAction: '',
    postSuccsess: null,
    foodsData: [],
}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        handleDeleteFood: (state, action) => {
            state.usersData = state.usersData.filter(el => el.id !== action.payload)
        },
        pushToAllmenuList: (state, action) => {
            state.usersData.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPost.pending, (state, action) => {
                state.loading = true;
                state.onuserAdded = "pending";
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
        ////////postFoods//////////
        builder
            .addCase(postFoodforUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(postFoodforUser.fulfilled, (state, action) => {
                state.loading = false;
                state.postSuccsess = true
            })
            .addCase(postFoodforUser.rejected, (state, action) => {
                state.error = action.error.message
            })
        /////////delete method/////
        builder
            .addCase(deleteItemId.pending, (state) => {
                state.loading = true;
                state.deleteAction = 'pending delete'
            })
            .addCase(deleteItemId.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteAction = 'deleted Succsess'
            })
            .addCase(deleteItemId.rejected, (state, action) => {
                state.error = action.error.message
            })
            ////////// delete users food///////////
            builder
            .addCase(deleteUsersfood.pending, (state) => {
                state.loading = true;
                state.deleteAction = 'pending delete'
            })
            .addCase(deleteUsersfood.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteAction = 'deleted Succsess'
            })
            .addCase(deleteUsersfood.rejected, (state, action) => {
                state.error = action.error.message
            })
        // ~~~~~~~~~~~~getUsersFood~~~~~~~~~~~~
        builder
            .addCase(getUsersFoodData.pending, state => {
                state.loading = true;
            })
            .addCase(getUsersFoodData.fulfilled, (state, action) => {
                state.loading = false;
                state.foodsData = action.payload
            })
            .addCase(getUsersFoodData.rejected, (state, action) => {
                state.error = action.error.message;
            })
    }
})
export const { handleDeleteFood, pushToAllmenuList } = userSlice.actions
export default userSlice.reducer