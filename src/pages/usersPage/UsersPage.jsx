import React, { useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteUsersfood,
	fetchPosts,
	getUsersFoodData,
} from "../../redux/extraReducer/extraReducer";
import { useNavigate } from "react-router-dom";
import "./user.scss";
const UsersPage = ({ user }) => {
	const [visible, setVisible] = useState(0);

	console.log(Boolean(user));

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

	const test = (id) => {
		setVisible(id);
	};
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
								<div className="food__card__img" onClick={() => test(food.id)}>
									<img className="image" src={food.image} key={food.id} />
								</div>

								{user ? (
									user.email !== "admin@gmail.com" ? (
										<button
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
				</>
			)}
		</>
	);
};

export default UsersPage;
