import React from 'react'
import ProductCard from '../../ui/ProductCard'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Autoplay } from "swiper/modules";
// import { usePopularProducts } from "../../../hooks/usePopularProducts";




const CategoryProductSection = ({products,loading,error,title}) => {
  // const {popularProducts,loading,error} = usePopularProducts();

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-4 px-10">
      <h3 className="text-2xl font-semibold text-gray-800 font-heading ">
        {title}
      </h3>
      <div className="productsSection w-full h-auto flex gap-8">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
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
          modules={[FreeMode, Autoplay]}
          className="mySwiper"
        >
          {products.map(product => {
            return (
              <SwiperSlide>
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default CategoryProductSection