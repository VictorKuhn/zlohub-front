import React, { useEffect, useRef, useState } from "react";
import CardVaga from "../CardVaga/CardVaga";
import { SliderContainer, CardsWrapper } from "./ListaDeVagas.styles";

const ListaDeVagas = ({ vagas, onToastMessage }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  let interactionTimeout;

  useEffect(() => {
    const slider = sliderRef.current;
    let scrollInterval;

    const autoScroll = () => {
      if (!slider) return;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= maxScrollLeft) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    if (!isDragging) {
      scrollInterval = setInterval(autoScroll, 3000);
    }

    return () => clearInterval(scrollInterval);
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    clearTimeout(interactionTimeout);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    interactionTimeout = setTimeout(() => {
      setIsDragging(false);
    }, 3000);
  };

  return (
    <SliderContainer>
      <CardsWrapper
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        data-testid="slider"
      >
        {vagas.map((vaga) => (
          <CardVaga key={vaga.id} vaga={vaga} onToastMessage={onToastMessage} />
        ))}
      </CardsWrapper>
    </SliderContainer>
  );
};

export default ListaDeVagas;