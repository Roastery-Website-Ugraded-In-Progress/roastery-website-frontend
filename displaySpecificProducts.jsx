import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Category from "./Category";
import Header from "./Header";

function DisplaySpecificProducts({ isValid2, nameOfTheUser }) {
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId,setCategoryId]=useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        console.log(`Fetching: ${title}`);
        const response = await fetch(
          `https://roastery-website-upgraded-in-progress.onrender.com/api/products/${title}`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
        
        if (Array.isArray(data) && data.length > 0) {
          console.log(data[0]?.Categories_id);
          setCategoryId(data[0].Categories_id);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.Product_id !== id));
  };

  return (
    <div>
      <Header isValid2={isValid2} nameOfTheUser={nameOfTheUser} />

      <div className="displayProducts">
        <div className="headerRow">
          <h1 className="Products">{title}</h1>

          {nameOfTheUser === "HassanAtouiAdmin" && (
            <button
            disabled={!categoryId}
            onClick={() => navigate(`/add-product/${categoryId}`)}
          >
            Add a Product
          </button>
          )}
        </div>

        {loading && <p>Loading {title}...</p>}

        {error && (
          <div style={{ color: "red", padding: "20px" }}>
            <h3>Error loading {title}:</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p>No products found in {title} category</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              padding: "20px",
            }}
          >
            {products.map((product) => (
              <Category
                key={product.Product_id}
                id={product.Product_id}               
                image={product.Image}
                title={product.Product_name}
                name_of_the_category={title}
                nameOfTheUser={nameOfTheUser}
                onRemove={handleRemove}               
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DisplaySpecificProducts;
