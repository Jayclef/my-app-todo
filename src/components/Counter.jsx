import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  // constructor(){
  //     super()
  //     this.handleIncrement = this.handleIncrement.bind(this)
  // }
  const handleIncrement = (e) => {
    setCount(count + 1);
  };

  const getBadgeClassess = () => {
    let classes = "badge m-2 badge-";
    classes += count === 0 ? "warning" : "primary";
    return classes;
  };
  const formatCount = () => {
    return count === 0 ? "zero" : count;
  };

  return (
    <div>
      <span className={getBadgeClassess()}>{formatCount()}</span>
      <button
        className="btn btn-secondary btn-sm"
        onClick={(e) => handleIncrement()}
      >
        increment
      </button>
    </div>
  );
};

export default Counter;
