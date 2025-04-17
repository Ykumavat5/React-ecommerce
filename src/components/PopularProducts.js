import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from './reuse/ProductCard';  // <-- import the reusable component!

const PopularProduct = () => {

    const PopularProducts = [
        {
            title: "Sandwich Bread",
            image: "/assets/images/product-thumb-15.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Honeycrisp Apples",
            image: "/assets/images/product-thumb-16.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Whole Wheat Sandwich Bread",
            image: "/assets/images/product-thumb-17.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Honeycrisp Apples",
            image: "/assets/images/product-thumb-18.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Fresh Green Celery",
            image: "/assets/images/product-thumb-14.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Sunstar Fresh Melon Juice",
            image: "/assets/images/product-thumb-19.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Gourmet Dark Chocolate Bars",
            image: "/assets/images/product-thumb-13.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
    ];

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
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={5}
                            navigation={{
                                nextEl: '.popular-products-next',
                                prevEl: '.popular-products-prev',
                            }}
                            loop={true}
                            breakpoints={{
                                0: { slidesPerView: 2 },
                                576: { slidesPerView: 3 },
                                768: { slidesPerView: 4 },
                                992: { slidesPerView: 5 },
                            }}
                        >
                            {PopularProducts.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PopularProduct;
