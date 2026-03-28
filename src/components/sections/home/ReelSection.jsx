import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Reel from "../../ui/Reel";

const ReelSection = ({ videoData }) => {
  return (
    <div className="w-full h-auto py-10 px-4 ">
      <div className="container mx-auto">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          modules={[FreeMode, Autoplay]}
          className="mySwiper flex justify-between items-center gap-10"
        >
          <div className="flex justify-between items-center gap-10">
            {videoData.map((item, index) => {
              return (
                <SwiperSlide key={index} className="h-auto!">
                  <Reel item={item.video} />
                  {/* <video src={item} alt="" /> */}
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default ReelSection;
