import React, { useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = React.createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setcartItem] = useState({});
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:4000";
  const [token, settoken] = useState("");

  const addToCart = (itemId) => {
    if (!cartItem[itemId]) {
      setcartItem((prev) => {
        return { ...prev, [itemId]: 1 };
      });
    } else {
      setcartItem((prev) => {
        return { ...prev, [itemId]: prev[itemId] + 1 };
      });
    }
  };

  const removeFromCart = (itemId) => {
    setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
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
    console.log("data", response.data.data);
  };

  useEffect(() => {
    async function fetchData() {
      await getfood_list();
      if (localStorage.getItem("token")) {
        settoken(localStorage.getItem("token"));
      }
    }
    fetchData();
    console.log(food_list);
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
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {/* eslint-disable-next-line react/prop-types */}
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
