import { DisplaySettings } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnlyUser } from "../../redux/extraReducer/extraReducer";
import { Link } from "react-router-dom";
import "./User.css";
import WestIcon from '@mui/icons-material/West';
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
      <WestIcon sx={{fontSize:'35px'}}/>
      </Link>
      <div>
        <div className="user_name">
          <span>{onlyuser?.user}</span>
        </div>
        {onlyuser?.foodData?.map((food) => (
          <div>
            <div className="foodsss">
              <img className="food_image" src={food.image} />
              {/* </div> */}
              <div className="food_card_text">
                <div className="food_texts">
                  <span>{food.name?.slice(0, 23)}...</span>
                  <span>{food.price}.000 сум</span>
                </div>
              </div>
            </div>
            <div className="select_option">
              <button className="btn btn-danger">Otkl</button>
              <button className="btn btn-primary">prinyat</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
