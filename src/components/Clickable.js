import React from "react";

import "./Clickable.css";

function Clickable(props) {
  const { onClick } = props;
  return (
    <button className="Clickable" onClick={onClick}>
      {React.Children.only(props.children)}
    </button>
  );
}

export default Clickable;
