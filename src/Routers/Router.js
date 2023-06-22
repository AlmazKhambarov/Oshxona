import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../components/register/Register'
import Login from '../components/login/Login'
import Home from '../pages/Home/Home'
import { auth } from '../Api/firebase'
import UsersPage from '../pages/usersPage/UsersPage'
import UserOrderPage from '../pages/Orders/UserOrderPage'
import User from '../pages/Orders/User'
import MyOrder from '../pages/MyOrder/MyOrder'

const Router = () => {
  const [user, setUser] = useState()
  auth.onAuthStateChanged((user) => {
    setUser(user)
    localStorage.setItem('username', user?.displayName)
  })


  const userRouter = [
    { path: '/userpage', el: <UsersPage />, id: 1 }]
  const adminRouter = [
    { path: "/home", el: <Home />, id: 1 },
    { path: "/", el: <UsersPage />, id: 2 }
  ]
  console.log(user)
  return (
    <Routes>
      <Route path='/' element={!user ? <Login /> : <>
        {user.email === 'admin@gmail.com' ? <Home /> : <UsersPage user={user} />}
      </>} />
      <Route path='/userpage' element={user ? <UsersPage user={user} /> : <Login />} />
      <Route path='/register' element={user ? (user.emai === 'admin@gmail.com' ? <Home /> : <UsersPage />) : <Register />} />
      <Route path='/user-order' element={<UserOrderPage user={user} />} />
      <Route path='/user-order/:id' element={<User user={user} />} />
      <Route path='/my-order' element={<MyOrder/>}/>
    </Routes>
  )
}

export default Router
//1 - hRciYJVvH6g5jDch4O2apymY4KC3
//2 -hRciYJVvH6g5jDch4O2apymY4KC3  