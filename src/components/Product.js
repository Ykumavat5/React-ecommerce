import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Product = () => {
    const [products, setProducts] = useState([]);

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

                            {products.map((product, index) => {
                                return (
                                    // <div className="col" key={index}>
                                    //     <div className="product-item">
                                    //         <figure>
                                    //             <a href="index.html" title="Product Title">
                                    //                 <img src={product.media} alt="Product Thumbnail" className="tab-image" />
                                    //             </a>
                                    //         </figure>
                                    //         <div className="d-flex flex-column text-center">
                                    //             <h3 className="fs-6 fw-normal">{product?.title}</h3>
                                    //             <div>
                                    //                 <span className="rating">
                                    //                     <svg width="18" height="18" className="text-warning"><use href="#star-full"></use></svg>
                                    //                     <svg width="18" height="18" className="text-warning"><use href="#star-full"></use></svg>
                                    //                     <svg width="18" height="18" className="text-warning"><use href="#star-full"></use></svg>
                                    //                     <svg width="18" height="18" className="text-warning"><use href="#star-full"></use></svg>
                                    //                     <svg width="18" height="18" className="text-warning"><use href="#star-half"></use></svg>
                                    //                 </span>
                                    //                 <span>(222)</span>
                                    //             </div>
                                    //             <div className="d-flex justify-content-center align-items-center gap-2">
                                    //                 <del>${product.price}</del>
                                    //                 <span className="text-dark fw-semibold">${product.discounted_price ?? ''}</span>
                                    //                 <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">{product.discount_percentage}% OFF</span>
                                    //             </div>
                                    //             <div className="button-area p-3 pt-0">
                                    //                 <div className="row g-1 mt-2">
                                    //                     <div className="col-3"><input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" /></div>
                                    //                     <div className="col-7"><a href="/dashboard" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use href="#cart"></use></svg> Add to Cart</a></div>
                                    //                     <div className="col-2"><a href="/dashboard" className="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use href="#heart"></use></svg></a></div>
                                    //                 </div>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </div>
                                    <div className="col" key={index}>
                                        <div className="product-item h-100 d-flex flex-column border p-2">
                                            <figure>
                                                <a href="index.html" title="Product Title">
                                                    <img src={product.media} alt="Product Thumbnail" className="tab-image w-100"   style={{ height: '200px' }} 
 />
                                                </a>
                                            </figure>
                                            <div className="d-flex flex-column text-center flex-grow-1">
                                                <h3 className="fs-6 fw-normal">{product?.title}</h3>
                                                <div>
                                                    <span className="rating">
                                                        <svg width="18" height="18" className="text-warning"><use href="#star-full" /></svg>
                                                        <svg width="18" height="18" className="text-warning"><use href="#star-full" /></svg>
                                                        <svg width="18" height="18" className="text-warning"><use href="#star-full" /></svg>
                                                        <svg width="18" height="18" className="text-warning"><use href="#star-full" /></svg>
                                                        <svg width="18" height="18" className="text-warning"><use href="#star-half" /></svg>
                                                    </span>
                                                    <span>(222)</span>
                                                </div>
                                                <div className="d-flex justify-content-center align-items-center gap-2">
                                                    <del>${product.price}</del>
                                                    <span className="text-dark fw-semibold">${product.discounted_price ?? ''}</span>
                                                    <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">{product.discount_percentage}% OFF</span>
                                                </div>

                                                {/* Push button area to the bottom */}
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
                                                            <a href="/dashboard" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                                                <svg width="18" height="18"><use href="#heart" /></svg>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                            )}

                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;