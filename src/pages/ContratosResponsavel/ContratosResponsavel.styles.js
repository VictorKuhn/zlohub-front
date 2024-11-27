import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-top: 60px; /* Espaço para o Header */
  margin-left: 60px; /* Espaço para a LateralBar */
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #03658b;
  margin-bottom: 20px;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px; /* Espaçamento entre os cards */
`;
