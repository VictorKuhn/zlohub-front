import styled from "styled-components";

// Container do modal
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Conteúdo do modal
export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

// Botão de fechar
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff0000;
  }
`;

// Título do modal
export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #03658b;
  margin-bottom: 20px;
  text-align: center;
`;

// Grupo de informações
export const ModalInfoGroup = styled.div`
  margin-bottom: 16px;
`;

// Títulos das informações
export const ModalInfoTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #008dc4;
  margin: 0 0 4px 0;
`;

// Texto das informações
export const ModalInfoText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
`;

// Botão para fechar
export const CloseModalButton = styled.button`
  display: block;
  margin: 20px auto 0 auto;
  background-color: #008dc4;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005f89;
  }
`;

// Seletor de status
export const StatusSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
`;

// Botão para atualizar o status
export const UpdateButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 16px;
  background-color: #008dc4;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005f89;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;