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
  }, [])
  const getId = (id) => {
    localStorage.setItem("useruid", id);
  };
  // userOrderFood.forEach((el) => {
  //   if(el.foodData.length>0){
  //     return console.log(el.foodData)
  //   }
  // })
console.log(userOrderFood)
  return (
    <div className="foods">
      {userOrderFood?.map((el) => (
        <div className="user__box__main">
          <a href={`/user-order/${el.id}`} onClick={() => getId(el.id)}>
            <p className="user__box">{el.id}  {el.user}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserOrderPage;