import React from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  ModalTitle,
  ModalInfoGroup,
  ModalInfoTitle,
  ModalInfoText,
  CloseModalButton,
} from "./ModalDetalhesCandidatura.styles";
import { FaTimes } from "react-icons/fa";

const ModalDetalhesCandidatura = ({ candidatura, onClose, onToastMessage }) => {

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <ModalTitle>{candidatura.vaga.titulo}</ModalTitle>
        <ModalInfoGroup>
          <ModalInfoTitle>Descrição:</ModalInfoTitle>
          <ModalInfoText>{candidatura.vaga.descricao}</ModalInfoText>
        </ModalInfoGroup>
        <ModalInfoGroup>
          <ModalInfoTitle>Tipo de Dependente:</ModalInfoTitle>
          <ModalInfoText>{candidatura.vaga.tipoDependente}</ModalInfoText>
        </ModalInfoGroup>
        <ModalInfoGroup>
          <ModalInfoTitle>Idade do Dependente:</ModalInfoTitle>
          <ModalInfoText>{candidatura.vaga.idadeDependente}</ModalInfoText>
        </ModalInfoGroup>
        <ModalInfoGroup>
          <ModalInfoTitle>Doença Diagnosticada:</ModalInfoTitle>
          <ModalInfoText>{candidatura.vaga.doencaDiagnosticada}</ModalInfoText>
        </ModalInfoGroup>
        <ModalInfoGroup>
          <ModalInfoTitle>Mensagem:</ModalInfoTitle>
          <ModalInfoText>{candidatura.mensagemEnvio}</ModalInfoText>
        </ModalInfoGroup>
        <ModalInfoGroup>
          <ModalInfoTitle>Valor por Hora:</ModalInfoTitle>
          <ModalInfoText>R${candidatura.valorHora}</ModalInfoText>
        </ModalInfoGroup>
        <ModalInfoGroup>
          <ModalInfoTitle>Status:</ModalInfoTitle>
          <ModalInfoText>{candidatura.status}</ModalInfoText>
        </ModalInfoGroup>
        <CloseModalButton
          onClick={() => {
            onClose();
          }}
        >
          Fechar
        </CloseModalButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalDetalhesCandidatura;