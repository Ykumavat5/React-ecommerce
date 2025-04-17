import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-item  h-100">
            {/*  h-100 d-flex flex-column border p-2 */}
            <figure>
                <a href="index.html" title={product.title}>
                    <img src={product?.media} alt="Product Thumbnail" className="tab-image"
                        style={{ height: "200px", objectFit: "cover" }}
                    />
                </a>
            </figure>
            <div className="d-flex flex-column text-center">
                <h3 className="fs-6 fw-normal">{product.title}</h3>
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

                <div className="button-area p-3 pt-0">
                    <div className="row g-1 mt-2">
                        <div className="col-3">
                            <input type="number" name="quantity" className="form-control border-dark-subtle input-number quantity" defaultValue="1" />
                        </div>
                        <div className="col-7">
                            <a href="#user" className="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                                <svg width="18" height="18"><use href="#cart"></use></svg> Add to Cart
                            </a>
                        </div>
                        <div className="col-2">
                            <a href="#user" className="btn btn-outline-dark rounded-1 p-2 fs-6">
                                <svg width="18" height="18"><use href="#heart"></use></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
