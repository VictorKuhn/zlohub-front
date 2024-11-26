import styled, { keyframes } from "styled-components";

// Animação para o slide
const slideRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const slideLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: default;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center; /* Centraliza horizontalmente os itens */
  text-align: center; /* Centraliza o texto no título */
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-size: 14px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #008dc4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #03658b;
  }
`;

export const CharacterCount = styled.p`
  font-size: 14px;
  color: #9e9e9e;
  margin-top: 0px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #03658b;
  margin-bottom: 20px;
  text-align: center;
`;

export const ModalInfoGroup = styled.div`
  margin-bottom: 16px;
`;

export const ModalInfoTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #008dc4;
  margin: 0 0 4px 0;
`;

export const ModalInfoText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;