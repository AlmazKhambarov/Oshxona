import React, { useDebugValue, useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import AdminPanel from "../AdminPanel/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/extraReducer/extraReducer";
import { imagesData } from "../../components/imagesData/imagesData";
import "../../assets/styles/Home.css";
import img from "../../assets/images/image1.jpg";
const Home = ({}) => {
  const { usersData } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(usersData);
  const handelLogout = () => {
    auth.signOut();
  };
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const [user, setUser] = useState();
  auth.onAuthStateChanged((user) => setUser(user));
  console.log(user);
  return (
    <div className="home_main_container">
      {user ? (
        user.email === "admin@gmail.com" ? (
          <buttom className="addProductButton btn btn-primary">
            добавить еду
          </buttom>
        ) : null
      ) : null}
      <h1>Menu</h1>
      <hr style={{ color: "white" }} />
      <div className="food">
        {usersData?.map((user) => (
          <div className="food__card">
            <div className="food__card__img">
              <img className="image" src={img} />
            </div>
            <div className="food__card__text">
              <span>{user.name}</span>
              <span>{user.price}.000 Тыс</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
