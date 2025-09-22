"use client";

import { useEffect, useRef, useState } from "react";

export default function ScratchResult({ result }: { result: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 300;
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#b0b0b0";
    ctx.fillRect(0, 0, width, height);

    let isDrawing = false;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      } else {
        return {
          x: (e as MouseEvent).clientX - rect.left,
          y: (e as MouseEvent).clientY - rect.top,
        };
      }
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      setStarted(true);
      scratch(e);
    };

    const endDraw = () => {
      isDrawing = false;
      ctx.beginPath();
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const pos = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 15, 0, Math.PI * 2);
      ctx.fill();
      checkReveal();
    };

    const checkReveal = () => {
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let transparentPixels = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] < 128) transparentPixels++;
      }
      const percent = (transparentPixels / (pixels.length / 4)) * 100;
      if (percent >= 40) {
        setRevealed(true);
      }
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", scratch);

    canvas.addEventListener("touchstart", startDraw);
    canvas.addEventListener("touchend", endDraw);
    canvas.addEventListener("touchmove", scratch);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchend", endDraw);
      canvas.removeEventListener("touchmove", scratch);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[300px] h-[100px] mx-auto">
        <div className="absolute inset-0 flex items-center justify-center text-lg md:text-xl font-bold pointer-events-none">
          {result}
        </div>

        {!started && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <span className="text-gray-700 font-semibold animate-pulse bg-white/70 px-2 rounded">
              Gosokkan dulu le
            </span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 cursor-pointer z-10 rounded-lg shadow-md"
        />
      </div>

      {revealed && (
        <div className="mt-4 w-[300px] mx-auto">
          <img
            src={
              result.toLowerCase() === "lulus"
                ? "https://i.imgur.com/zNpXOl1.png"
                : "https://i.imgur.com/MFFffQw.png"
            }
            alt={result}
            className="w-full h-auto object-contain rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}
