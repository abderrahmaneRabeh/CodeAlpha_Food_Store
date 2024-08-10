import React, { useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = React.createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setcartItem] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [userName, setUserName] = useState("");
  const url = "http://localhost:4000";
  const [token, settoken] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setcartItem((prev) => {
        return { ...prev, [itemId]: 1 };
      });
    } else {
      setcartItem((prev) => {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      });
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  const getfood_list = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.get(`${url}/api/cart/list`, {
      headers: { token },
    });

    setcartItem(response.data.cartData);
  };

  useEffect(() => {
    async function fetchData() {
      await getfood_list();
      if (localStorage.getItem("token")) {
        settoken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
      if (localStorage.getItem("userName")) {
        setUserName(localStorage.getItem("userName"));
      }
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    food_list,
    cartItem,
    addToCart,
    removeFromCart,
    setcartItem,
    getTotalCartAmount,
    url,
    token,
    settoken,
    userName,
    setUserName,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
