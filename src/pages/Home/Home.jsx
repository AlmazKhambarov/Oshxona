import React, { useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import AdminPanel from "../AdminPanel/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from "@mui/icons-material/Notifications";
import testImg from '../../assets/images/img2.jpg'
import {
  getAllUsers,
  getUsersFoodData,
  getuserOrder,
  postFoodforUser,
  postObject,
} from "../../redux/extraReducer/extraReducer";
import "../../assets/styles/Home.css";
import {
  handleDeleteFood,
  pushToAllmenuList,
} from "../../redux/usersSlice/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Home = ({}) => {
  const { usersData, loading, postSuccsess, foodsData, userOrderFood } =
    useSelector((state) => state.users);

  console.log(usersData);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const handelLogout = () => {
    auth.signOut();
  };
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  console.log(postSuccsess);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const [user, setUser] = useState();
  console.log(userOrderFood);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
    dispatch(getUsersFoodData());
    dispatch(getuserOrder());
  }, []);

  const getFoodData = (food) => {
    setData((prev) => [...prev, food]);
    setQuantity(quantity + 1);
  };

  const handleSelectedFoods = () => {
    if (data.length > 0) {
      const res = data.filter((el) => el.id !== el.id);
      data.forEach((item) => {
        console.log(item);
        dispatch(postFoodforUser(item));
      });
    }
    navigate("/userpage");
    if (postSuccsess) {
      console.log(postSuccsess);
    }
  };

  const handleDelete = (id) => {
    dispatch(handleDeleteFood(id));
    setQuantity(quantity + 1);
  };

  const handleDeleteSelected = (id) => {
    var res = data.filter((el) => el.id !== id);
    setQuantity(quantity - 1);
    setData(res);
  };

  const hadlePush = (p) => {
    dispatch(pushToAllmenuList(p));
  };

  var pink = "red";
  return (
    <>
      {loading ? (
        <h1>Загрузка...</h1>
      ) : (
        <div className="home_main_container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>
              <Link to={"/userpage"}>Menu({foodsData?.length})</Link>
            </h1>
            <Link to={'/user-order'}>
              <p className="notification">
                <span>{userOrderFood?.length}</span>
                <NotificationsIcon sx={{ fontSize: 40, color: pink }} />
              </p>
            </Link>
          </div>
          <hr style={{ color: "white" }} />
          <div className="food">
            {usersData?.map((food) => (
              <div className={`food__card `} key={food.id}>
                <div className="food__card__img">
                  <img className="image" src={food.image} />
                  
                </div>
                <div className="food__card__text">
                  <div>
                    <button
                      className="addProductButton btn btn-primary"
                      onClick={() => handleDelete(food.id) || getFoodData(food)}
                    >
                      добавить
                    </button>
                  </div>
                  <span>{food.name}</span>
                  <span>{food.price}.000 сум </span>
                </div>
              </div>
            ))}
          </div>
          <hr style={{ width: "100%", color: "white" }} />
          <h3 style={{ color: "white", fontSize: "25px", margin: "20px 0px" }}>
            Выбрано<span style={{ margin: "0px 10px" }}>{quantity}</span>
          </h3>
          <div className="food">
            {data?.map((food) => (
              <div className={`food__card `} key={food.id}>
                <div className="food__card__img">
                  <img className="image" src={food.image} />
                </div>
                <div className="food__card__text">
                  <div>
                    <button
                      className="addProductButton btn btn-danger"
                      onClick={() => {
                        handleDeleteSelected(food.id) || hadlePush(food);
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                  <span>{food.name}</span>
                  <span>{food.price}.000 сум</span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="addProductButton btn btn-primary"
            onClick={handleSelectedFoods}
          >
            добавить
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
