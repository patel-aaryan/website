import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ButtonComponent from "../Button";

interface AchivementPanelProps {
  AchivementInfo: string[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function AchivementPanel({
  AchivementInfo,
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

  const animation = "transition-all duration-300 ease-out hover:scale-125";

  return (
    <>
      {shouldRender && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm
        flex items-center justify-center z-50 transition-opacity duration-500
        ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="bg-gray-800 text-white rounded-lg p-6 max-w-xl w-full relative">
            <Button
              onClick={() => setIsOpen(false)}
              className="absolute text-lg top-2 right-2 text-gray-400 hover:text-gray-200"
            >
              &times;
            </Button>

            <h2 className="text-2xl font-semibold">Achivements</h2>
            <ul className="list-disc space-y-2 pl-4">
              {AchivementInfo.map((str, index) => (
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
