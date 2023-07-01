import React from "react";

const Helmet = (props) => {
  document.title = "Rent Car Service - " + props.title;
  return <div class="w-full">{props.children}</div>;
};

export default Helmet;
