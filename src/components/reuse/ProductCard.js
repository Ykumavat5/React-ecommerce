import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-item">
            <figure>
                <a href="index.html" title={product.title}>
                    <img src={product.image} alt="Product Thumbnail" className="tab-image" />
                </a>
            </figure>
            <div className="d-flex flex-column text-center">
                <h3 className="fs-6 fw-normal">{product.title}</h3>
                <div>
                    <span className="rating">
                        {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
                            <svg key={i} width="18" height="18" className="text-warning">
                                <use href="#star-full"></use>
                            </svg>
                        ))}
                        {product.rating % 1 !== 0 && (
                            <svg width="18" height="18" className="text-warning">
                                <use href="#star-half"></use>
                            </svg>
                        )}
                    </span>
                    <span>({product.reviews})</span>
                </div>

                <div className="d-flex justify-content-center align-items-center gap-2">
                    <del>${product.oldPrice.toFixed(2)}</del>
                    <span className="text-dark fw-semibold">${product.newPrice.toFixed(2)}</span>
                    <span className="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                        {product.discountText}
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
