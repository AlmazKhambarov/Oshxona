import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../components/register/Register'
import Login from '../components/login/Login'
import Home from '../pages/Home/Home'
import { auth } from '../Api/firebase'
import UsersPage from '../pages/usersPage/UsersPage'

const Router = () => {
  const [user, setUser] = useState()
  auth.onAuthStateChanged((user) => {
    setUser(user)
  })
  const userRouter = [
    { path: '/userpage', el: <UsersPage />, id: 1 }]
  const adminRouter = [
    { path: "/home", el: <Home />, id: 1 },
    { path: "/", el: <UsersPage />, id: 2 }
  ]
  return (
    <Routes>
      <Route path='/' element={!user ? <Login /> : <>
        {user.email === 'admin@gmail.com' ? <Home /> : <UsersPage user={user} />}
      </>} />
      <Route path='/userpage' element={user ? <UsersPage user={user}/> : <Login />} />
      <Route path='/register' element={user?(user.emai==='admin@gmail.com'?<Home/>:<UsersPage/>):<Register/>}/>
    </Routes>
  )
}

export default Router
