import React, { useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import AdminPanel from "../AdminPanel/AdminPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  postFoodforUser,
} from "../../redux/extraReducer/extraReducer";
import "../../assets/styles/Home.css";
import { handleDeleteFood } from "../../redux/usersSlice/userSlice";

const Home = ({}) => {
  const { usersData, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0)
  const handelLogout = () => {
    auth.signOut();
  };
  const [data, setData] = useState([]);

  console.log(data);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
    console.log(user);
  }, []);
  const getFoodData = (food) => {
    setData((prev) => [...prev, food]);
    setQuantity(quantity+1)
  };

  const handleSelectedFoods = () => {
    if (data.length > 0) {
      const res = data.filter((el) => el.id !== el.id);
      dispatch(postFoodforUser(data));
    }
  };

  const handleDelete = (id) => {
    dispatch(handleDeleteFood(id));
  };

  return (
    <div className="home_main_container">
      {user ? (
        user.email === "admin@gmail.com" ? (
          <button className="addProductButton btn btn-primary">
            добавить еду
          </button>
        ) : null
      ) : null}
      <h1>Menu</h1>
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
              <span>{food.price}.000 Тыс</span>
            </div>
          </div>
        ))}
      </div>
      <hr style={{width:"100%", color:"white"}}/>
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
              <span>{food.name}</span>
              <span>{food.price}.000 Тыс</span>
            </div>
          </div>
        ))}
      </div>
      <button
        className=" addProductButton btn btn-primary"
      >
        Submit
      </button>
    </div>
  );
};

export default Home;
