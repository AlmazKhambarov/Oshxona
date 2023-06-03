import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const URL = 'http://localhost:3000/posts'
export const addPost = createAsyncThunk('add/post', async(payload)=>{
    return axios({
        method:"POST",
        url:URL,
        data:payload,
    }).then(res=>res.data)
})