import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 2px; /* Espaço reservado para a LateralBar */
  margin-top: 80px; /* Espaço reservado para o Header */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  justify-content: flex-start; /* Alinha no topo */

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 60px; /* Reduz espaço para telas menores */
    padding: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #03658b;
  margin-bottom: 20px;
  text-align: center;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center; /* Centraliza os cards horizontalmente */
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;