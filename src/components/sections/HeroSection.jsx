import HeroCanvas from "../canvas/HeroCanvas";
import { motion } from "framer-motion";
import slide1 from "/src/assets/Slides/hero-slide (1).webp";
import slide2 from "/src/assets/Slides/hero-slide (2).webp";
import slide3 from "/src/assets/Slides/hero-slide (3).webp";
import slide4 from "/src/assets/Slides/hero-slide (4).webp";
import slide5 from "/src/assets/Slides/hero-slide (5).webp";
import slide6 from "/src/assets/Slides/hero-slide (6).webp";
import slide7 from "/src/assets/Slides/hero-slide (7).webp";

const slidePositions = [
  {
    style: "w-32 lg:w-64 h-32 lg:h-56 -top-24 right-0",
    src: slide1,
    opacity: 0,
    y: -50,
  },
  {
    style: "w-32 lg:w-64 h-32 lg:h-56 top-16 -left-24 lg:right-0",
    src: slide2,
    opacity: 0,
    y: -50,
  },
  {
    style: "w-56 h-32 top-[55%] lg:h-56 lg:top-1/4 -left-12 lg:left-56",
    src: slide3,
    opacity: 0,
    y: -50,
  },
  {
    style: "w-32 lg:w-64 h-32 lg:h-56 top-1/4 right-[12%]",
    src: slide4,
    opacity: 0,
    y: -50,
  },
  {
    style: "w-32 lg:w-64 h-32 lg:h-56 bottom-[5%] left-[2%]",
    src: slide5,
    opacity: 0,
    y: -50,
  },
  {
    style: "w-64 lg:block hidden h-56 bottom-12",
    src: slide6,
    opacity: 0,
    y: 50,
  },
  {
    style: "w-64 h-56 bottom-32 -right-32",
    src: slide7,
    opacity: 0,
    y: -50,
  },
];

function HeroSection({ currentSlide }) {
  return (
    <div className="relative size-full flex items-center justify-center">
      <div className="absolute inset-0">
        <HeroCanvas key={currentSlide} />
      </div>
      <div className="z-10 flex items-center justify-center">
        {/* main title */}
        <div className="text-center absolute z-10 w-56 mb-36 space-y-2">
          <h4 className="font-bold text-4xl">HELLO IM MOHAMMAD</h4>
          <p className="text-sm text-gray-300">
            My main focus is on developing{" "}
            <span className="font-semibold text-gray-950 bg-gray-200 px-1 rounded-xl">
              user-friendly
            </span>{" "}
            and scalable products
          </p>
        </div>
        {/* image slides */}
        <>
          {slidePositions.map((position, index) => (
            <motion.div
              key={index}
              className={`${position.style} absolute overflow-hidden rounded-xl`}
              initial={{ opacity: position.opacity, y: position.y }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <img
                draggable={false}
                src={position?.src}
                alt="slide-img"
                className="size-full select-none object-cover opacity-50"
              />
            </motion.div>
          ))}
        </>
      </div>
    </div>
  );
}

export default HeroSection;
