import React from "react";

const AdvertisementBanner = () => {
    return (

        //  component AdvertisementBanners
        <section className="py-3">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">

                        <div className="banner-blocks">

                            <div className="banner-ad d-flex align-items-center large bg-info block-1" style={{backgroundImage: "url('/assets/images/banner-ad-1.jpg')",backgroundRepeat:" no-repeat", backgroundSize: "cover",}}>
                                <div className="banner-content p-5">
                                    <div className="content-wrapper text-light">
                                        <h3 className="banner-title text-light">Items on SALE</h3>
                                        <p>Discounts up to 30%</p>
                                        <a href="#product-grid" className="btn-link text-white">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="banner-ad bg-success-subtle block-2"
                                style={{
                                    backgroundImage: "url('/assets/images/banner-ad-2.jpg')",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }}
                            >
                                <div className="banner-content align-items-center p-5">
                                    <div className="content-wrapper text-light">
                                        <h3 className="banner-title text-light">Combo offers</h3>
                                        <p>Discounts up to 50%</p>
                                        <a href="#product-grid" className="btn-link text-white">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            <div className="banner-ad bg-danger block-3" style={{backgroundImage:"url('/assets/images/banner-ad-3.jpg')",background:" no-repeat",backgroundSize: "cover"}}>
                                <div className="banner-content align-items-center p-5">
                                    <div className="content-wrapper text-light">
                                        <h3 className="banner-title text-light">Discount Coupons</h3>
                                        <p>Discounts up to 40%</p>
                                        <a href="#product-grid" className="btn-link text-white">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
export default AdvertisementBanner;