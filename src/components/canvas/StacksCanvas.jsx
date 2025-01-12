import { useEffect, useRef } from "react";
import p5 from "p5";
import useMediaQuery from "/src/hooks/useMediaQuery";

const StacksCanvas = () => {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const circleRadius = isMobile ? 250 : 300; // Radius of the circle for a larger effect
  const canvasRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      const stars = [];
      let lineProgress = 0; // Line progress from 0 to 1 (0% to 100%)
      const numStars = isMobile ? 300 : p.random(500, 600); // Random number of stars between 500 and 600

      const createStar = (angle, radius, offsetY) => ({
        angle: angle,
        radius: radius + offsetY, // Dynamic radius with sin wave effect
        offsetX: p.random(-15, 15), // Initial random horizontal position offset
        offsetYMovement: p.random(-15, 15), // Initial random vertical position offset
        offsetSpeedX: p.random(0.15, 0.35), // Control speed for horizontal movement
        offsetSpeedY: p.random(0.15, 0.35), // Control speed for vertical movement
      });

      const createBackGroundStar = (x, y, speedX, speedY) => ({
        x: x,
        y: y,
        speedX: speedX / 4, // Random horizontal speed
        speedY: speedY / 4, // Random vertical speed
        baseSize: 0.1, // Initial size of the star
        pulseSpeed: p.random(0.01, 0.05), // Random pulse speed for each star
      });

      let rotationAngle = 0; // Variable for the rotation angle of the whole circle

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(0, 0, 0, 0); // Transparent background
        p.noStroke();

        // Create stars based on sine wave pattern
        for (let i = 0; i < numStars; i++) {
          const angle = (i / numStars) * p.TWO_PI; // Evenly distribute stars around the circle

          // Increase frequency to 6 for more pikes in the sine wave
          const frequency = 6; // Set frequency to 6 for more pikes
          const amplitude = p.random(15, 80); // Set a constant amplitude (height of each wave)

          const offsetY = p.sin(angle * frequency) * amplitude; // Apply sine wave to adjust radius

          stars.push(createStar(angle, circleRadius, offsetY)); // Add the star to the array
        }

        // Randomly create stars with movement speed
        for (let i = 0; i < 25; i++) {
          let x = p.random(0, p.width);
          let y = p.random(0, p.height);
          let speedX = p.random(-1, 1); // Random horizontal speed
          let speedY = p.random(-1, 1); // Random vertical speed
          stars.push(createStar(x, y, speedX, speedY)); // Add the star to the array
        }
      };

      p.draw = () => {
        p.clear(); // Clear the canvas each frame

        // Increment the rotation angle to rotate the whole circle
        rotationAngle += 0.001; // Adjust the speed of rotation here

        // Render stars based on sine wave positions
        stars.forEach((star) => {
          // Continuously update the star's X and Y offsets
          star.offsetX += star.offsetSpeedX; // Increment X offset steadily
          star.offsetYMovement += star.offsetSpeedY; // Increment Y offset steadily

          // Ensure continuous, random movement (no slowing down)
          if (star.offsetX > 20 || star.offsetX < -20) {
            star.offsetSpeedX *= -1; // Reverse direction if exceeds bounds
          }
          if (star.offsetYMovement > 20 || star.offsetYMovement < -20) {
            star.offsetSpeedY *= -1; // Reverse direction if exceeds bounds
          }

          // Animate size change in a random manner
          star.sizeFactor = p.random(2.5, 3); // Sinusoidal with random factor

          // Calculate the position of each star using angle, radius, and the sine offset
          const x =
            p.width / 2 +
            star.radius * p.cos(star.angle + rotationAngle) +
            star.offsetX;
          const y =
            p.height / 2 +
            star.radius * p.sin(star.angle + rotationAngle) +
            star.offsetYMovement;

          p.fill(156, 163, 175, star.alphaFactor); // Fixed color (gray) with changing opacity
          p.ellipse(x, y, star.sizeFactor, star.sizeFactor); // Animate size and opacity
        });

        // Animate line from bottom-left to top-right
        if (lineProgress < 1) {
          lineProgress += 0.005; // Progress the line over time
        }

        const line2StartY = p.height; // Start from bottom-right Y position
        const line2StartX = p.width; // Start from bottom-right X position
        const line2EndX = p.width - p.width * lineProgress; // Line's X position based on progress
        const line2EndY = p.height - 300 * lineProgress; // Line's Y position based on progress

        p.stroke("#4b5563"); // Line color
        p.line(line2StartX, line2StartY, line2EndX, line2EndY); // Draw the animated line from bottom-right to top-left

        const lineStartY = p.height; // Start from bottom-left Y position
        const lineStartX = -150; // Start from bottom-left X position
        const lineEndX = (p.width + 200) * lineProgress; // Line's X position based on progress
        const lineEndY = p.height - p.height * lineProgress; // Line's Y position based on progress

        p.stroke("#4b5563"); // Line color
        p.line(lineStartX, lineStartY, lineEndX, lineEndY); // Draw the animated line from the bottom-left to top-right
      };
    };

    const myP5 = new p5(sketch, canvasRef.current);

    return () => {
      myP5.remove();
    };
  }, [isMobile]);

  return <div ref={canvasRef} />;
};

export default StacksCanvas;
