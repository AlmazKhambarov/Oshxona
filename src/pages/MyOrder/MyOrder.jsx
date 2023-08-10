import React, { useEffect } from "react";
import {
  getOnlyUser,
  getuserOrder,
} from "../../redux/extraReducer/extraReducer";
import { useDispatch, useSelector } from "react-redux";
import "./Myorder.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NotInterestedIcon from "@mui/icons-material/NotInterested";

import { useNavigate } from "react-router-dom";
const MyOrder = () => {
  const { userOrderFood } = useSelector((state) => state.users);
  var dispatch = useDispatch();
  var navigate = useNavigate()
  const username = localStorage.getItem("username");
  const findUserId = userOrderFood?.find((el) => el.user === username);
  console.log(findUserId);
  useEffect(() => {
    if (findUserId) {
      dispatch(getOnlyUser(findUserId?.id));
    }
  }, [findUserId]);
  useEffect(() => {
    dispatch(getuserOrder());
  }, []);
  
  return (
    <div>
      {findUserId?.foodData?.map((food) => (
        <div className="foodsss">
          {/* <div> */}
          <img className="food_image" src={food.image} />
          {/* </div> */}
          <div className="food_card_text">
            <div className="food_text">
              <span>{food.name?.slice(0, 23)}...</span>
              <span>{food.price}.000 сум</span>
            </div>
            <div>
              {food.loading === 'reject' ? (
                <span className="failure">
                  Отклонено
                </span>
              ) : food.loading ? (
                <span className="done">
                <CheckCircleOutlineIcon />
             </span>
              ) : (
                <span className="loading">
                  Ожидания
                  <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="add_order" onClick={()=>navigate('/')}>добавить   <AddCircleOutlineIcon/></div>
    </div>
  );
};

export default MyOrder;
