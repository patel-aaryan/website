import { useEffect, useState } from "react";
import { Rect, useRect } from "react-use-rect";

interface HeadlineSliderProps {
  headlines: string[];
}

export default function HeadlineSlider({ headlines }: HeadlineSliderProps) {
  const [itemIndex, setItemIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const [rectRef] = useRect(setRect);

  useEffect(() => {
    const interval = setInterval(() => {
      setItemIndex((prev) => (prev === headlines.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [itemIndex, headlines]);

  return (
    <div
      className={`inline-flex tablet:justify-normal justify-center overflow-hidden relative
      transition-all duration-500 ease-in-out w-full`}
    >
      <span style={{ visibility: "hidden" }}>{headlines[itemIndex]}</span>
      {headlines.map((text, index) => (
        <span
          key={index}
          ref={index === itemIndex ? rectRef : null}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            top: (rect?.height ?? 0) * 2,
            transform: `translateY(${
              itemIndex === index ? `-${(rect?.height ?? 0) * 2}px` : 0
            })`,
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
