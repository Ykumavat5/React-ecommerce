import React from "react";

const BottomCards = () => {

    return (

        // component BottomCards
        <section className="py-5">
            <div className="container-lg">
                <div className="row row-cols-1 row-cols-sm-3 row-cols-lg-5">
                    <div className="col d-flex">
                        <div className="card mb-3 border border-dark-subtle p-3 w-100">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use href="#package"></use></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>Free delivery</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card mb-3 border border-dark-subtle p-3 w-100">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use href="#secure"></use></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>100% secure payment</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card mb-3 border border-dark-subtle p-3 w-100">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use href="#quality"></use></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>Quality guarantee</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card mb-3 border border-dark-subtle p-3 w-100">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use href="#savings"></use></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>guaranteed savings</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="card mb-3 border border-dark-subtle p-3 w-100">
                            <div className="text-dark mb-3">
                                <svg width="32" height="32"><use href="#offers"></use></svg>
                            </div>
                            <div className="card-body p-0">
                                <h5>Daily offers</h5>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipi elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default BottomCards;