import "./navbar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [menu, setmenu] = useState("home");
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <li
          onClick={() => setmenu("home")}
          className={menu == "home" ? "active" : ""}
        >
          home
        </li>
        <li
          onClick={() => setmenu("menu")}
          className={menu == "menu" ? "active" : ""}
        >
          menu
        </li>
        <li
          onClick={() => setmenu("mobile")}
          className={menu == "mobile" ? "active" : ""}
        >
          mobile
        </li>
        <li
          onClick={() => setmenu("contact")}
          className={menu == "contact" ? "active" : ""}
        >
          contact
        </li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
