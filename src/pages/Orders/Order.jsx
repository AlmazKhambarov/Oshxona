import React from "react";
import { useSelector } from "react-redux";

const Order = ({ user }) => {
  const { foodsData } = useSelector((state) => state.user);
  return (
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
  );
};

export default Order;
