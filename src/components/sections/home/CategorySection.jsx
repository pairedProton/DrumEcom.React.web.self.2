import React from 'react'
import CategoryCircle from '../../ui/CategoryCircle'
// import {categoryData} from '../../../constants/categoryData'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { useCategories } from '../../../hooks/useCategories';

const CategorySection = () => {
  const {categories,loading,error} = useCategories()

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error: {error}</div>
  }
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
            spaceBetween: 0,
          },
        }}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {categories.map((cat, index) => (
          <SwiperSlide >
            <CategoryCircle key={cat.id} img={cat.image} title={cat.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CategorySection