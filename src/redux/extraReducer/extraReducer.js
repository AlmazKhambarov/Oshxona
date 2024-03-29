import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { async } from "q";
import { auth, db, firestore } from "../../Api/firebase";
import { EggTwoTone } from "@mui/icons-material";
const BASE_URL = 'https://test-api-oshxona.onrender.com'
const USERS_API = 'https://647b1835d2e5b6101db0d8df.mockapi.io/oshxonabynapaautomativeuz/foodsapi'
const USERSORDER = 'https://641d66581a68dc9e461dd276.mockapi.io/usersorderapi'
export const addPost = createAsyncThunk('add/post', async (payload) => {
	return axios({
		method: "POST",
		url: URL,
		data: payload,
	}).then(res => res.data)
})

export const getAllUsers = createAsyncThunk('get/users', async () => {
	return await axios.get(`${BASE_URL}/allfood`).then(res => res.data)
})

export const deleteItemId = createAsyncThunk('delete/method', async (id) => {
	return await axios.delete(`${BASE_URL}/allfood/${id}`).then(res => res.data)
});
export const deleteUsersfood = createAsyncThunk('delete', async (id) => {
	return await axios.delete(`${USERS_API}/${id}`).then(res => res.data)
});
export const postFoodforUser = createAsyncThunk('post/foods', async (paylaod) => {
	return axios({
		method: 'POST',
		data: paylaod,
		url: USERS_API
	}).then(res => res.data)
})
export const userRegister = createAsyncThunk('regsiter/user', async (paylaod) => {
	return axios({
		method: "POST",
		url: USERSORDER,
		data: paylaod,
	}).then(res => res.data)
})

export const getUsersFoodData = createAsyncThunk('get/userFood', async () => {
	return await axios.get(`${USERS_API}`).then(res => res.data)
})
export const usersOrder = createAsyncThunk('users/orders', async (payload) => {
	console.log(payload.data)
	return await axios.put(`${USERSORDER}/${payload.id}`, payload.data).then(res => res.data)
})
export const getuserOrder = createAsyncThunk('getorderfood', async () => {
	return await axios.get(USERSORDER).then(res => res.data)
})
export const getOnlyUser = createAsyncThunk('getonly/one/user', async (paylaod) => {
	return axios({
		method: "GET",
		url: USERSORDER + '/' + paylaod,
	}).then(res => res.data)
})
export const createUserAndProfileAsync = createAsyncThunk(
	"user/createUserAndProfile",
	async ({ email, password, userName }, thunkAPI) => {
		try {
			const user = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(auth.currentUser, { displayName: userName });
			return user;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
)


