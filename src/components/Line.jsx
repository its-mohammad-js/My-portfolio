import { useEffect, useRef } from "react";
import p5 from "p5";
import useMediaQuery from "../hooks/useMediaQuery";

const P5Canvas = () => {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const numStars = isMobile ? 100 : 200; // Number of stars
  const canvasRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      const stars = [];
      let lineProgress = 0; // Line progress from 0 to 1 (0% to 100%)

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

        const lineStartY = p.height; // Start from bottom-left Y position
        const lineStartX = -150; // Start from bottom-left X position
        const lineEndX = (p.width + 200) * lineProgress; // Line's X position based on progress
        const lineEndY = p.height - p.height * lineProgress; // Line's Y position based on progress

        p.stroke("#4b5563"); // Line color
        p.line(lineStartX, lineStartY, lineEndX, lineEndY); // Draw the animated line from the bottom-left to top-right

        const line2StartY = p.height; // Start from bottom-right Y position
        const line2StartX = p.width; // Start from bottom-right X position
        const line2EndX = p.width - p.width * lineProgress; // Line's X position based on progress
        const line2EndY = p.height - 300 * lineProgress; // Line's Y position based on progress

        p.stroke("#4b5563"); // Line color
        p.line(line2StartX, line2StartY, line2EndX, line2EndY); // Draw the animated line from bottom-right to top-left

        const line3StartY = p.height - 200; // Start a little bit above the bottom (200px)
        const line3StartX = 0; // Start from the left side of the canvas (0px from the left)
        const line3EndX = p.width / 4; // End at 1/4 of the width of the canvas (right on bottom)
        const line3EndY = p.height; // End at the bottom of the window

        p.stroke("#4b5563"); // Line color
        p.line(
          line3StartX,
          line3StartY,
          line3StartX + (line3EndX - line3StartX) * lineProgress, // Animate X position from left to right
          line3StartY + (line3EndY - line3StartY) * lineProgress // Animate Y position from bottom to top
        ); // Draw the animated line

        const centerX = p.width / 4; // Center of the circle (horizontal center)
        const centerY = p.height / 1.4; // Center of the circle (vertical center)
        const radius = isMobile ? 150 : 450; // Radius of the circle

        p.stroke("#4b5563"); // Line color
        p.noFill(); // No fill for the circle

        // Animate the circumference of the circle by adjusting the angle
        const angle = p.TWO_PI * lineProgress; // Progress the angle as lineProgress increases

        // Draw the arc (portion of the circle)
        p.arc(centerX, centerY, radius * 2, radius * 2, 0, angle); // Full circle arc based on progress

        const center2X = p.width / 1.3; // Center of the circle (horizontal center)
        const center2Y = p.height / 1.4; // Center of the circle (vertical center)
        const radius2 = isMobile ? 150 : 450; // Radius of the circle

        p.stroke("#4b5563"); // Line color
        p.noFill(); // No fill for the circle

        // Animate the circumference of the circle by adjusting the angle
        const angle2 = p.TWO_PI * lineProgress; // Progress the angle as lineProgress increases

        // Draw the arc (portion of the circle)
        p.arc(center2X, center2Y, radius2 * 2, radius2 * 2, 0, angle2); // Full circle arc based on progress
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default P5Canvas;
