import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from '../AuthContext';

const MainBanner = () => {
    const { user } = useAuth();

    const [banner, setBanner] = useState([]);

    const fetchBanner = useCallback(async () => {
        try {
            const res = await axios.get("http://localhost:3035/api/v1/user/banner", {
                headers: { api_key: "123456789" },
            });
            const fetchedData = Array.isArray(res.data.data) ? res.data.data : [];
            setBanner(fetchedData);
            console.log(fetchedData); // <- logs the actual data
        } catch (error) {
            console.error("Error fetching categorys:", error);
            setBanner([]);
        }
    }, []);

    useEffect(() => {
        fetchBanner();
    }, [fetchBanner]);

    return (
        <>
            {/* component MainBanner  */}
            <section
                style={{
                    backgroundImage: `url(${banner[0]?.media})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-6 pt-5 mt-5">
                            <h2 className="display-1 ls-1"><span className="fw-bold text-primary">Organic</span> Foods at your <span className="fw-bold">Doorsteps</span></h2>
                            <p className="fs-4">Dignissim massa diam elementum.</p>
                            <div className="d-flex gap-3">
                                <a href="#category-list" className="btn btn-primary text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">Start Shopping</a>
                                {!user && (
                                    <a href="/login" className="btn btn-dark text-uppercase fs-6 rounded-pill px-4 py-3 mt-3">Join Now</a>
                                )}
                            </div>
                            <div className="row my-5">
                                <div className="col">
                                    <div className="row text-dark">
                                        <div className="col-auto"><p className="fs-1 fw-bold lh-sm mb-0">14k+</p></div>
                                        <div className="col"><p className="text-uppercase lh-sm mb-0">Product Varieties</p></div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row text-dark">
                                        <div className="col-auto"><p className="fs-1 fw-bold lh-sm mb-0">50k+</p></div>
                                        <div className="col"><p className="text-uppercase lh-sm mb-0">Happy Customers</p></div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="row text-dark">
                                        <div className="col-auto"><p className="fs-1 fw-bold lh-sm mb-0">10+</p></div>
                                        <div className="col"><p className="text-uppercase lh-sm mb-0">Store Locations</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-3 g-0 justify-content-center">
                        <div className="col">
                            <div className="card border-0 bg-primary rounded-0 p-4 text-light">
                                <div className="row">
                                    <div className="col-md-3 text-center">
                                        <svg width="60" height="60"><use href="#fresh"></use></svg>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body p-0">
                                            <h5 className="text-light">Fresh from farm</h5>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card border-0 bg-secondary rounded-0 p-4 text-light">
                                <div className="row">
                                    <div className="col-md-3 text-center">
                                        <svg width="60" height="60"><use href="#organic"></use></svg>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body p-0">
                                            <h5 className="text-light">100% Organic</h5>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card border-0 bg-danger rounded-0 p-4 text-light">
                                <div className="row">
                                    <div className="col-md-3 text-center">
                                        <svg width="60" height="60"><use href="#delivery"></use></svg>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body p-0">
                                            <h5 className="text-light">Free delivery</h5>
                                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
}

export default MainBanner;