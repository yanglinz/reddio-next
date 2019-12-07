import React from "react";
import classNames from "classnames";

import "./Clickable.css";

function Clickable(props) {
  const { onClick, focusOnlyOnTab } = props;

  const name = classNames("Clickable", {
    "Clickable-focusOnlyOnTab": focusOnlyOnTab
  });
  return (
    <button className={name} onClick={onClick}>
      {focusOnlyOnTab ? (
        <div tabIndex="-1">{React.Children.only(props.children)}</div>
      ) : (
        React.Children.only(props.children)
      )}
    </button>
  );
}

export default Clickable;
