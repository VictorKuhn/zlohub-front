import styled from "styled-components";

// Overlay para escurecer o fundo
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro com transparência */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Container principal do modal
export const ModalContainer = styled.div`
  background-color: #fff;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// Header do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

// Botão de fechar
export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

// Corpo do modal
export const ModalBody = styled.div`
  padding: 20px;
  text-align: center;

  p {
    font-size: 18px;
    margin: 0;
  }
`;

// Rodapé do modal
export const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
`;

// Botão de confirmação
export const ConfirmButton = styled.button`
  background-color: #008dc4;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #005f89;
  }
`;

// Botão de cancelamento
export const CancelButton = styled.button`
  background-color: #ddd;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #bbb;
  }
`;
