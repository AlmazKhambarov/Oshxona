import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../Api/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAndProfileAsync,
  userRegister,
} from "../../redux/extraReducer/extraReducer";
import { Link } from "react-router-dom";

const Register = () => {
  const { userSuccsess } = useSelector((state) => state.users);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(createUserAndProfileAsync({ email, password, userName }));
    dispatch(userRegister({ user: userName, foodData: [] }));
  }
  return (
    <div className="formWrapper">
      <form onSubmit={handleRegister} className="form__group">
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value.toLowerCase())}
        />
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
        <p>
          Do you have an account <Link to={"/"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
