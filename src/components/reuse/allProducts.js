import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    const fetchMoreProducts = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/products", {
                headers: { api_key: "123456789" },
                params: { limit: 10, offset }
            });

            if (res.data.data.length > 0) {
                setProducts(prev => [...prev, ...res.data.data]);
                setOffset(prev => prev + 10);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error(err);
        }
    }, [offset]);

    useEffect(() => {
        fetchMoreProducts();
    }, []);

    // Intersection Observer to trigger bottom loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchMoreProducts();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchMoreProducts, hasMore]);

    return (
        <section className="py-5">
            <div className="container-lg">
                <div className="row">
                    {products.map((product, index) => (
                        <div className="col-md-3 mb-4" key={index}>
                            <div className="card">
                                <img src={product.media} alt={product.title} className="card-img-top" />
                                <div className="card-body text-center">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div ref={loaderRef} className="text-center">
                    {hasMore ? <p>Loading more...</p> : <p>No more products.</p>}
                </div>
            </div>
        </section>
    );
};

export default AllProducts;
