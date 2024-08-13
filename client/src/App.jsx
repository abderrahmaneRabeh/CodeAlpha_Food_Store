import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import PlaceOlder from "./pages/placeOolder/PlaceOlder";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";
import Login from "./components/Login/Login";
import Verify from "./pages/Verify/Verify";
import NotFound from "./pages/NotFound/NotFound";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
  const [showLogin, setshowLogin] = useState(false);
  const [showBtn, setshowBtn] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
        setshowBtn(1);
      } else {
        setshowBtn(0);
      }
    });
  });
  return (
    <>
      {showLogin && <Login setshowLogin={setshowLogin} />}
      <div id="up" className="app">
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOlder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />

      <a style={{ opacity: showBtn, transition: "1s" }} href="#up">
        <button className="scroll-top">
          <i
            style={{ fontSize: "1.2rem" }}
            className="fa-solid fa-arrow-up fa-lg"
          ></i>
        </button>
      </a>
    </>
  );
}

export default App;
