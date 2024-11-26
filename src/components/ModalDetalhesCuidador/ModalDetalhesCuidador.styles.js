import styled from "styled-components";

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
  max-width: 600px;
  width: 90%; /* Ajuste para telas menores */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: Arial, sans-serif;
  margin: 0 10px; /* Adiciona espaçamento lateral para telas menores */

  @media (max-width: 768px) {
    padding: 15px; /* Reduz o padding em telas menores */
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;

  @media (max-width: 768px) {
    top: 8px;
    right: 8px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #03658b;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
`;

export const ModalSection = styled.div`
  margin-bottom: 20px;
  padding: 10px 0;
  border-top: 1px solid #ddd;

  &:first-child {
    border-top: none;
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
    padding: 5px 0;
  }
`;

export const ModalInfoGroup = styled.div`
  margin-bottom: 12px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const ModalInfoTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #008dc4;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ModalInfoText = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const SubmitButton = styled.button`
  display: block;
  background-color: #008dc4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 auto;
  font-size: 16px;

  &:hover {
    background-color: #03658b;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 14px;
  }
`;