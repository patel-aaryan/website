import React, { useCallback, useEffect } from "react";
import { EmblaCarouselType } from "embla-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ButtonComponent from "../Button";

type UsePrevNextButtonsType = {
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  n: number
): UsePrevNextButtonsType => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    for (let i = 0; i < n; i++) emblaApi.scrollPrev();
  }, [emblaApi, n]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    for (let i = 0; i < n; i++) emblaApi.scrollNext();
  }, [emblaApi, n]);

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return {
    onPrevButtonClick,
    onNextButtonClick,
  };
};

interface ButtonProps {
  click: () => void;
}

export function PrevButton({ click }: ButtonProps) {
  return (
    <ButtonComponent classes="rounded-full" onClick={click}>
      <ArrowBackIosNewIcon />
    </ButtonComponent>
  );
}

export function NextButton({ click }: ButtonProps) {
  return (
    <ButtonComponent classes="rounded-full" onClick={click}>
      <ArrowForwardIosIcon />
    </ButtonComponent>
  );
}
