import React from "react";

const DownloadAppBanner = () => {
    return (

        // component DownloadBanner
        <section className="pb-4 my-4">
            <div className="container-lg">

                <div className="bg-warning pt-5 rounded-5">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-4">
                                <h2 className="mt-5">Download Organic App</h2>
                                <p>Online Orders made easy, fast and reliable</p>
                                <div className="d-flex gap-2 flex-wrap mb-5">
                                    <a href="/dashboard" title="App store"><img src="/assets/images/img-app-store.png" alt="app-store"/></a>
                                    <a href="/dashboard" title="Google Play"><img src="/assets/images/img-google-play.png" alt="google-play"/></a>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <img src="/assets/images/banner-onlineapp.png" alt="phone" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default DownloadAppBanner;