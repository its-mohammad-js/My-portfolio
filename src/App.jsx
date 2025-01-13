import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Mousewheel } from "swiper/modules";
import "swiper/css"; // Core Swiper styles
import "swiper/css/scrollbar"; // Optional styles for scrollbar
import useMediaQuery from "./hooks/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import HeroSection from "./components/sections/HeroSection";
import AboutDeveloper from "./components/sections/AboutDeveloper";
import Stacks from "./components/sections/Stacks";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import Logo from "./components/Logo";

const comps = [
  { title: "Hero Section", component: HeroSection },
  { title: "About me", component: AboutDeveloper },
  { title: "Stacks", component: Stacks },
  { title: "Projects", component: Projects },
  { title: "Contacts", component: Contact },
  { title: "Footer", component: Footer },
];

function App() {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const [isLocked, setLock] = useState(false);
  const swiperRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  function onChangeSlide(slideIndex) {
    swiperRef.current.swiper.slideTo(slideIndex);
  }

  // update loading
  useEffect(() => {
    let timer;

    if (loading) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  // unlock slider on slide change
  useEffect(() => {
    let timer; // Declare a timer variable

    if (isLocked) {
      timer = setTimeout(() => {
        setLock(false);
      }, 950);
    }

    return () => {
      // Cleanup function to clear the timer
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLocked]);

  return (
    <div className="mx-auto 2xl:max-w-screen-2xl">
      {/* navbar & logo */}
      <div className="fixed w-full z-50 flex items-center px-4 py-2">
        <Logo {...{ loading, onChangeSlide }} />

        <div className="flex z-10 gap-2 overflow-x-auto ml-12 lg:mx-auto lg:gap-4 items-center p-1">
          {comps.map(
            (slide, index) =>
              index > 0 &&
              index < 4 && (
                <div
                  key={index}
                  onClick={() => onChangeSlide(index)}
                  className={`${
                    currentSlide === index
                      ? "bg-gray-200 text-gray-950"
                      : "text-gray-200"
                  } text-xs transition-all cursor-pointer text-nowrap lg:text-lg font-semibold rounded-2xl px-1.5 py-0.5 lg:px-4 lg:py-2`}
                >
                  <p className="select-none">{slide.title}</p>
                </div>
              )
          )}
          <div
            className={`text-xs cursor-pointer text-nowrap text-gray-200 lg:text-lg font-semibold rounded-2xl lg:px-4 lg:py-2 px-1.5 py-0.5`}
          >
            <a href="MOHAMMAD ARAB.pdf" download={true}>
              Resume
            </a>
          </div>
          <div
            onClick={() =>
              window.open("https://github.com/its-mohammad-js/", "_blank")
            }
            className={`text-xs cursor-pointer text-nowrap text-gray-200 lg:text-lg font-semibold rounded-2xl lg:px-4 lg:py-2 px-1.5 py-0.5`}
          >
            github
          </div>
        </div>
      </div>
      {/* slider layout */}
      <Swiper
        ref={swiperRef}
        direction="vertical"
        modules={[Scrollbar, Mousewheel]}
        scrollbar={{ draggable: true }}
        mousewheel
        slidesPerView={1}
        className="w-full h-screen swiper-container"
        speed={800}
        allowTouchMove={isMobile}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);

          setLock(true);
        }}
        allowSlideNext={!isLocked}
        allowSlidePrev={!isLocked}
      >
        {comps.map(({ component: Comp }, i) => (
          <SwiperSlide key={i}>
            <div
              className={`bg-transparent transition-all text-gray-200 size-full`}
            >
              {!loading && (
                <Comp
                  currentSlide={currentSlide}
                  onChangeSlide={onChangeSlide}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default App;
