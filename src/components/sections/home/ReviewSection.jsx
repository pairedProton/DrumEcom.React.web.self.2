import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ReviewSection = ({ reviewsData }) => {
  return (
    <div className="w-full min-h-[600px] py-12 px-10 relative z-10 ">
      {/* Background Image */}
      <div className="absolute z-4 top-0 left-0 w-full h-full">
        <img
          className="w-full h-full object-cover object-center"
          src="https://organicindia.com/cdn/shop/files/1920-X-830-testimonial.png?v=1666267004"
          alt=""
        />
      </div>

      {/* Content */}
      <div className="relative z-8 container mx-auto flex flex-col items-center justify-center min-h-[600px]">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
          Customers Love
        </h2>

        {/* Decorative Element */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-px bg-green-600"></div>
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          <div className="w-8 h-px bg-green-600"></div>
        </div>

        {/* Swiper */}
        <div className="w-full max-w-4xl">
          <style>{`
                    .review-swiper .swiper-pagination {
                        position: relative;
                        margin-top: 2rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 0.5rem;
                    }
                    .review-swiper .swiper-pagination-bullet {
                        width: 10px;
                        height: 10px;
                        background: transparent;
                        border: 2px solid #16a34a;
                        opacity: 0.5;
                    }
                    .review-swiper .swiper-pagination-bullet-active {
                        background: #16a34a;
                        opacity: 1;
                    }
                `}</style>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            className="review-swiper"
          >
            {reviewsData?.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center justify-center px-4 md:px-8">
                  {/* Profile Picture with Quote Icon */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-green-600 overflow-hidden relative z-10">
                      <img
                        src={review.imageUrl}
                        alt={review.name}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {/* Quote Icon */}
                    {/* <div className='absolute -top-2 -right-2 z-20 bg-yellow-400 rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold text-white shadow-lg'>
                                        "
                                    </div> */}
                  </div>

                  {/* Product Name */}
                  <h3 className="text-4xl md:text-5xl font-light text-white mb-6 text-center">
                    {review.product}
                  </h3>

                  {/* Review Text */}
                  <p className="text-base md:text-lg text-white mb-8 text-left max-w-3xl leading-relaxed">
                    {review.review}
                  </p>

                  {/* Reviewer Details */}
                  <div className="text-left w-full max-w-3xl">
                    <p className="text-lg font-semibold text-white mb-1">
                      {review.name}
                    </p>
                    <p className="text-sm text-white">{review.post}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
