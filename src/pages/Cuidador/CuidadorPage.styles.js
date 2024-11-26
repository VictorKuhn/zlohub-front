import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Content = styled.div`
  margin-top: 60px; /* Espaço do header */
  padding: 20px;
  transition: margin-left 0.3s ease;

  &.expanded {
    margin-left: 250px; /* Largura da barra lateral expandida */
  }
`;

// Estilo para o título com sublinhado em degradê
export const TitleWithGradientUnderline = styled.h1`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: #000; /* Cor do texto preta */
  position: relative;
  display: inline-block;
  margin-bottom: 20px; /* Espaçamento abaixo do título */

  /* Sublinhado em degradê */
  &::after {
    content: "";
    position: absolute;
    bottom: -10px; /* Espaçamento entre o texto e o sublinhado */
    left: 0;
    width: 100%;
    height: 4px; /* Altura do sublinhado */
    background: linear-gradient(to right, #008dc4, #03658b); /* Degradê */
    border-radius: 2px; /* Cantos arredondados no sublinhado */
  }
`;