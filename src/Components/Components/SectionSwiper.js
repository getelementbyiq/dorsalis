import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Mousewheel, Pagination } from "swiper/modules";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import SectionOne from "../Sections/SectionOne";
import SectionSecond from "../Sections/SectionSecond";
import SectionThird from "../Sections/SectionThird";
import SectionForth from "../Sections/SectionForth";
import Footer from "../Sections/Footer";

function SectionSwiper({ slide1, swiperXRef0, direction }) {
  const dispatch = useDispatch();
  console.log("swiperXRef", swiperXRef0);

  const swiperRef = useRef(null);

  //   const [currentSlideIndex, setCurrentSlideIndex] = useState(2);

  useEffect(() => {
    if (swiperXRef0) {
      swiperXRef0.current = {
        changeSlide: (index) => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index);
          }
        },
      };
    }
  }, [swiperXRef0]);

  // const handleSlideChange = (swiper) => {
  //   dispatch(setMainNavIndex(swiper.activeIndex));
  // };

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const initialIndex = swiperRef.current.swiper.activeIndex;
      // dispatch(setMainNavIndex(initialIndex));
      console.log("Initial Active Index:", initialIndex);
    }
  }, [dispatch]);

  return (
    <Swiper
      direction={direction}
      slidesPerView={1}
      pagination={false}
      mousewheel={true}
      spaceBetween={0}
      modules={[Mousewheel, Pagination]}
      className="mySwiper"
      ref={swiperRef}
      // onSlideChange={handleSlideChange}
    >
      <SwiperSlide data-hash="slide0">
        <Box
          sx={{
            display: "flex",
            // border: "1px solid red",
            // backgroundColor: "#787878",
            // backgroundColor: "black",
            flexGrow: "1",
            height: "100vh",
          }}
        >
          <SectionOne />
          {/* <SwiperXSecond direction="vertical" /> */}
        </Box>
      </SwiperSlide>
      <SwiperSlide data-hash="slide1">
        <Box
          sx={{
            // display: "flex",
            // border: "1px solid red",
            width: "100%",
            // backgroundColor: "blue",
            height: "100vh",
            flexGrow: "1",
          }}
        >
          <SectionSecond />
        </Box>
      </SwiperSlide>
      <SwiperSlide data-hash="slide1">
        <Box
          sx={{
            // display: "flex",
            // border: "1px solid red",
            width: "100%",
            // backgroundColor: "blue",
            height: "100vh",
            flexGrow: "1",
          }}
        >
          <SectionThird />
        </Box>
      </SwiperSlide>
      <SwiperSlide data-hash="slide1">
        <Box
          sx={{
            // display: "flex",
            // border: "1px solid red",
            width: "100%",
            // backgroundColor: "blue",
            height: "100vh",
            flexGrow: "1",
          }}
        >
          <SectionForth />
        </Box>
      </SwiperSlide>
      <SwiperSlide data-hash="slide1">
        <Box
          sx={{
            // display: "flex",
            // border: "1px solid red",
            width: "100%",
            // backgroundColor: "blue",
            height: "100vh",
            flexGrow: "1",
          }}
        >
          <Footer />
        </Box>
      </SwiperSlide>
    </Swiper>
  );
}

export default SectionSwiper;
