import React from "react";
// , { useState, useEffect, useCallback }
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// import axios from "axios";
import useCategories from "./reuse/useCategories";

const Categorys = () => {

  const categorys = useCategories();

  const shouldLoop = categorys.length > 5;

  return (
    <section className="py-5 overflow-hidden" id="category-list">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between mb-5">
              <h2 className="section-title">Category</h2>
              <div className="d-flex align-items-center">
                <a href="/dashboard" className="btn btn-primary me-2">
                  View All
                </a>
                {shouldLoop && (
                  <div className="swiper-buttons">
                    <button className="swiper-prev category-carousel-prev btn btn-yellow">❮</button>
                    <button className="swiper-next category-carousel-next btn btn-yellow">❯</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {categorys.length >= 1 ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
            navigation={
              shouldLoop
                ? {
                    nextEl: ".category-carousel-next",
                    prevEl: ".category-carousel-prev",
                  }
                : false
            }
            loop={shouldLoop}
            breakpoints={{
              0: { slidesPerView: 2 },
              576: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              992: { slidesPerView: 5 },
            }}
          >
            {categorys.map((cat, index) => (
              <SwiperSlide key={index}>
                <a href="category.html" className="nav-link text-center">
                  <img src={cat.image} className="rounded-circle" alt="Category Thumbnail" />
                  <h4 className="fs-6 mt-3 fw-normal category-title">{cat.name}</h4>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center">No categories available.</div>
        )}
      </div>
    </section>
  );
};

export default Categorys;
