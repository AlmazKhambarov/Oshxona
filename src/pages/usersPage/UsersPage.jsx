import React, { useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import { signOut } from "firebase/auth";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUsersfood,
  fetchPosts,
  getUsersFoodData,
  usersOrder,
} from "../../redux/extraReducer/extraReducer";
import { useNavigate } from "react-router-dom";
import "./user.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "100vh",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  // p: 4,
};
const UsersPage = ({ user }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(0);
  const dispatch = useDispatch();
  // const [data, setData] = useState()
  const { loading, foodsData, postSuccsess, deleteAction, loadingOrder } =
    useSelector((state) => state.users);
  const [userOrderfood, setUserOrderfood] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getUsersFoodData());
  }, [postSuccsess, deleteAction]);

  const userOrder = (data) => {
    console.log(data);
    setUserOrderfood((prev) => [...prev, data]);
  };

  const handelLogout = () => {
    auth.signOut();
  };

  const uniqueIds = new Set();
  const updatedArray = userOrderfood?.filter((obj) => {
    if (!uniqueIds.has(obj.id)) {
      uniqueIds.add(obj.id);
      return true;
    }
    return false;
  });

  const finalySubmitUserOrderFood = () => {
    const res = [];
    var data = updatedArray?.map((el) => {
      let obj = {
        name: el.name,
        user: user.displayName,
        price: el.price,
        loading: false,
      };
      dispatch(usersOrder(obj));
    });
  };
  useEffect(() => {
    if (loadingOrder) {
      setOpen(false);
      setUserOrderfood([]);
    }
  }, [loadingOrder]);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  // chrome.runtime.sendMessage({ message: "Hello from Chrome extension" });
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
                <div
                  className="food__card__img"
                  onClick={() => setVisible(food.id)}
                >
                  <img className="image" src={food.image} key={food.id} />
                </div>

                {user ? (
                  user.email !== "admin@gmail.com" ? (
                    <button
                      onClick={() => userOrder(food)}
                      className={`${
                        visible === food.id ? "active" : "none"
                      } userButton`}
                    >
                      заказать
                    </button>
                  ) : null
                ) : null}

                <div className="food__card__text">
                  {user ? (
                    user.email === "admin@gmail.com" ? (
                      <div>
                        <button
                          className={`addProductButton btn btn-danger ${
                            visible === food.id ? "" : "active-btn"
                          } delete-btn`}
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
          {user ? (
            user.email !== "admin@gmail.com" ? (
              <>
                {updatedArray.length > 0 ? (
                  <>
                    <div className="seeOrder__container">
                      <button onClick={handleOpen}>Moy Zakaz</button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              onClick={handleClose}
                              style={{
                                color: "red",
                                fontSize: "25px",
                                border: "1px solid",
                                width: "",
                              }}
                            >
                              Закрыть
                            </Button>
                            <span className="userName">
                              {user ? user.displayName : null}
                            </span>
                          </div>
                          <hr />
                          <div className="foodss">
                            {updatedArray?.map((food) => (
                              <div className="food__cards">
                                <div className="food__menu">
                                  <img src={food.image} alt="" />
                                </div>
                                <div className="food__text">
                                  <span>{food.name}</span>
                                  <span>{food.price}.000 сум</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="main">
                            {loadingOrder === "pending" ? (
                              <button
                                className="btn btn-primary"
                                onClick={finalySubmitUserOrderFood}
                              >
                                загрузка
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary"
                                onClick={finalySubmitUserOrderFood}
                              >
                                Zakazat
                              </button>
                            )}
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </>
                ) : null}
              </>
            ) : null
          ) : null}
        </>
      )}
    </>
  );
};

export default UsersPage;
