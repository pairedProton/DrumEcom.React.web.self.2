import React from 'react'
import CategoryCircle from '../../ui/CategoryCircle'
import { categoryData } from '../../../constants/categoryData'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

const CategorySection = () => {
  return (
    <div className="flex gap-8 p-4 px-6">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={0}
        freeMode={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {categoryData.map((cat, index) => (
          <SwiperSlide key={index}>
            <CategoryCircle img={cat.img} title={cat.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategorySection