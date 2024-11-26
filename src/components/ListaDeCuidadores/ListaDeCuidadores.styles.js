// src/components/ListaDeCuidadores/ListaDeCuidadores.styles.js
import styled from "styled-components";

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: calc(100vw - 200px);
  margin: 20px auto;

  @media (max-width: 768px) {
    flex-direction: column; /* Ajusta o layout para coluna */
    width: 100%;
    margin: 10px auto;
  }
`;

export const CardsWrapper = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 10px;
  cursor: grab;
  user-select: none;

  > div {
    flex: 0 0 300px; /* Largura fixa para cards no slider */
    scroll-snap-align: center;
  }

  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome e Safari */
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Alinha os cards verticalmente */
    overflow-x: hidden; /* Remove o scroll horizontal */
    max-height: calc(300px * 4); /* Exibe no máximo 4 cards */
    padding: 0; /* Remove padding lateral */
    > div {
      flex: 0 0 100%; /* Cada card ocupa a largura total */
    }
  }
`;