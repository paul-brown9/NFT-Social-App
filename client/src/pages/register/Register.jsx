import { useRef } from "react";
import "./register.css";
import axios from "axios";
import {useHistory} from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords do not match");
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try{
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch(err){
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Ignite</h3>
          <span className="loginDesc">
            Connect with artists around the world
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required type="email" ref={email} className="loginInput" />
            <input placeholder="Password" required type="password" ref={password} className="loginInput" minLength="6" />
            <input placeholder="Repeat Password" type="password" required ref={passwordAgain} className="loginInput" minLength="6"/>
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
