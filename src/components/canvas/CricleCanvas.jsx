import { useEffect, useRef } from "react";
import p5 from "p5";
import useMediaQuery from "/src/hooks/useMediaQuery";

const CircleCanvas = () => {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const canvasRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      const numStars = 500;
      const maxRadius = 100; // حداکثر شعاع دایره
      let stars = [];

      p.setup = () => {
        p.createCanvas(350, 350);
        p.noStroke();

        // Initialize stars with random angles and initial radius
        for (let i = 0; i < numStars; i++) {
          const angle = p.random(p.TWO_PI);
          const r = p.random(0, maxRadius); // شروع با شعاع‌های تصادفی
          stars.push({ angle, r });
        }
      };

      p.draw = () => {
        p.clear();

        for (let i = 0; i < numStars; i++) {
          const star = stars[i];
          // Gradually increase the radius of each star to create the motion from center to edge
          star.r += 0.05;

          // Reset the radius when it exceeds the maximum value to loop the motion
          if (star.r > maxRadius) {
            star.r = 0;
          }

          // Update the angle of each star to create rotation
          star.angle += 0.001;

          // Calculate new position
          const x = p.width / 2 + star.r * p.cos(star.angle);
          const y = p.height / 2 + star.r * p.sin(star.angle);

          p.fill(255, 255, 255);
          p.circle(x, y, 1.5);
        }
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default CircleCanvas;
