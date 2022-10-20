import React, { useCallback, useState } from "react";
import Card from "../Shared/Card";
import img1 from "../../assets/Icon1.png";
import img2 from "../../assets/Icon2.png";
import img3 from "../../assets/Icon3.png";
import styles from "./SliderSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import rightArrow from "../../assets/RightArrow.svg";
import leftArrow from "../../assets/LeftArrow.svg";
import useWindowSize from "../../hooks/useWindowSize";

const sliderData = [
  {
    image: img1,
    alt: "img1",
    header: "Take a quiz!",
    info: "Learn and earn $CKB",
  },
  {
    image: img2,
    alt: "img2",
    header: "Portfolio",
    info: "Track your trades in one place, not all over the place",
  },
  {
    image: img3,
    alt: "img3",
    header: "Portfolio",
    info: "Track your trades in one place, not all over the place",
  },
];

const SliderSection = () => {
  const size = useWindowSize();
  const [data, setData] = useState(sliderData);
  const [swiperRef, setSwiperRef] = useState();
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  return (
    <>
      <div className={styles.sliderContainer}>
        <button className={styles.navigationBtn} onClick={handleLeftClick}>
          <img src={leftArrow} alt="prev" />
        </button>
        <Swiper
          onSwiper={setSwiperRef}
          centeredSlides={true}
          slidesPerView={size < 476 ? 1 : 3}
          spaceBetween={16}
          slidesPerGroup={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {data.map((ele, i) => {
            return (
              <SwiperSlide key={i}>
                <Card
                  img={ele.image}
                  alt={ele.alt}
                  header={ele.header}
                  info={ele.info}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button className={styles.navigationBtn} onClick={handleRightClick}>
          <img src={rightArrow} alt="next" />
        </button>
      </div>
    </>
  );
};

export default SliderSection;
