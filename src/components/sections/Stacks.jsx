import CircleCanvas from "../canvas/CricleCanvas";
import StacksCanvas from "../canvas/StacksCanvas";
import { motion } from "framer-motion";

const slidePositions = [
  {
    style: "size-16 lg:w-44 lg:h-[90%] max-h-80",
    opacity: 0,
    src: "/Slides/stack icon (1).svg",
    y: 50,
  },
  {
    style: "size-16 lg:w-44 lg:h-[90%] max-h-80",
    opacity: 0,
    src: "/Slides/stack icon (2).svg",
    y: 50,
  },
  {
    style: "size-16 lg:w-44 lg:h-[90%] max-h-80",
    src: "/Slides/stack icon (3).svg",
    opacity: 0,
    y: 50,
  },
  {
    style: "size-16 lg:w-44 lg:h-[90%] max-h-80",
    src: "/Slides/stack icon (4).svg",
    opacity: 0,
    y: 50,
  },
];

function Stacks({ currentSlide, onChangeSlide }) {
  return (
    <div className="relative size-full flex items-center justify-center">
      <div className="absolute">
        <StacksCanvas key={currentSlide} />
      </div>

      <div className="z-10 flex size-full flex-col items-center justify-evenly lg:justify-center">
        {/* title & subtitle */}
        <div className="flex lg:gap-32 h-1/3 lg:h-1/2 flex-col lg:flex-row items-center">
          <h4 className="text-3xl lg:text-5xl font-bold space-y-2">
            ALL TYPES OF <br />
            <p className="bg-gray-200/80 text-gray-950 w-fit">PROJECTS</p>
          </h4>

          <div className="lg:w-96 pt-16 px-4 text-gray-300 space-y-2">
            <p className="text-xs lg:text-sm leading-6">
              My main technology stack for web development is &nbsp;
              <span className="font-bold">React.js</span>, and I am highly
              <span className="underline">
                {" "}
                adaptable in learning new tools and platforms{" "}
              </span>
              related to the JavaScript ecosystem.
            </p>
            <button onClick={() => onChangeSlide(3)}>
              VIEW MY WORKS &#8595;
            </button>
          </div>
        </div>

        <div className="w-full overflow-auto hidden-scroll-bar gap-x-4 flex p-4 items-center justify-evenly h-1/3 lg:h-1/2">
          {/* image slides */}
          <>
            {slidePositions.map((position, index) => (
              <motion.div
                key={index}
                className={`${position.style} flex-none`}
                initial={{ opacity: position.opacity, y: position.y }}
                whileInView={{
                  opacity: 1,
                  y: index % 2 === 0 ? 0 : -40,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  delay: index * 0.1,
                }}
              >
                <img
                  src={position.src}
                  alt="stack-icon"
                  className="size-full object-contain"
                />
              </motion.div>
            ))}
          </>
        </div>
      </div>

      <div className="absolute -bottom-44 -right-14">
        <CircleCanvas />
      </div>
    </div>
  );
}

export default Stacks;
