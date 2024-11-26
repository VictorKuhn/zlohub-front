// src/components/ListaDeCuidadores/ListaDeCuidadores.jsx
import React, { useEffect, useRef, useState } from "react";
import CardCuidador from "../CardCuidador/CardCuidador";
import { SliderContainer, CardsWrapper } from "./ListaDeCuidadores.styles";

const ListaDeCuidadores = ({ cuidadores }) => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  let interactionTimeout;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
  }, [isDragging, isMobile]);

  const handleMouseDown = (e) => {
    if (isMobile) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    clearTimeout(interactionTimeout);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMobile) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isMobile) return;
    setIsDragging(false);
    interactionTimeout = setTimeout(() => {
      setIsDragging(false);
    }, 3000);
  };

  const displayedCuidadores = isMobile ? cuidadores.slice(0, 4) : cuidadores;

  return (
    <SliderContainer>
      <CardsWrapper
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {displayedCuidadores.map((cuidador) => (
          <CardCuidador key={cuidador.id} cuidador={cuidador} />
        ))}
      </CardsWrapper>
    </SliderContainer>
  );
};

export default ListaDeCuidadores;