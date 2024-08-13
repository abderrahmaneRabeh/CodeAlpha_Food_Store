import { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

function Order() {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:4000/api/order/allOrders"
    );

    if (response.data.success) {
      setOrders(response.data.orders);
    } else {
      toast.error(response.data.message);
    }
  };

  const statusHandler = async (id, status) => {
    const response = await axios.post(
      "http://localhost:4000/api/order/updateOrderStatus",
      {
        orderId: id,
        status,
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchData();
      setTimeout(() => window.location.reload(), 3500);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, idx) => (
          <div key={idx} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + " X " + item.quantity;
                  } else {
                    return item.name + " X " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>Amount : $ {order.amount}</p>
            <select
              name=""
              id=""
              onChange={(e) => statusHandler(order._id, e.target.value)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
