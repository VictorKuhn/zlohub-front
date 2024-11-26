import React from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  ConfirmButton,
  CancelButton,
} from "./LogoutModal.styles";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Retorna null se o modal não estiver aberto

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <p>Você tem certeza que deseja sair da sua conta?</p>
        </ModalBody>
        <ModalFooter>
          <ConfirmButton onClick={onConfirm}>Sim</ConfirmButton>
          <CancelButton onClick={onClose}>Não</CancelButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default LogoutModal;
