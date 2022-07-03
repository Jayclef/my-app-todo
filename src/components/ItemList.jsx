const ItemList = ({ item, handleDelete, handleChange }) => {
  return (
    <li className="item" key={item.id}>
      <input
        type="checkbox"
        onChange={() => handleChange(item.id)}
        checked={item.checked}
      />
      <label
        style={item.checked ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleChange(item.id)}
      >
        {item.item}{" "}
      </label>
      <button onClick={() => handleDelete(item.id)}>Delete</button>
    </li>
  );
};

export default ItemList;
