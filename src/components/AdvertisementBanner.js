import React, { useState, useEffect } from "react";
import useHome from "./reuse/HomePageApi";

const AdvertisementBanner = () => {
    const { homePage } = useHome();
    const [banner1, setBanner1] = useState(null);
    const [banner2, setBanner2] = useState(null);
    const [banner3, setBanner3] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await homePage();
            if (response.success) {
                const banners = response.data.data?.banners || [];

                const bannerOne = banners.find(b => b.name === "Sale banner 1") || null;
                setBanner1(bannerOne);
                const bannerTwo = banners.find(b => b.name === "Sale banner 2") || null;
                setBanner2(bannerTwo);
                const bannerThree = banners.find(b => b.name === "Sale banner 3") || null;
                setBanner3(bannerThree);
               
            } else {
                console.error("Failed to fetch banners:", response.error);
            }
        };

        fetchData();
    }, [homePage]);

    return (
        <section className="py-3">
            <div className="container-lg">
                <div className="row">
                    <div className="col-md-12">
                        <div className="banner-blocks">
                            {/* Sale Banner 1 */}
                            <div
                                className="banner-ad d-flex align-items-center large bg-info block-1"
                                style={{
                                    backgroundImage: `url(${banner1?.media || '/assets/images/banner-ad-2.jpg'})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            >
                                <div className="banner-content p-5">
                                    <div className="content-wrapper text-light">
                                        <h3 className="banner-title text-light">{banner1?.title || "Items on SALE"}</h3>
                                        <p>{banner1?.description || "Discounts up to 30%"}</p>
                                        <a href="#product-grid" className="btn-link text-white">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* Sale Banner 2 */}
                            <div
                                className="banner-ad bg-success-subtle block-2"
                                style={{
                                    backgroundImage: `url(${banner2?.media || '/assets/images/banner-ad-2.jpg'})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            >
                                <div className="banner-content align-items-center p-5">
                                    <div className="content-wrapper text-light">
                                        <h3 className="banner-title text-light">{banner2?.title || "Combo offers"}</h3>
                                        <p>{banner2?.description || "Discounts up to 50%"}</p>
                                        <a href="#product-grid" className="btn-link text-white">Shop Now</a>
                                    </div>
                                </div>
                            </div>

                            {/* Sale Banner 3 */}
                            <div
                                className="banner-ad bg-danger block-3"
                                style={{
                                    backgroundImage: `url(${banner3?.media || '/assets/images/banner-ad-3.jpg'})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }}
                            >
                                <div className="banner-content align-items-center p-5">
                                    <div className="content-wrapper text-light">
                                        <h3 className="banner-title text-light">{banner3?.title || "Discount Coupons"}</h3>
                                        <p>{banner3?.description || "Discounts up to 40%"}</p>
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
};

export default AdvertisementBanner;
