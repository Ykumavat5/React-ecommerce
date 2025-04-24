import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from "./hooks/ProductCard";
import useFavourites from "./hooks/useFavourites";
import axios from "axios";

const FeaturedProduct = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [favourites, toggleFavourite] = useFavourites();  // Get both favourites and toggleFavourite from the custom hook

    const fetchFeaturedProducts = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/featureProducts", {
                headers: { api_key: "123456789" },
            });
            setFeaturedProducts(Array.isArray(res.data.data) ? res.data.data : []);
        } catch (error) {
            console.error("Error fetching featured products:", error);
            setFeaturedProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <section id="featured-products" className="products-carousel">
            <div className="container-lg overflow-hidden py-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap justify-content-between my-4">
                            <h2 className="section-title">Featured products</h2>
                            <div className="d-flex align-items-center">
                                <a href="/dashboard" className="btn btn-primary me-2">View All</a>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev products-carousel-prev btn btn-primary mx-2">❮</button>
                                    <button className="swiper-next products-carousel-next btn btn-primary">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {featuredProducts.length > 0 ? (
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={20}
                                slidesPerView={5}
                                navigation={{
                                    nextEl: '.products-carousel-next',
                                    prevEl: '.products-carousel-prev',
                                }}
                                loop={true}
                                breakpoints={{
                                    0: { slidesPerView: 2 },
                                    576: { slidesPerView: 3 },
                                    768: { slidesPerView: 4 },
                                    992: { slidesPerView: 5 },
                                }}
                            >
                                {featuredProducts.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard 
                                            product={product} 
                                            favourites={favourites} 
                                            toggleFavourite={toggleFavourite}  // Pass toggleFavourite function to ProductCard
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center">No featured products available.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;
