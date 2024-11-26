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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #008dc4;
  margin-bottom: 20px;
`;

export const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  & > div {
    flex: 1 1 calc(50% - 20px);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #008dc4;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #008dc4;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005f89;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-size: 14px;
  }
`;