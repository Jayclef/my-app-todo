//import { FaTrashAlt } from "react-icons/";
import ItemList from "./ItemList";

const Item = ({ items, handleChange, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <ItemList
              item={item}
              handleDelete={handleDelete}
              handleChange={handleChange}
              key={item.id}
            />
          ))}
        </ul>
      ) : (
        <p style={{ color: "red", marginTop: "2rem" }}>
          No item Available On Shopping Cart
        </p>
      )}
    </>
  );
};

export default Item;
