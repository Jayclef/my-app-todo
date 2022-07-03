import { useState } from "react";

const NameChange = () => {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const handleName = () => {
    const names = ["mazii", "prosper", "faguson", "justice"];
    const int = Math.floor(Math.random() * 3);
    setName(names[int]);
  };

  const countEvent = (e) => {
    setCount(count + 1);
  };

  const styled = () => {
    let classes = "badge m-2 badge-";
    classes += count === 0 ? "warning" : "primary";
    return classes;
  };
  return (
    <div>
      <p>Hello {name}! </p>
      <button onClick={handleName}> ChangeName </button>
      <span onClick={(e) => countEvent()} className={styled()}>
        {" "}
        {count} CLICK{" "}
      </span>
    </div>
  );
};

export default NameChange;
