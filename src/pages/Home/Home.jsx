import React, { useDebugValue, useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import AdminPanel from "../AdminPanel/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/extraReducer/extraReducer";
import { imagesData } from "../../components/imagesData/imagesData";
import '../../assets/styles/Home.css'
const Home = ({}) => {
  const { usersData } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(imagesData);
  const handelLogout = () => {
    auth.signOut();
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const [user, setUser] = useState();
  auth.onAuthStateChanged((user) => setUser(user));
  return (
    <div>
      <button onClick={handelLogout}>Logout</button>
      {user ? user.email === "admin@gmail.com" ? <AdminPanel /> : null : null}
      home
      {usersData?.map((user) => (
        <>
          <span>{user.name}</span>
          <img className="image" src={user.image}/>
        </>
      ))}
    </div>
  );
};

export default Home;
