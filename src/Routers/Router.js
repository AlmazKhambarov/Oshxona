import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../components/register/Register'
import Login from '../components/login/Login'
import Home from '../pages/Home/Home'
import { auth } from '../Api/firebase'

const Router = () => {
  const [user, setUser] = useState()
  auth.onAuthStateChanged((user)=>{
    setUser(user)
  })
  return (
    <Routes>
        <Route path='/' element={user?<Home user={user}/>:<Login/>}/>
        <Route path='/register' element={user?<Home/>:<Register/>}/>

    </Routes>
  )
}

export default Router
