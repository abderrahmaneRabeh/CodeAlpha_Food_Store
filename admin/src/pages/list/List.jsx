import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

function List() {
  const [list, setlist] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/api/food/list");

    if (response.data.success) {
      setlist(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const deleteFood = async (id) => {
    const response = await axios.post("http://localhost:4000/api/food/remove", {
      id,
    });

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchData();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="list flex-col add">
      <p>All Items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, idx) => {
          return (
            <div key={idx} className="list-table-format">
              <img src={`http://localhost:4000/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => deleteFood(item._id)} className="delete">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
