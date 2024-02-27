"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src="/images/test.jpg" fill alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/next.jpg" fill alt="slide" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/vue.png" fill alt="slide" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default Slider;
