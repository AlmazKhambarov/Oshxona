import { DisplaySettings, TurnRight, UpdateTwoTone } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnlyUser, usersOrder } from "../../redux/extraReducer/extraReducer";
import { Link } from "react-router-dom";
import "./User.css";
import WestIcon from "@mui/icons-material/West";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
const User = () => {
  const { userOrderFood, onlyuser, loadingOrder } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(true);
  var useruid = localStorage.getItem("useruid");
  useEffect(() => {
    console.log(useruid);
    if (useruid) {
      dispatch(getOnlyUser(useruid));
    }
  }, [loadingOrder]);

  // Sample usage
  const updatedData = {
    name: "Переловка",
    price: 7,
    loading: false,
    image: "https://newimage.jpg",
  };

  const replaceObjectInArray = (array, targetObject, replacementObject) => {
    return array.map((obj) => {
      if (obj.name == targetObject.name) {
        return replacementObject;
      } else {
        return obj;
      }
    });
  };

  const foodStateReject = (p) => {
    var prev = { ...p };
    prev.loading = "reject";

    const newArr = replaceObjectInArray(onlyuser?.foodData, p, prev);
    if (newArr) {
      let object = {
        id: onlyuser?.id,
        user: onlyuser?.user,
        foodData: newArr,
      };
      dispatch(usersOrder({ id: object.id, data: object }));
    }
  };
  const foodStateAccert = (p) => {
    var prev = { ...p };
    prev.loading = true;

    const newArr = replaceObjectInArray(onlyuser?.foodData, p, prev);
    if (newArr) {
      let object = {
        id: onlyuser?.id,
        user: onlyuser?.user,
        foodData: newArr,
      };
      dispatch(usersOrder({ id: object.id, data: object }));
    }
  };
  return (
    <>
      {loadingState ? (
        <>
          <div className="user__main">
            <Link to={"/user-order"}>
              <WestIcon sx={{ fontSize: "35px" }} />
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
                    {food.loading === "reject" ? (
                      <div className="doneIcons">
                        <NotInterestedIcon />
                      </div>
                    ) : food.loading ? (
                      <div className="doneIcon">
                        <DoneOutlineIcon />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {!food.loading ? (
                    <div className="select_option">
                      <button
                        className="btn btn-danger"
                        onClick={() => foodStateReject(food)}
                      >
                        Otkl
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => foodStateAccert(food)}
                      >
                        prinyat 
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <span>Loading</span>
      )}
    </>
  );
};

export default User;
