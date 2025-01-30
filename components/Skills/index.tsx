import React, { useState } from "react";
import { NextButton, PrevButton } from "./slider";

interface SliderContent {
  name: string;
  component: () => React.JSX.Element;
}

interface SkillsProps {
  categoryList: {
    name: string;
    list: SliderContent[];
    gradient: string;
  }[];
}

export default function SkillsSlider({ categoryList }: SkillsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categoryList.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + categoryList.length) % categoryList.length
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative">
        <div className="flex items-center justify-between">
          <PrevButton click={prevSlide} />

          <div className="flex-1 overflow-hidden mx-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {categoryList.map((category) => (
                <div
                  key={category.name}
                  className="w-full flex-shrink-0 tablet:px-4"
                >
                  <div
                    className={`rounded-2xl p-8 ${category.gradient}
                      text-white shadow-xl transform transition-all
                      duration-300 hover:scale-102 hover:shadow-2xl`}
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold">{category.name}</h3>
                      </div>
                    </div>

                    <div className="grid gap-2 grid-cols-2 tablet:gap-6">
                      {category.list.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-center tablet:justify-normal
                          items-center space-x-3 bg-white/10 rounded-lg p-1
                          tablet:p-3 backdrop-blur-sm transition-all duration-200
                          hover:bg-white/20"
                        >
                          <item.component />
                          <span className="font-medium hidden tablet:block">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NextButton click={nextSlide} />
        </div>

        <div className="flex justify-center mt-8 space-x-3">
          {categoryList.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-blue-500 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
