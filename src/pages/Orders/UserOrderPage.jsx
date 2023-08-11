import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getuserOrder,
  usersOrder,
} from "../../redux/extraReducer/extraReducer";
import { Link } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
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

  return (
    <div className="foods">
      <Link to={"/"}>
        <WestIcon />
      </Link>
      {userOrderFood?.map((el) => (
        <div className="user__box__main">
          <a href={`/user-order/${el.id}`} onClick={() => getId(el.id)}>
            <p className="user__box">
              {el.foodData.length >= 1 ? (
                <span>
                  {el.id} {el.user}
                </span>
              ) : null}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserOrderPage;
