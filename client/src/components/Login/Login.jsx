import { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Login({ setshowLogin }) {
  const [currState, setcurrState] = useState("login");

  const { url, settoken, setUserName } = useContext(StoreContext);

  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    let NewUrl = url;

    if (currState === "login") {
      NewUrl += "/api/user/login";
    } else {
      NewUrl += "/api/user/register";
    }

    const response = await axios.post(NewUrl, data);

    if (response.data.success) {
      settoken(response.data.token);

      localStorage.setItem("token", response.data.token);
      setshowLogin(false);

      setUserName(response.data.user.name);
      localStorage.setItem("userName", response.data.user.name);

      setdata({
        name: "",
        email: "",
        password: "",
      });
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={OnSubmitHandler} className="login-container">
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
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="your name"
              required
            />
          )}

          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="your email"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>I agree to the terms & conditions</p>
        </div>

        {currState === "Sign Up" ? (
          <p className="changeIt" onClick={() => setcurrState("login")}>
            Already have an account?
          </p>
        ) : (
          <p className="changeIt" onClick={() => setcurrState("Sign Up")}>
            Don`t have an account?
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
