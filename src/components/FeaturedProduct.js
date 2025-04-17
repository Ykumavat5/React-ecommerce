import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from "./reuse/ProductCard";
import axios from "axios";

const FeaturedProduct = () => {

    // const FeaturedProduct = [
    //     {
    //         title: "Greek Style Plain Yogurt",
    //         image: "/assets/images/product-thumb-10.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Pure Squeezed No Pulp Orange Juice",
    //         image: "/assets/images/product-thumb-11.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Fresh Oranges",
    //         image: "/assets/images/product-thumb-12.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Gourmet Dark Chocolate Bars",
    //         image: "/assets/images/product-thumb-13.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Fresh Green Celery",
    //         image: "/assets/images/product-thumb-14.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Sandwich Bread",
    //         image: "/assets/images/product-thumb-15.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Honeycrisp Apples",
    //         image: "/assets/images/product-thumb-16.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Whole Wheat Sandwich Bread",
    //         image: "/assets/images/product-thumb-17.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     },
    //     {
    //         title: "Honeycrisp Apples",
    //         image: "/assets/images/product-thumb-18.png",
    //         rating: 4.5,
    //         reviews: 222,
    //         oldPrice: 24.00,
    //         newPrice: 18.00,
    //         discountText: "10% OFF"
    //     }
    // ];

    const [FeaturedProducts, setFeatureProducts] = useState([]);

    const fetchFeatureProducts = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/featureProducts", {
                headers: { api_key: "123456789" },
            });
            setFeatureProducts(Array.isArray(res.data.data) ? res.data.data : []);


        } catch (error) {
            console.error("Error fetching featured products:", error);
            setFeatureProducts([]);
        }
    }, []);

    useEffect(() => {
        fetchFeatureProducts();
    }, [fetchFeatureProducts]);


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
                                    <button className="swiper-prev products-carousel-prev btn btn-primary">❮</button>
                                    <button className="swiper-next products-carousel-next btn btn-primary">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        {FeaturedProducts.length >= 1 ? (
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

                                {FeaturedProducts.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <ProductCard product={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center">No featured product available.</div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedProduct;
