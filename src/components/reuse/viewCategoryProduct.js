import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { CartContext } from '../reuse/CartContext';
import ProductCard from './ProductCard';
import useFavourites from './useFavourites';

const ViewCategoryProduct = ({ categoryId ,searchQuery}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourites, toggleFavourite] = useFavourites();

  const { productId } = useParams(); // Optional, in case you're using it elsewhere

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const token = localStorage.getItem('token_organic');

      try {
        console.log("category passed in prop",categoryId);
        
        const res = await axios.get("http://localhost:3035/api/v1/user/products", {
            params: {
              ...(searchQuery ? { search: searchQuery } : {}),
              ...(categoryId ? { category_id: categoryId } : {})
            },
            headers: {
              api_key: '123456789',
              token,
            },
          });
          
        setProducts(res.data.data || []);
      } catch (err) {
        setError('Error loading products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId,searchQuery, productId]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-danger text-center py-5">{error}</div>;

  return (
    <div className="container py-5">
      <div className="row">
        <h3>Products</h3>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={product.id || index} className="col-12 col-sm-6 col-md-3 mb-4">
              <ProductCard
                product={product}
                favourites={favourites}
                toggleFavourite={toggleFavourite}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-5 fw-semibold fs-5 w-100">No products available.</div>
        )}
      </div>
    </div>
  );
};

export default ViewCategoryProduct;
