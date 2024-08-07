import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
// eslint-disable-next-line react/prop-types
function ExploreMenu({ category, setcategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-p">Choose Your Favourite</p>
      <div className="explore-menu-list">
        {menu_list.map((item, idx) => (
          <div
            onClick={() => {
              setcategory((prev) =>
                prev == item.menu_name ? "all" : item.menu_name
              );
            }}
            key={idx}
            className="explore-menu-lis-item"
          >
            <img
              className={category == item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt=""
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
