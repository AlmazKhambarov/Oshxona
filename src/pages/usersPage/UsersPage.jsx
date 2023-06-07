import React, { useEffect } from "react";
import { auth } from "../../Api/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getUsersFoodData } from "../../redux/extraReducer/extraReducer";
import { useNavigate } from "react-router-dom";

const UsersPage = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, foodsData, postSuccsess } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsersFoodData());
  }, [postSuccsess]);

  const handelLogout = () => {
    auth.signOut();
  };
  return (
    <>
      {loading ? (
        <h1>Загрузка...</h1>
      ) : (
        <>
        <div className="logout">
        <button onClick={handelLogout} className="logoutBtn">Выйти</button>
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
              <div className={`food__card `} key={food.id}>
                <div className="food__card__img">
                  <img className="image" src={food.image} />
                </div>
                <div className="food__card__text">
                  {user ? (
                    user.email === "admin@gmail.com" ? (
                      <div>
                        <button
                          className="addProductButton btn btn-danger"
                          onClick={() => {}}
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
