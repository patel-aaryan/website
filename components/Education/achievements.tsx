import React, { useEffect, useState } from "react";
import ButtonComponent from "../Button";

interface AchivementPanelProps {
  achivementInfo: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function AchivementPanel({
  achivementInfo,
  isOpen,
  setIsOpen,
  setIsActive,
}: AchivementPanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
        setIsActive(false);
      }, 500);
    }
  }, [isOpen, setIsActive]);

  return (
    <>
      {shouldRender && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm
        flex items-center justify-center z-50 transition-opacity duration-500
        ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="bg-gray-800 text-white rounded-lg p-6 max-w-xl w-full relative">
            <ButtonComponent
              onClick={() => setIsOpen(false)}
              classes="absolute rounded-lg text-lg top-2 right-2
              text-gray-400 hover:text-gray-200"
            >
              &times;
            </ButtonComponent>

            <h2 className="text-2xl font-semibold">Achivements</h2>
            <ul className="list-disc space-y-2 pl-4">
              {achivementInfo.map((str, index) => (
                <li key={index}>{str}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default AchivementPanel;
