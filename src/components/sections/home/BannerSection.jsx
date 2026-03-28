import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import { bannerImages } from "../../../assets/images";
// import { HomeBannerData } from "../../../constants/HomeBannerData";
import Banner from "../../ui/Banner";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import {Autoplay, Pagination } from "swiper/modules";
import { useEffect } from "react";
import { getHomeBanners } from "../../../services/api/bannerApi";
import {useBanners} from "../../../hooks/useBanners"



const BannerSection = () => {
  const { banners, loading, error } = useBanners();

  // 🔹 Loading UI
  if (loading) {
    return <div className="w-full h-110 bg-gray-300 animate-pulse"></div>;
  }

  // 🔹 Error UI
  if (error) {
    return (
      <div className="w-full h-110 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-110 ">
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {banners?.map((banner, index) => (
          <SwiperSlide key={index}>
            <Banner img={banner.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSection