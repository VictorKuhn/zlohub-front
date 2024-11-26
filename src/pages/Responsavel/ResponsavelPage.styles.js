import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 60px; /* Espaço do Header */
  margin-left: 60px; /* Espaço da LateralBar retraída */
  transition: margin-left 0.3s ease;

  &.expanded {
    margin-left: 250px; /* Espaço para a LateralBar expandida */
  }
`;

export const TitleWithContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Espaçamento entre título e botão */
  align-items: center; /* Alinha o botão verticalmente ao título */
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleWithGradientUnderline = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #03658b;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 100%; /* Ajuste automático ao texto */
    height: 3px;
    background: linear-gradient(to right, #008dc4, #005f89);
    margin-top: 5px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CreateVagaButton = styled.button`
  background-color: #008dc4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005f89;
  }
`;

export const VagasContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

export const NoVagasText = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
`;