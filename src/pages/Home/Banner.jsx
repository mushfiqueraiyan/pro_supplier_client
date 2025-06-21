import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import bannerImage1 from "../../assets/banner1.png";
import bannerImage2 from "../../assets/banner2.png";
import bannerImage3 from "../../assets/banner3.png";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="rounded-2xl">
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="rounded-2xl"
      >
        <SwiperSlide>
          <img src={bannerImage1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bannerImage2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={bannerImage3} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
