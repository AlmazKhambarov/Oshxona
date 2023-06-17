import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getuserOrder,
  usersOrder,
} from "../../redux/extraReducer/extraReducer";
import { Link } from "react-router-dom";
import "./UserOrderPage.css";
const UserOrderPage = ({ user }) => {
  const dispatch = useDispatch();
  const { userOrderFood, loadingOrder } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getuserOrder());
  }, []);
  const getId = (id) => {
    localStorage.setItem("useruid", id);
  };
  console.log(loadingOrder);
  return (
    <div>
      {userOrderFood?.map((el) => (
        <div className="user__box__main">
          <a href={`/user-order/${el.id}`} onClick={() => getId(el.id)}>
            <p className="user__box">
              {el.user}
              {el.foodData.length}
              {/* <img src={el.image} alt="#"/> */}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserOrderPage;
