import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { async } from "q";
import { auth, db, firestore } from "../../Api/firebase";
const BASE_URL = "http://localhost:3001";

export const addPost = createAsyncThunk("add/post", async (payload) => {
	return axios({
		method: "POST",
		url: URL,
		data: payload,
	}).then((res) => res.data);
});

export const getAllUsers = createAsyncThunk("get/users", async () => {
	return await axios.get(`${BASE_URL}/allfood`).then((res) => res.data);
});

export const deleteItemId = createAsyncThunk("delete/method", async (id) => {
	return await axios
		.delete(`${BASE_URL}/allfood/${id}`)
		.then((res) => res.data);
});
export const deleteUsersfood = createAsyncThunk("delete", async (id) => {
	return await axios
		.delete(`${BASE_URL}/filtred/${id}`)
		.then((res) => res.data);
});
export const postFoodforUser = createAsyncThunk(
	"post/foods",
	async (paylaod) => {
		return axios({
			method: "POST",
			data: paylaod,
			url: BASE_URL + "/" + "filtred",
		}).then((res) => res.data);
	}
);

export const getUsersFoodData = createAsyncThunk("get/userFood", async () => {
	return await axios.get(`${BASE_URL}/filtred`).then((res) => res.data);
});

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
);

export const createPost = createAsyncThunk(
	"posts/createPost",
	async (postData, thunkAPI) => {
		try {
			const docRef = await firestore.collection("filtred").add(postData);
			return docRef.id;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const fetchPosts = createAsyncThunk(
	"posts/fetchPosts",
	async (_, thunkAPI) => {
		try {
			// Make a GET request to Firestore
			const snapshot = await firestore.collection("filtred").get();
			const posts = snapshot.docs.map((doc) => doc.data());
			return posts;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
