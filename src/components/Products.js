import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useFavourites from "./reuse/useFavourites";
import './reuse/ButtonStyles.css';

const Product = () => {
    const [favourites, setFavourites] = useFavourites();
    const [products, setProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);

    // Handle the change in quantity input
    const handleQuantityChange = (e) => {
        const value = Math.max(1, e.target.value); // Ensure quantity is always >= 1
        setQuantity(value);
    };

    // Handle adding product to cart
    const handleAddToCart = async (product_id, quantity) => {
        const token = localStorage.getItem("token_organic");

        try {
            // Make a POST request to add the product to the cart
            const res = await axios.post(
                "http://localhost:3035/api/v1/user/cart/add",
                {
                    product_id,
                    quantity, // Send the product ID and quantity
                },
                {
                    headers: {
                        api_key: "123456789",
                        token,
                    },
                }
            );

            // Optionally, you can handle the response here (e.g., show a success message)
            console.log('Product added to cart:', res.data);
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };



    const handleToggleFavourite = async (productId) => {
        const token = localStorage.getItem("token_organic");

        // Optimistically update UI
        setFavourites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId) // remove
                : [...prev, productId]               // add
        );

        try {
            const res = await axios.post(
                "http://localhost:3035/api/v1/user/toggleFavourite",
                { product_id: productId },
                {
                    headers: {
                        api_key: "123456789",
                        token,
                    },
                }
            );

            if (res.status === 200) {
                console.log(res.data.message || "Toggled favourite!");
                // You can optionally sync state with res here again if needed
            }
        } catch (error) {
            console.error("Error toggling favourite:", error);

            // Rollback UI change in case of error
            setFavourites(prev =>
                prev.includes(productId)
                    ? [...prev, productId]   // re-add if remove failed
                    : prev.filter(id => id !== productId) // re-remove if add failed
            );
        }
    };

    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/products", {
                headers: { api_key: "123456789" },
            });
            setProducts(Array.isArray(res.data.data) ? res.data.data : []);

        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (

        // component Products
        <section className="pb-5">
            <div className="container-lg">

                <div className="row">
                    <div className="col-md-12">

                        <div className="section-header d-flex flex-wrap justify-content-between my-4 ">

                            <h2 className="section-title">Best selling products</h2>

                            <div className="d-flex align-items-center">
                                <a href="/dashboard" className="btn btn-primary rounded-1">View All</a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">

                        <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5" id="product-grid">

                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div className="col" key={index}>
                                        <div className="product-item h-100 d-flex flex-column border p-2">
                                            <figure>
                                                <a href={`/product/${product.id}`} title={product.title}>
                                                    <img
                                                        src={product.media}
                                                        alt="Product Thumbnail"
                                                        className="tab-image w-100"
                                                        style={{ height: "200px", objectFit: "cover" }}
                                                    />
                                                </a>
                                            </figure>
                                            <div className="d-flex flex-column text-center flex-grow-1">
                                                <h3 className="fs-6 fw-normal">{product?.title}</h3>
                                                <div>
                                                    <span className="rating">
                                                        {Array.from({ length: Math.floor(product.avg_ratings || 0) }).map((_, i) => (
                                                            <svg key={`full-${i}`} width="18" height="18" className="text-warning">
                                                                <use href="#star-full" />
                                                            </svg>
                                                        ))}
                                                        {product.avg_ratings % 1 >= 0.5 && (
                                                            <svg key="half" width="18" height="18" className="text-warning">
                                                                <use href="#star-half" />
                                                            </svg>
                                                        )}
                                                        {Array.from({ length: 5 - Math.ceil(product.avg_ratings || 0) }).map((_, i) => (
                                                            <svg key={`empty-${i}`} width="18" height="18" className="text-muted">
                                                                <use href="#star-empty" />
                                                            </svg>
                                                        ))}
                                                    </span>
                                                    <span>
                                                        {product.avg_ratings !== "00.00" && product.avg_ratings !== "0.00"
                                                            ? `(${product.avg_ratings})`
                                                            : "(0)"}
                                                    </span>

                                                </div>
                                                <div className="d-flex justify-content-center align-items-center gap-2">
                                                    {product?.discounted_price ? (
                                                        <del>$ {product?.price}</del>
                                                    ) : (
                                                        <span className="text-dark fw-semibold">${product?.price}</span>
                                                    )}
                                                    <span className="text-dark fw-semibold">{product?.discounted_price ? "$" + product?.discounted_price : ""}</span>
                                                    <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                                                        {product?.discount_percentage ? product?.discount_percentage + "% off" : ""}
                                                    </span>
                                                </div>
                                                <div className="button-area p-3 pt-0 mt-auto">
                                                    <div className="row g-1 mt-2">

                                                        <div className="col-3">
                                                            <input
                                                                type="number"
                                                                name="quantity"
                                                                className="form-control border-dark-subtle input-number quantity"
                                                                value={quantity} // Controlled input
                                                                onChange={handleQuantityChange} // Update quantity on change
                                                                min="1" // Ensure the quantity is at least 1
                                                            />
                                                        </div>

                                                        {/* Add to Cart Button */}
                                                        <div className="col-7">
                                                            <button
                                                                onClick={() => handleAddToCart(product.id, quantity)} // Call function with product id and quantity
                                                                className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"
                                                            >
                                                                <svg width="18" height="18"><use href="#cart" /></svg> Add to Cart
                                                            </button>
                                                        </div>

                                                    {/* <div className="col-3">
                                                            <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                                                        </div>
                                                        <div className="col-7">
                                                            <a href="/dashboard" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                                                <svg width="18" height="18"><use href="#cart" /></svg> Add to Cart
                                                            </a>
                                                        </div> */}
                                                    {/* <div className="col-2">
                                                            <a href="/dashboard" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                                                <svg width="18" height="18"><use href="#heart" /></svg>
                                                            </a>
                                                        </div> */}
                                                    <div className="col-2">
                                                        <button
                                                            onClick={() => handleToggleFavourite(product.id)}
                                                            className={`btn btn-outline-dark rounded-1 p-2 fs-6 ${favourites.includes(product.id) ? 'heart-black' : 'heart-white'}`}
                                                        // style={favourites.includes(product.id) ? blackBgWhiteHeart : whiteBgBlackHeart}
                                                        >
                                                            <svg width="18" height="18">
                                                                <use href="#heart" />
                                                            </svg>
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                        ))
                        ) : (
                        <div className="text-center py-5 fw-semibold fs-5 w-100">No products available.</div>
                            )}

                    </div>


                </div>
            </div>
        </div>
        </section >
    );
}

export default Product;