import React from "react";
import { Link } from "react-router-dom";

function Category(props) {
  const title = props.title || "";

  const matchesCategory =
    title.startsWith("Roasted") ||
    title.startsWith("Raw") ||
    title.startsWith("Dates") ||
    title.startsWith("Candies") ||
    title.startsWith("Chocolate") ||
    title.startsWith("Chinese") ||
    title.startsWith("Seeds") ||
    title.startsWith("Dried");

  let linkPath = "/";

  if (!title) {
    linkPath = "/";
  } else if (matchesCategory) {
    linkPath = `/displaySpecificProducts/${title}`;
  } else {
    linkPath = `/item/${props.name_of_the_category}/${title}`;
  }

  // ✅ DELETE PRODUCT (backend call)
  const handleRemove = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/products/delete-product",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Product_id: props.id,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        return;
      }

      // update UI in parent
      if (props.onRemove) {
        props.onRemove(props.id);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="Category" style={{ cursor: "pointer" }}>
      <Link to={linkPath}>
        <img
          src={props.image}
          alt={title}
          style={{ width: "270px", height: "200px", objectFit: "cover" }}
        />
      </Link>

      {props.nameOfTheUser === "HassanAtouiAdmin" && (
        <button
          onClick={handleRemove}
          style={{ marginTop: "10px", cursor: "pointer" }}
        >
          Remove
        </button>
      )}

      <p>{title}</p>
    </div>
  );
}

export default Category;
