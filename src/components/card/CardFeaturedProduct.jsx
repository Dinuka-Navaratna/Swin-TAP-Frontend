import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CardFeaturedProduct = (props) => {
  const vid = props.vid;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/api/vehicle?page=1&limit=5&inspection=true`,
        headers: {}
      };

      try {
        const response = await axios.request(config);
        // Assuming the structure is response.data.data.data
        const fetchedProducts = response.data.data.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">
        Other AutoAssured Vehicles
      </div>
      <div className="card-body">
        {products.filter(product => product._id !== vid).map((product, idx) => (
          <div className={`row ${idx + 1 === products.length ? "" : "mb-3"}`} key={product._id}>
            <div className="col-md-4">
              <img
                src={product.files[0]?.new_filename ? `${process.env.REACT_APP_API_URL}/uploads/300x300/${product.files[0].new_filename}` : '../../images/products/vehicle.jpg'}
                className="img-fluid"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <h6 className="text-capitalize mb-1">
                <Link to={`/listing/${product._id}`} className="text-decoration-none">
                  {product.title}
                </Link>
              </h6>
              <div className="mb-2">
                <span className="fw-bold h5">${product.price}</span>&nbsp;&nbsp;&nbsp;
                {product.inspection_status === "completed" ? (
                  <>
                    <i className="bi bi-patch-check-fill text-success me-1" />
                    AutoAssured
                  </>
                ) : (
                  null
                )}
              </div>
              <p className="small">
                {product.address}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeaturedProduct;
