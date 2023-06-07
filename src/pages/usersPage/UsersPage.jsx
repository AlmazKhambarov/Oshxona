import React, { useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsersfood,
  getUsersFoodData,
} from "../../redux/extraReducer/extraReducer";
import { useNavigate } from "react-router-dom";
import "./user.css";
const UsersPage = ({ user }) => {
  const [visible, setVisible] = useState(null);

  const dispatch = useDispatch();
  const { loading, foodsData, postSuccsess, deleteAction } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsersFoodData());
  }, [postSuccsess, deleteAction]);

  const handelLogout = () => {
    auth.signOut();
  };

  console.log(visible);
  return (
    <>
      {loading ? (
        <h1>Загрузка...</h1>
      ) : (
        <>
          <div className="logout">
            <button onClick={handelLogout} className="logoutBtn">
              Выйти
            </button>
          </div>
          {user ? (
            user.email === "admin@gmail.com" ? (
              <button
                className=" addProductButton btn btn-primary"
                style={{ margin: "10px 0px" }}
                onClick={() => navigate("/")}
              >
                {" "}
                добавить
              </button>
            ) : null
          ) : null}
          <div className="food">
            {foodsData?.map((food) => (
              <div
                className={`food__card ${visible === food.id ? "active" : ""}`}
                key={food.id}
              >
                <div className="food__card__img">
                  <img
                    className="image"
                    src={food.image}
                    key={food.id}
                    onClick={() => setVisible(food.id)}
                  />
                </div>

                {user ? (
                  user.email !== "admin@gmail.com" ? (
                    <p
                      style={{
                        visibility: visible === food.id ? "visible" : "hidden",
                        transition: ".3s",
                      }}
                      className="visible"
                    >
                      заказать
                    </p>
                  ) : null
                ) : null}

                <div className="food__card__text">
                  {user ? (
                    user.email === "admin@gmail.com" ? (
                      <div>
                        <button
                          className="addProductButton btn btn-danger"
                          onClick={() => dispatch(deleteUsersfood(food.id))}
                        >
                          Удалить
                        </button>
                      </div>
                    ) : null
                  ) : null}

                  <span>{food.name}</span>
                  <span>{food.price}.000 сум </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default UsersPage;
