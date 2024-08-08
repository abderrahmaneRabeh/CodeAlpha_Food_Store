import { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";

// eslint-disable-next-line react/prop-types
function Login({ setshowLogin }) {
  const [currState, setcurrState] = useState("login");
  return (
    <div className="login">
      <form className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-input">
          {currState === "Sign Up" && (
            <input type="text" placeholder="your name" required />
          )}

          <input type="email" placeholder="your email" required />
          <input type="password" placeholder="password" required />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>I agree to the terms & conditions</p>
        </div>
        <p>
          {currState === "Sign Up" ? (
            <p className="changeIt" onClick={() => setcurrState("Login")}>
              Already have an account?
            </p>
          ) : (
            <p className="changeIt" onClick={() => setcurrState("Sign Up")}>
              Don`t have an account?
            </p>
          )}
        </p>
      </form>
    </div>
  );
}

export default Login;
