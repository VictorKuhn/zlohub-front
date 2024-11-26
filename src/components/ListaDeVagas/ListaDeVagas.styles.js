import styled from "styled-components";

// Container do slider
export const SliderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: calc(100vw - 200px);
  overflow: hidden;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column; /* Alinhamento vertical */
    align-items: flex-start;
  }
`;

// Wrapper para os cards
export const CardsWrapper = styled.div`
  display: flex;
  gap: 10px;
  scroll-behavior: smooth;
  overflow-x: auto;
  padding: 10px;
  cursor: grab;
  user-select: none;

  > div {
    flex: 0 0 300px;
    scroll-snap-align: center;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
  &::-webkit-scrollbar {
    display: none; /* Chrome e Safari */
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Alinha os cards verticalmente */
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(300px * 4); /* Exibe no máximo 4 cards */
    > div {
      flex: 0 0 100%; /* Cada card ocupa a largura total */
    }
  }
`;