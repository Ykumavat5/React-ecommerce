import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from './reuse/ProductCard';
import axios from "axios";
import useFavourites from './reuse/useFavourites';
import useCart from "./reuse/AddToCart";

const PopularProduct = () => {
    const { addToCart } = useCart();
    const [popularProducts, setPopularProducts] = useState([]);
    const [favourites, setFavourites] = useFavourites();

    const fetchPopularProducts = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/popularProducts", {
                headers: { api_key: "123456789" },
            });
            setPopularProducts(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setPopularProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchPopularProducts();
    }, [fetchPopularProducts]);

    return (
        <section id="popular-products" className="products-carousel">
            <div className="container-lg overflow-hidden py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between my-4">
                            <h2 className="section-title">Popular products</h2>
                            <div className="d-flex align-items-center">
                                <a href="/dashboard" className="btn btn-primary me-2">View All</a>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev popular-products-prev btn btn-primary">❮</button>
                                    <button className="swiper-next popular-products-next btn btn-primary">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {popularProducts.length > 0 ? (
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={20}
                                slidesPerView={5}
                                navigation={{
                                    nextEl: '.popular-products-next',
                                    prevEl: '.popular-products-prev',
                                }}
                                loop={false}
                                breakpoints={{
                                    0: { slidesPerView: 2 },
                                    576: { slidesPerView: 3 },
                                    768: { slidesPerView: 4 },
                                    992: { slidesPerView: 5 },
                                }}
                            >
                                {popularProducts.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard 
                                            product={product} 
                                            favourites={favourites} 
                                            setFavourites={setFavourites}
                                            addToCart={addToCart} // This is where you pass the addToCart function
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center py-5 fw-semibold fs-5 w-100">No products available.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PopularProduct;
