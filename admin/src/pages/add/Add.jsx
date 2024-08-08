import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Add() {
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));

    const res = await axios.post(
      "http://localhost:4000/api/food/add",
      formData
    );

    if (res.data.success) {
      setdata({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      setimage(false);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="add">
      <form onSubmit={OnSubmitHandler} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={handleChange}
            type="text"
            required
            value={data.name}
            placeholder="Enter product name"
            name="name"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Enter description"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select onChange={handleChange} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwish">Sandwish</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles  ">Noodles </option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Price</p>
            <input
              value={data.price}
              onChange={handleChange}
              name="price"
              type="number"
              required
              placeholder="Enter price"
            />
          </div>
        </div>
        <button className="add-btn" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Add;
