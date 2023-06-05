import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Api/firebase";
import { useDispatch } from "react-redux";
import { createUserAndProfileAsync } from "../../redux/extraReducer/extraReducer";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('')
  
  const dispatch = useDispatch()


  const handleRegister = (e) => {
    e.preventDefault()
    dispatch(createUserAndProfileAsync({email, password, userName}))
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
