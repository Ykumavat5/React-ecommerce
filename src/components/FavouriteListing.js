import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useFavourites from "./hooks/useFavourites";
import './hooks/ButtonStyles.css';
import { Link } from 'react-router-dom';

const FavouriteListing = () => {
    const [favourites, toggleFavourite] = useFavourites(); // <- get setFavourites too
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        const token = localStorage.getItem("token_organic");

        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/favourites", {
                headers: {
                    api_key: "123456789",
                    token,
                },
            });

            const result = res.data?.data?.result;
            if (res.data.data.code === 200) {

                setProducts(Array.isArray(result) ? result : []);
            } else {
                console.error("Error fetching products:");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleFavouriteClick = async (productId) => {
        await toggleFavourite(productId);
        setProducts(prev => prev.filter(product => product.id !== productId)); 
    };

    return (
        <section className="pb-5">
            <div className="container-lg" style={{ minHeight: "80vh" }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between my-4 ">
                            <h2 className="section-title">Favourite products</h2>
                        </div>
                        <nav aria-label="breadcrumb" className="mb-4">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">
                                        <i className="bi bi-house-door-fill"></i> Dashboard
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    View Product
                                </li>
                            </ol>
                        </nav>
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
                                                        alt={product.title}
                                                        className="tab-image w-100"
                                                        style={{ height: "200px", objectFit: "cover" }}
                                                    />
                                                </a>
                                            </figure>
                                            <div className="d-flex flex-column text-center flex-grow-1">
                                                <h3 className="fs-6 fw-normal product-title "
                                                    style={{
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        lineHeight: "1.2em",
                                                        height: "2.4em",
                                                    }}
                                                >{product.title}</h3>
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
                                                            <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                                                        </div>
                                                        <div className="col-7">
                                                            <a href="/dashboard" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                                                <svg width="18" height="18"><use href="#cart" /></svg> Add to Cart
                                                            </a>
                                                        </div>
                                                        <div className="col-2">
                                                            <button
                                                                onClick={() => handleFavouriteClick(product.id)}
                                                                className={`btn btn-outline-dark rounded-1 p-2 fs-6 ${favourites.includes(product.id) ? 'heart-black' : 'heart-white'}`}
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
        </section>
    );
};

export default FavouriteListing;
