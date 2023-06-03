import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { async } from "q";
const URL = 'http://localhost:3000/posts'
export const addPost = createAsyncThunk('add/post', async(payload)=>{
    return axios({
        method:"POST",
        url:URL,
        data:payload,
    }).then(res=>res.data)
})

export const getAllUsers = createAsyncThunk('get/users', async()=>{
    return await axios.get(URL).then(res=>res.data)
})