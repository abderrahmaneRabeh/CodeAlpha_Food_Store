import "./navbar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

// eslint-disable-next-line react/prop-types
const Navbar = ({ setshowLogin }) => {
  const { getTotalCartAmount } = useContext(StoreContext);
  // eslint-disable-next-line no-unused-vars
  const [menu, setmenu] = useState("home");
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setmenu("home")}
          className={menu == "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setmenu("menu")}
          className={menu == "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#AppDownload"
          onClick={() => setmenu("mobile")}
          className={menu == "mobile" ? "active" : ""}
        >
          mobile
        </a>
        <a
          href="#footer"
          onClick={() => setmenu("contact")}
          className={menu == "contact" ? "active" : ""}
        >
          contact
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setshowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
