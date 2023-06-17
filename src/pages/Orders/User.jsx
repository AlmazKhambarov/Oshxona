import { DisplaySettings } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnlyUser } from "../../redux/extraReducer/extraReducer";
import { Link } from "react-router-dom";
import './User.css'
const User = () => {
  const { userOrderFood, onlyuser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    var useruid = localStorage.getItem("useruid");
    if (useruid) {
      dispatch(getOnlyUser(useruid));
    }
  }, []);
  console.log(onlyuser);
  return (
    <div className="user__main">
      <Link to={"/user-order"}>
        <button>Назад</button>
      </Link>
      <div className="foods">
      {onlyuser?.foodData?.map((el) => (
       <div className="food_card">
        <div className="food_card_image">
            <img src={el.image}/>
        </div>
        <div className="food_card_text">
            <span>{el.name}</span>
            <span>{el.price}</span>
        </div>
       </div>
          ))}
          </div>
    </div>
  );
};

export default User;
