import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddProduct() {
  const { category_id } = useParams(); // ✅ GET FROM URL

  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !image || !price) {
      setMessage("Please fill all required fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://roastery-website-upgraded-in-progress.onrender.com/api/products/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_name: productName,
            image: image,
            price_per_kg: parseFloat(price),
            description,
            categories_id: parseInt(category_id), // ✅ FROM URL
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage("Product added successfully!");

      setProductName("");
      setImage("");
      setPrice("");
      setDescription("");

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h2>Add New Product</h2>

      {/* Optional: show category for debugging */}
      <p style={{ color: "gray" }}>
        Category ID: {category_id}
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price per kg"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>

      {message && (
        <p style={{
          marginTop: "20px",
          color: message.includes("success") ? "green" : "red"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddProduct;
