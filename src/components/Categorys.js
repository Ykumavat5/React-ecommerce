import React, { useRef, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useCategories from "./reuse/useCategories";

const Categorys = () => {
  const categorys = useCategories();
  const { categoryId } = useParams();
  const location = useLocation();

  const isCategoryPage = location.pathname.startsWith("/category");
  const shouldLoop = categorys.length > 5;
  const swiperRef = useRef(null);
  useEffect(() => {
    if (!swiperRef.current || !categoryId) return;

    const index = categorys.findIndex(cat => String(cat.id) === String(categoryId));
    if (index >= 0) {
      swiperRef.current.slideTo(index);
    }
  }, [categoryId, categorys]);

  return (
    <section className="py-5 overflow-hidden" id="category-list">
      <div className="container-lg">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between mb-5">
              <h2 className="section-title">Category</h2>
              <div className="d-flex align-items-center">
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
            onSwiper={(swiper) => (swiperRef.current = swiper)} 
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
            {categorys.map((cat, index) => {
              const isActive = isCategoryPage && String(categoryId) === String(cat.id);

              return (
                <SwiperSlide key={index}>
                  <Link
                    to={`/category/${cat.id}`}
                    className={`nav-link text-center ${isActive ? "active-category" : ""}`}
                  >
                    <img
                      src={cat.image}
                      className={`rounded-circle ${isActive ? "border border-warning border-3" : ""}`}
                      alt="Category Thumbnail"
                    />
                    <h4 className="fs-6 mt-3 fw-normal category-title">{cat.name}</h4>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center">No categories available.</div>
        )}
      </div>
    </section>
  );
};

export default Categorys;
