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
} from "./ModalContratoResponsavel.styles";
import { FaTimes } from "react-icons/fa";

const ModalContratoResponsavel = ({ contrato, onClose }) => {
  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Data não disponível"; // Trata casos de valor indefinido ou nulo

    try {
      // Converte a string de data para o formato legível
      return new Date(dateTime).toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return "Formato de data inválido"; // Mensagem de erro em caso de falha
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        <ModalTitle>Detalhes do Contrato</ModalTitle>

        <ModalInfoGroup>
          <ModalInfoTitle>Cuidador:</ModalInfoTitle>
          <ModalInfoText>
            {contrato.cuidador?.nome} {contrato.cuidador?.sobrenome}
          </ModalInfoText>
        </ModalInfoGroup>

        <ModalInfoGroup>
          <ModalInfoTitle>Descrição da Vaga:</ModalInfoTitle>
          <ModalInfoText>{contrato.vaga.descricao}</ModalInfoText>
        </ModalInfoGroup>

        <ModalInfoGroup>
          <ModalInfoTitle>Horário de Início:</ModalInfoTitle>
          <ModalInfoText>
            {formatDateTime(contrato.vaga.dataHoraInicio)}
          </ModalInfoText>
        </ModalInfoGroup>

        <ModalInfoGroup>
          <ModalInfoTitle>Horário de Término:</ModalInfoTitle>
          <ModalInfoText>
            {formatDateTime(contrato.vaga.dataHoraFim)}
          </ModalInfoText>
        </ModalInfoGroup>

        <ModalInfoGroup>
          <ModalInfoTitle>Mensagem do Cuidador:</ModalInfoTitle>
          <ModalInfoText>{contrato.mensagemEnvio}</ModalInfoText>
        </ModalInfoGroup>

        <ModalInfoGroup>
          <ModalInfoTitle>Valor por Hora:</ModalInfoTitle>
          <ModalInfoText>R${contrato.valorHora}</ModalInfoText>
        </ModalInfoGroup>

        <ModalInfoGroup>
          <ModalInfoTitle>Status:</ModalInfoTitle>
          <ModalInfoText>{contrato.status}</ModalInfoText>
        </ModalInfoGroup>

        <CloseModalButton onClick={onClose}>Fechar</CloseModalButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalContratoResponsavel;
