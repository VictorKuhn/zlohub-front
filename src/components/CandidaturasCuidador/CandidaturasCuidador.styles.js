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

export const TitleWithSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleWithGradientUnderline = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #03658b;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, #008dc4, #005f89);
    margin-top: 5px;
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 300px;
`;

export const CandidaturasContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px; /* Espaçamento entre os cards */
  margin-top: 30px; /* Espaçamento entre a barra de pesquisa e a lista */
`;