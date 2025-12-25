import { useEffect, useRef } from 'react';
import { Container } from '@mantine/core';

const random = (min: number, max: number) => Math.random() * (max - min + 1) + min;

const rangeMap = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

type Word = {
  x: number;
  y: number;
  text: string;
  size: number;
};
const NotFound = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const keypressRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const txtMin = 5;
    const txtMax = 25;
    const accelerate = 2;

    const words: Word[] = [];

    for (let i = 0; i < 25; i++) {
      words.push(
        {
          x: random(0, canvas.width),
          y: random(0, canvas.height),
          text: '404',
          size: random(txtMin, txtMax),
        },
        {
          x: random(0, canvas.width),
          y: random(0, canvas.height),
          text: 'page',
          size: random(txtMin, txtMax),
        },
        {
          x: random(0, canvas.width),
          y: random(0, canvas.height),
          text: 'not found',
          size: random(txtMin, txtMax),
        },
        {
          x: random(0, canvas.width),
          y: random(0, canvas.height),
          text: '404',
          size: Math.floor(random(txtMin, txtMax)),
        }
      );
    }

    const render = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#fff';

      words.forEach((w) => {
        ctx.font = `${w.size}px sans-serif`;
        const textWidth = ctx.measureText(w.text).width;
        ctx.fillText(w.text, w.x, w.y);

        w.x +=
          rangeMap(w.size, txtMin, txtMax, 2, keypressRef.current ? 4 : 3) *
          (keypressRef.current ? accelerate : 1);

        if (w.x > canvas.width) {
          w.x = -textWidth * 2;
          w.y = random(0, canvas.height);
          w.size = Math.floor(random(txtMin, txtMax));
        }
      });

      requestAnimationFrame(render);
    };

    render();

    const down = () => (keypressRef.current = true);
    const up = () => (keypressRef.current = false);

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  return (
    <Container fluid p={0} style={{ height: '100vh' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </Container>
  );
};

export default NotFound;
