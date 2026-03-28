import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { HomeBannerData } from "../../../constants/HomeBannerData";
import Banner from "../../ui/Banner";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const BannerSection = () => {
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
        {HomeBannerData?.map((banner, index) => (
          <SwiperSlide key={index}>
            <Banner img={banner.img} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSection;