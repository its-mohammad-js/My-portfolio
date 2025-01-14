import AboutDevCanvas from "../canvas/AboutDevCanvas";
import { motion } from "framer-motion";
import slide1 from "/src/assets/Slides/about-slide (1).webp";
import slide2 from "/src/assets/Slides/about-slide (2).webp";
import slide3 from "/src/assets/Slides/about-slide (3).webp";
import personalPic from "/src/assets/Slides/developer-pic.webp";

const slidePositions = [
  {
    style: "w-32 lg:w-72 lg:h-96 left-0",
    opacity: 0,
    src: slide1,
    y: 50,
  },
  {
    style: "w-28 lg:w-72 lg:h-60 right-32 top-24",
    src: slide2,
    opacity: 0,
    y: 50,
  },
  {
    style: "w-96 lg:h-96 -bottom-32 right-0",
    src: slide3,
    opacity: 0,
    y: 50,
  },
];

function AboutDeveloper({ currentSlide }) {
  return (
    <div className="relative size-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <AboutDevCanvas key={currentSlide} />

        {/* image slides */}
        <>
          {slidePositions.map((position, index) => (
            <motion.div
              key={index}
              className={`${position.style} absolute rounded-xl overflow-hidden bg-gray-500`}
              initial={{ opacity: position.opacity, y: position.y }}
              whileInView={{ opacity: 0.3, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <img
                src={position.src}
                alt="slide-img"
                className="size-full object-cover "
              />
            </motion.div>
          ))}
        </>
      </div>
      <div className="z-10 flex lg:pt-24 flex-col lg:flex-row items-center justify-center lg:gap-28 w-full">
        {/* image & title */}
        <div className="relative flex items-center justify-center lg:h-1/2">
          <h4 className="absolute font-bold hidden lg:block -top-14 left-0 lg:left-auto lg:-top-28 lg:-right-56 lg:text-4xl">
            <p> Your simple ideas</p>
            <p className="relative lg:left-16">can turn into</p>
            <p className="relative lg:left-32">innovative products</p>
          </h4>
          <div className="lg:w-96 lg:h-[28rem] w-80 h-72 bg-gray-600 border-8">
            <div className="w-full h-[85%]">
              <img
                src={personalPic}
                alt="developer-pic"
                className="size-full object-cover"
              />
            </div>
            <div className="w-full px-4 py-2 h-[16%] bg-gray-200 text-gray-950">
              <h4 className="text-lg lg:text-xl font-bold">
                MOHAMMAD <br className="hidden lg:inline-block" /> ARAB
              </h4>
            </div>
          </div>
        </div>
        {/* subtitle */}
        <div className="w-96 lg:h-[28rem] pt-20 px-4">
          <h4 className="text-xl font-semibold">About Me</h4>
          <p className="text-gray-400 text-xs lg:text-sm">
            I am a creative front-end developer and a member of the big
            JavaScript family! I am passionate about building and designing
            innovative, user-friendly products with a focus on flawless user
            experience. The product development process, including testing in
            realistic scenarios, backend interaction, and how design is
            implemented on the front-end, is very important to me.
            <br />
            <br />
            It’s crucial that the final code output of a product is scalable and
            maintainable, and I also place great importance on the developer
            experience, alongside the user experience. My work has always been
            influenced by the exciting challenges of developing visual products
            and how they interact with users. My main perspective in software
            development is choosing the most efficient and best possible way to
            build and develop a product.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutDeveloper;
