import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px; /* Espaço para o Header */
  margin-left: 80px; /* Espaço para a LateralBar expandida */
  padding: 20px;
  width: calc(100% - 250px); /* Reduz largura considerando a LateralBar */
  height: calc(100vh - 60px); /* Reduz altura considerando o Header */
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 10px; /* Espaço reduzido para LateralBar retraída */
    width: calc(100% - 60px);
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
  gap: 20px;
`;