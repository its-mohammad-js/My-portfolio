import { useEffect, useRef } from "react";
import p5 from "p5";
import useMediaQuery from "../../hooks/useMediaQuery";

const InfinityCanvas = () => {
  const isMobile = useMediaQuery({ maxWidth: 720 });
  const canvasRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(isMobile ? 110 : 120, 50);
        p.noFill();
        p.stroke(255);
        p.strokeWeight(2);
      };

      let t = 0;
      let direction = 1;

      p.draw = () => {
        p.clear();

        const centerX = p.width / 2;
        const centerY = p.height / 2;

        const length = 100;
        const amplitude = 15;
        const frequency = p.TWO_PI / length;

        p.beginShape();
        for (let i = -length / 2; i <= length / 2; i++) {
          const x = centerX + i;
          const y = centerY + amplitude * p.sin(frequency * i);
          p.vertex(x, y);
        }
        p.endShape();

        p.beginShape();
        for (let i = -length / 2; i <= length / 2; i++) {
          const x = centerX + i;
          const y = centerY - amplitude * p.sin(frequency * i);
          p.vertex(x, y);
        }
        p.endShape();

        const circleX1 = centerX + t;
        const circleY1 = centerY + amplitude * p.sin(frequency * t);

        p.beginShape();
        p.ellipse(circleX1, circleY1, 15, 15);
        p.endShape();

        const circleX2 = centerX + t;
        const circleY2 = centerY - amplitude * p.sin(frequency * t);

        p.beginShape();
        p.ellipse(circleX2, circleY2, 15, 15);
        p.endShape();

        t += 0.5 * direction;

        if (t >= length / 2 || t <= -length / 2) {
          direction *= -1;
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

export default InfinityCanvas;
