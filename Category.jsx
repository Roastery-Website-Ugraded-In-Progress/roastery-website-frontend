import React from "react";
import { Link } from "react-router-dom";

function Category(props) {
  const matchesCategory =
    props.title.startsWith("Roasted") ||
    props.title.startsWith("Raw") ||
    props.title.startsWith("Dates") ||
    props.title.startsWith("Candies") ||
    props.title.startsWith("Chocolate") ||
    props.title.startsWith("Chinese") ||
    props.title.startsWith("Seeds") ||
    props.title.startsWith("Dried");

  let linkPath = "/";

  if (props.title === "") {
    linkPath = "/";
  } else if (matchesCategory) {
    linkPath = `/displaySpecificProducts/${props.title}`;
  } else {
    linkPath = `/item/${props.name_of_the_category}/${props.title}`;
  }

  return (
    <div
      className="Category"
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
    >
      <Link to={linkPath}>
        <img
          src={props.image}
          alt={props.title}
          style={{ width: "270px", height: "200px", objectFit: "cover" }}
        />
      </Link>

      {props.nameOfTheUser === "HassanAtouiAdmin" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onRemove && props.onRemove(props.title);
          }}
          style={{ marginTop: "10px", cursor: "pointer" }}
        >
          Remove
        </button>
      )}

      <p>{props.title}</p>
    </div>
  );
}

export default Category;
