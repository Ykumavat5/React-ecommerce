import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from "./reuse/ProductCard";

const FeaturedProduct = () => {

    const FeaturedProducts = [
        {
            title: "Greek Style Plain Yogurt",
            image: "/assets/images/product-thumb-10.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Pure Squeezed No Pulp Orange Juice",
            image: "/assets/images/product-thumb-11.png",
            rating: 4.5,
            reviews: 222,
            oldPrice: 24.00,
            newPrice: 18.00,
            discountText: "10% OFF"
        },
        {
            title: "Fresh Oranges",
            image: "/assets/images/product-thumb-12.png",
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
        }
    ];

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
                                // <SwiperSlide key={index}>
                                //     <div className="product-item">
                                //         <figure>
                                //             <a href="index.html" title={product.title}>
                                //                 <img src={product.image} alt="Product Thumbnail" className="tab-image" />
                                //             </a>
                                //         </figure>
                                //         <div className="d-flex flex-column text-center">
                                //             <h3 className="fs-6 fw-normal">{product.title}</h3>
                                //             <div>
                                //                 <span className="rating">
                                //                     {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                                //                         <svg key={i} width="18" height="18" className="text-warning">
                                //                             <use href="#star-full"></use>
                                //                         </svg>
                                //                     ))}
                                //                     {product.rating % 1 !== 0 && (
                                //                         <svg width="18" height="18" className="text-warning">
                                //                             <use href="#star-half"></use>
                                //                         </svg>
                                //                     )}
                                //                 </span>
                                //                 <span>({product.reviews})</span>
                                //             </div>

                                //             <div className="d-flex justify-content-center align-items-center gap-2">
                                //                 <del>${product.oldPrice.toFixed(2)}</del>
                                //                 <span className="text-dark fw-semibold">${product.newPrice.toFixed(2)}</span>
                                //                 <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                                //                     {product.discountText}
                                //                 </span>
                                //             </div>

                                //             <div className="button-area p-3 pt-0">
                                //                 <div className="row g-1 mt-2">
                                //                     <div className="col-3">
                                //                         <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                                //                     </div>
                                //                     <div className="col-7">
                                //                         <a href="/dashboard" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                //                             <svg width="18" height="18"><use href="#cart"></use></svg> Add to Cart
                                //                         </a>
                                //                     </div>
                                //                     <div className="col-2">
                                //                         <a href="/dashboard" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                //                             <svg width="18" height="18"><use href="#heart"></use></svg>
                                //                         </a>
                                //                     </div>
                                //                 </div>
                                //             </div>
                                //         </div>
                                //     </div>
                                // </SwiperSlide>
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

export default FeaturedProduct;
