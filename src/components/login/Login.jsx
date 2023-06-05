import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link} from "react-router-dom";
import { auth } from "../../Api/firebase";
import '../../assets/styles/Login.scss'
const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email  = e.target[0].value;
        const password = e.target[1].value;
    
        try {
          await signInWithEmailAndPassword(auth, email + '@gmail.com', password);
          navigate("/")
        } catch (err) {
          setErr(true);
        }
      };
  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit} className="form__group">
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <div >
        <button className="btn btn-primary">Sign in</button>
        {err && <span>Something went wrong</span>}
      <p>
        You don't have an account? <Link to="/register">Register</Link>
      </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
