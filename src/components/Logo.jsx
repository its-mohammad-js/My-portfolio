import logoIcon from "../assets/logo-no-background.svg";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";
import { useEffect, useState } from "react";
import LoadingCanvas from "./canvas/LoadingCanvas";

function Logo({ loading, onChangeSlide }) {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const [showCanvas, setCanvas] = useState(true);
  const [textOpacity, setTextOpacity] = useState(1); // State to control text opacity

  // update loading
  useEffect(() => {
    let timer;

    if (!loading) {
      timer = setTimeout(() => {
        setCanvas(false);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [loading]);

  return (
    <>
      <div
        className={`${
          loading ? "opacity-100 visible" : "opacity-0 invisible"
        } fixed duration-1000 transition-all -z-10 inset-0`}
      >
        {showCanvas && <LoadingCanvas />}
      </div>

      <motion.div
        onClick={() => onChangeSlide(0)}
        initial={{ top: "15rem", left: isMobile ? "30%" : "43%" }}
        whileInView={{
          top: isMobile ? "-5.5rem" : "-5.1rem",
          left: isMobile ? 10 : 0,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          delay: 2,
        }}
        className="flex cursor-pointer text-gray-200 absolute items-center justify-center"
        onUpdate={(latest) => {
          const topProcess = Number(latest.top.replace("rem", ""));

          // Check if the parent animation is at or past 80% of the duration
          if (topProcess < 10 && isMobile) {
            setTextOpacity(0); // Change text opacity at 80% progress
          }
        }}
      >
        <motion.img
          src={logoIcon}
          alt="logo-icon"
          className="h-56 -ml-8"
          initial={{
            opacity: 0,
            width: 0,
          }}
          whileInView={{
            opacity: 1,
            width: [0, isMobile ? 130 : 250, isMobile ? 100 : 120],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        />
        <h2 className="text-lg -ml-8 transition-all delay-[2500] lg:-ml-10 text-center font-bold">
          {"Its_Mohammad_js".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: textOpacity,
              }} // Use textOpacity here
              transition={{ duration: 0.5 }}
            >
              {letter}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </>
  );
}

export default Logo;
