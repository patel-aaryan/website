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
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    emblaApi.scrollNext();
  }, [emblaApi]);

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
