import { useContext, useEffect, useState } from "react";
import "./PlaceHolder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PlaceOlder() {
  const navigate = useNavigate();
  const { getTotalCartAmount, cartItem, token, food_list, url } =
    useContext(StoreContext);

  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleCHenge = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];

        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { token },
    });

    console.log(response.data);

    if (response.data.success) {
      const { session_url } = response.data;

      window.location.replace(session_url);
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <form onSubmit={onSubmitHandler} className="place-order">
      <div className="left">
        <p className="title">Delivery information</p>
        <div className="multi-fields">
          <input
            required
            type="text"
            value={data.firstName}
            onChange={handleCHenge}
            name="firstName"
            placeholder="First Name"
          />
          <input
            required
            type="text"
            value={data.lastName}
            onChange={handleCHenge}
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          type="email"
          value={data.email}
          onChange={handleCHenge}
          name="email"
          placeholder="Email Address"
        />
        <input
          required
          type="text"
          value={data.street}
          onChange={handleCHenge}
          name="street"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            value={data.city}
            onChange={handleCHenge}
            name="city"
            placeholder="City"
          />
          <input
            required
            type="text"
            value={data.state}
            onChange={handleCHenge}
            name="state"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            value={data.zipcode}
            onChange={handleCHenge}
            name="zipcode"
            placeholder="Zip Code"
          />
          <input
            required
            type="text"
            value={data.country}
            onChange={handleCHenge}
            name="country"
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          value={data.phone}
          onChange={handleCHenge}
          name="phone"
          placeholder="Phone"
        />
      </div>

      <div className="right">
        <div className="total">
          <h2>Cart Total</h2>
          <div className="group-total">
            <div className="total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Delivery</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Total</p>
              <p>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </p>
            </div>
          </div>
          <button type="submit">Pay Now</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOlder;
