import { useEffect, useRef } from "react";
import p5 from "p5";
import useMediaQuery from "/src/hooks/useMediaQuery";

const AboutDevCanvas = () => {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const numStars = isMobile ? 50 : 100; // Number of stars
  const canvasRef = useRef();
  let lineProgress = 0; // Line progress from 0 to 1 (0% to 100%)

  useEffect(() => {
    const sketch = (p) => {
      const stars = [];

      const createStar = (x, y, speedX, speedY) => ({
        x: x,
        y: y,
        speedX: speedX / 4, // Random horizontal speed
        speedY: speedY / 4, // Random vertical speed
        baseSize: 0.1, // Initial size of the star
        pulseSpeed: p.random(0.01, 0.05), // Random pulse speed for each star
      });

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0, 0, 0, 0); // Transparent background
        p.noStroke();

        // Randomly create stars with movement speed
        for (let i = 0; i < numStars; i++) {
          let x = p.random(0, p.width);
          let y = p.random(0, p.height);
          let speedX = p.random(-1, 1); // Random horizontal speed
          let speedY = p.random(-1, 1); // Random vertical speed
          stars.push(createStar(x, y, speedX, speedY)); // Add the star to the array
        }
      };

      p.draw = () => {
        p.clear(); // Clear the canvas each frame

        // render stars
        stars.forEach((star) => {
          // Update star position
          star.x += star.speedX;
          star.y += star.speedY;

          // Keep stars within the canvas bounds
          if (star.x > p.width) star.x = 0;
          if (star.x < 0) star.x = p.width;
          if (star.y > p.height) star.y = 0;
          if (star.y < 0) star.y = p.height;

          // Create pulsing effect by changing the size based on a sine function
          let pulse = star.baseSize + p.sin(p.frameCount * star.pulseSpeed) * 2; // Pulsing effect

          p.fill("#9ca3af"); // Color for the stars
          p.ellipse(star.x, star.y, pulse, pulse); // Draw the star with pulsing size
        });

        // Animate line from bottom-left to top-right
        if (lineProgress < 1) {
          lineProgress += 0.005; // Progress the line over time
        }

        const lineStartY = p.height + 100; // Start from bottom-left Y position
        const lineStartX = -150; // Start from bottom-left X position
        const lineEndX = (p.width + 200) * lineProgress; // Line's X position based on progress
        const lineEndY = p.height - 1000 * lineProgress; // Line's Y position based on progress

        p.stroke("#4b5563"); // Line color
        p.line(lineStartX, lineStartY, lineEndX, lineEndY); // Draw the animated line from the bottom-left to top-right

        const line2StartY = p.height - 500; // Start from bottom-left Y position
        const line2StartX = -150; // Start from bottom-left X position
        const line2EndX = line2StartX + (p.width + 200) * lineProgress; // Line's X position based on progress
        const line2EndY = line2StartY + (p.height + 50) * lineProgress; // Line's Y position based on progress

        p.stroke("#4b5563"); // Line color
        p.line(line2StartX, line2StartY, line2EndX, line2EndY); // Draw the animated line from start to end
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default AboutDevCanvas;
