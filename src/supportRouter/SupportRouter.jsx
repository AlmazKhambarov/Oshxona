import React from "react";
import Home from "../pages/Home/Home";
import userSlice from "../redux/usersSlice/userSlice";
import UsersPage from "../pages/usersPage/UsersPage";

const SupportRouter = ({user}) => {
  return(
<>
   {user.email ==='admin@gmail.com'?<Home/> || <UsersPage/>:<UsersPage/>}
</>)
};

export default SupportRouter;
