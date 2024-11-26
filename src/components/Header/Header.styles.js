import styled from "styled-components";

// Container do Header
export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #008dc4; /* Azul */
  padding: 0 20px; /* Apenas padding lateral */
  height: 60px;
  width: 100%;
  position: fixed; /* Fixa o header no topo */
  top: 0;
  left: 0;
  z-index: 1000;
`;

// Logo centralizada
export const Logo = styled.img`
  height: 40px;
`;

// Ícones (barra e logout)
export const Icon = styled.div`
  font-size: 24px;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

// Seção do lado direito (logout)
export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;
